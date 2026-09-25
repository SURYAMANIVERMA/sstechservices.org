import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

const BodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),
  company: z.string().trim().max(100).optional().nullable(),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(2000),
  source: z.string().trim().max(120).optional().nullable(),
});

const COMPANY_NAME = "SS Tech Services";
const NOTIFY_EMAIL = "info@sstechservices.org";
const WHATSAPP_RECIPIENT = "918808227885";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const admin = createClient(supabaseUrl, serviceKey);

async function sendEmail(templateName: string, recipientEmail: string, idempotencyKey: string, templateData: Record<string, unknown>, replyTo?: string) {
  try {
    const result = await sendTemplateEmail(templateName, recipientEmail, {
      idempotencyKey,
      templateData,
      replyTo,
    });
    if (!result.sent) console.info(`email ${templateName} skipped: ${result.reason}`);
  } catch (e) {
    console.error(`email ${templateName} threw`, e);
  }
}

async function pushToHubSpot(lead: z.infer<typeof BodySchema>) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const hubspotKey = Deno.env.get("HUBSPOT_API_KEY");
  if (!lovableKey || !hubspotKey) return;
  const [firstname, ...rest] = lead.name.split(" ");
  const lastname = rest.join(" ") || "-";
  try {
    const res = await fetch("https://connector-gateway.lovable.dev/hubspot/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": hubspotKey,
      },
      body: JSON.stringify({
        properties: {
          email: lead.email,
          firstname,
          lastname,
          phone: lead.phone,
          company: lead.company ?? "",
          hs_lead_status: "NEW",
          message: `Service: ${lead.service}\n\n${lead.message}`,
        },
      }),
    });
    if (!res.ok) console.error("hubspot push failed", res.status, await res.text());
  } catch (e) {
    console.error("hubspot threw", e);
  }
}

async function pushToWebhook(lead: z.infer<typeof BodySchema> & { id?: string }) {
  const url = Deno.env.get("LEAD_WEBHOOK_URL");
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, company_name: COMPANY_NAME, timestamp: new Date().toISOString() }),
    });
  } catch (e) {
    console.error("webhook threw", e);
  }
}

async function sendWhatsAppAlert(lead: z.infer<typeof BodySchema>, id: string, submittedAt: string) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const whatsappKey = Deno.env.get("WHATSAPP_API_KEY");
  if (!lovableKey || !whatsappKey) {
    console.info("WhatsApp lead alert skipped: connection is not configured");
    return;
  }
  const templateName = Deno.env.get("WHATSAPP_LEAD_TEMPLATE") ?? "new_lead_alert";
  const response = await fetch("https://connector-gateway.lovable.dev/whatsapp/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": whatsappKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: WHATSAPP_RECIPIENT,
      type: "template",
      template: {
        name: templateName,
        language: { code: "en_US" },
        components: [{
          type: "body",
          parameters: [
            { type: "text", text: lead.name },
            { type: "text", text: lead.phone },
            { type: "text", text: lead.service },
            { type: "text", text: lead.message.slice(0, 500) },
            { type: "text", text: submittedAt },
            { type: "text", text: id },
          ],
        }],
      },
    }),
  });
  const responseBody = await response.text();
  if (!response.ok) console.error("WhatsApp lead alert failed", response.status, responseBody);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const lead = parsed.data;
  const userAgent = req.headers.get("user-agent") ?? null;

  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
  const { count: recentCount, error: rateLimitError } = await admin
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("email", lead.email)
    .gte("created_at", oneMinuteAgo);

  if (rateLimitError) console.error("rate limit check failed", rateLimitError);
  if (!rateLimitError && (recentCount ?? 0) >= 3) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
      status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: inserted, error: insertError } = await admin
    .from("leads")
    .insert({ ...lead, user_agent: userAgent })
    .select()
    .single();

  if (insertError) {
    console.error("insert failed", insertError);
    return new Response(JSON.stringify({ error: "Failed to save lead" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const id: string = inserted.id;
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // Fire-and-await all integrations in parallel (still returns quickly).
  await Promise.allSettled([
     sendEmail("lead-notification", NOTIFY_EMAIL, `lead-notify-${id}`, {
      name: lead.name, email: lead.email, phone: lead.phone,
      company: lead.company ?? "—", service: lead.service, message: lead.message,
       source: lead.source ?? "Website", submittedAt,
     }, lead.email),
    sendEmail("lead-confirmation", lead.email, `lead-confirm-${id}`, {
      name: lead.name, service: lead.service, message: lead.message,
    }),
    pushToHubSpot(lead),
    pushToWebhook({ ...lead, id }),
     sendWhatsAppAlert(lead, id, submittedAt),
  ]);

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
