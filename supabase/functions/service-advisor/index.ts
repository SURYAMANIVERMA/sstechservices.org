import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const RequestSchema = z.object({
  requirement: z.string().trim().min(20).max(3000),
  location: z.string().trim().max(120).optional().default(""),
  urgency: z.enum(["normal", "high", "critical"]),
  timeline: z.string().trim().max(120).optional().default(""),
  contact: z.string().trim().max(120).optional().default(""),
  language: z.enum(["en", "hi"]),
});

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["service", "priority", "priorityReason", "nextStep", "informationNeeded", "responseGuidance", "summary"],
  properties: {
    service: { type: "string" },
    priority: { type: "string", enum: ["Low", "Medium", "High", "Critical"] },
    priorityReason: { type: "string" },
    nextStep: { type: "string" },
    informationNeeded: { type: "array", items: { type: "string" } },
    responseGuidance: { type: "string" },
    summary: { type: "string" },
  },
};

const serviceCatalogue = [
  "Network Installation", "Structured Cabling", "Server Installation", "IT Support & AMC",
  "CCTV Installation", "System Administration", "OpenShift & Linux Support", "Cloud & Monitoring",
  "IT Manpower Support",
];

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

const safeGatewayMessage = (status: number, body: string) => {
  try {
    const parsed = JSON.parse(body);
    if (typeof parsed.message === "string") return parsed.message;
    if (typeof parsed.error?.message === "string") return parsed.error.message;
  } catch { /* return status-based message */ }
  if (status === 401) return "AI service is not configured correctly.";
  if (status === 402) return "AI credits are currently unavailable. Please contact the site owner.";
  if (status === 403) return "AI access is currently unavailable for this workspace.";
  if (status === 429) return "AI service is busy. Please wait a moment and try again.";
  return "The AI recommendation service is temporarily unavailable.";
};

const extractSseOutput = async (response: Response) => {
  if (!response.body) throw new Error("AI response stream was empty.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let output = "";
  let reasoningSummary = "";
  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";
    for (const event of events) {
      for (const line of event.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const parsed = JSON.parse(payload);
          if (parsed.type === "response.output_text.delta" && typeof parsed.delta === "string") output += parsed.delta;
          if (parsed.type === "response.reasoning_summary_text.delta" && typeof parsed.delta === "string") reasoningSummary += parsed.delta;
          if (parsed.type === "response.failed") throw new Error(parsed.response?.error?.message ?? "AI response failed.");
        } catch (error) {
          if (error instanceof SyntaxError) continue;
          throw error;
        }
      }
    }
    if (done) break;
  }
  return output.trim() || reasoningSummary.trim();
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: jsonHeaders });

  let body: unknown;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), { status: 400, headers: jsonHeaders });
  }
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) return new Response(JSON.stringify({ error: "Please provide a clear requirement of at least 20 characters." }), { status: 400, headers: jsonHeaders });

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return new Response(JSON.stringify({ error: "AI service is not configured correctly." }), { status: 401, headers: jsonHeaders });

  const languageInstruction = parsed.data.language === "hi"
    ? "Write every human-readable field in clear, professional Hindi, but keep official product and service names recognizable in English where useful."
    : "Write every human-readable field in concise, professional English.";
  const input = `Return one JSON recommendation for an SS TECH SERVICES customer requirement. ${languageInstruction}\n\nChoose service only from: ${serviceCatalogue.join(", ")}.\nPriority must reflect operational impact, not sales value. Do not promise an exact resolution or price. responseGuidance must be an indicative first-response or assessment window. informationNeeded must contain 2 to 5 short items.\n\nRequirement: ${parsed.data.requirement}\nLocation: ${parsed.data.location || "Not provided"}\nUrgency selected: ${parsed.data.urgency}\nPreferred timeline: ${parsed.data.timeline || "Not provided"}\nContact reference: ${parsed.data.contact || "Not provided"}`;

  try {
    const gatewayResponse = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
        ...(req.headers.get("X-Lovable-AIG-Run-ID") ? { "X-Lovable-AIG-Run-ID": req.headers.get("X-Lovable-AIG-Run-ID") as string } : {}),
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        input,
        stream: true,
        reasoning: { effort: "low", summary: "auto" },
        include: ["reasoning.encrypted_content"],
        text: { format: { type: "json_schema", name: "service_recommendation", strict: true, schema: responseSchema } },
      }),
    });
    if (!gatewayResponse.ok) {
      const errorBody = await gatewayResponse.text();
      console.error("AI Gateway failed", gatewayResponse.status, errorBody);
      return new Response(JSON.stringify({ error: safeGatewayMessage(gatewayResponse.status, errorBody) }), { status: gatewayResponse.status, headers: jsonHeaders });
    }
    const text = await extractSseOutput(gatewayResponse);
    if (!text) return new Response(JSON.stringify({ error: "AI completed without a recommendation. Please try a fresh request." }), { status: 502, headers: jsonHeaders });
    const recommendation = JSON.parse(text);
    const output = z.object({
      service: z.enum(serviceCatalogue as [string, ...string[]]),
      priority: z.enum(["Low", "Medium", "High", "Critical"]),
      priorityReason: z.string(), nextStep: z.string(),
      informationNeeded: z.array(z.string()).min(1).max(6),
      responseGuidance: z.string(), summary: z.string(),
    }).safeParse(recommendation);
    if (!output.success) return new Response(JSON.stringify({ error: "AI returned an incomplete recommendation. Please try a fresh request." }), { status: 502, headers: jsonHeaders });
    const runId = gatewayResponse.headers.get("X-Lovable-AIG-Run-ID");
    return new Response(JSON.stringify({ recommendation: output.data }), { status: 200, headers: { ...jsonHeaders, ...(runId ? { "X-Lovable-AIG-Run-ID": runId, "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID" } : {}) } });
  } catch (error) {
    console.error("service advisor failed", error);
    return new Response(JSON.stringify({ error: "The AI recommendation service is temporarily unavailable." }), { status: 500, headers: jsonHeaders });
  }
});