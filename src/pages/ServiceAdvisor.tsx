import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { BrainCircuit, CheckCircle2, Clipboard, Loader2, MessageCircle, Phone, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/company";

type Recommendation = {
  service: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  priorityReason: string;
  nextStep: string;
  informationNeeded: string[];
  responseGuidance: string;
  summary: string;
};

const initialForm = { requirement: "", location: "", urgency: "normal", timeline: "", contact: "" };

const ServiceAdvisor = () => {
  const { language, text } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const analyze = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.requirement.trim().length < 20) {
      toast({ title: text("More detail needed", "थोड़ी और जानकारी चाहिए"), description: text("Please describe the requirement in at least 20 characters.", "कृपया कम से कम 20 अक्षरों में आवश्यकता बताएँ।"), variant: "destructive" });
      return;
    }
    setLoading(true);
    setRecommendation(null);
    try {
      const { data, error } = await supabase.functions.invoke("service-advisor", { body: { ...form, language } });
      if (error) {
        let message = error.message;
        const context = (error as { context?: Response }).context;
        if (context) {
          try { message = (await context.json()).error ?? message; } catch { /* use safe SDK message */ }
        }
        throw new Error(message);
      }
      setRecommendation(data.recommendation as Recommendation);
    } catch (error) {
      toast({ title: text("Analysis unavailable", "विश्लेषण उपलब्ध नहीं है"), description: error instanceof Error ? error.message : text("Please try again later.", "कृपया बाद में पुनः प्रयास करें।"), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyRecommendation = async () => {
    if (!recommendation) return;
    const value = `${recommendation.service}\n${recommendation.summary}\n${recommendation.nextStep}`;
    await navigator.clipboard.writeText(value);
    toast({ title: text("Recommendation copied", "सुझाव कॉपी हो गया") });
  };

  const whatsappText = recommendation
    ? `${text("Hello SS TECH SERVICES, I need help with", "नमस्ते SS TECH SERVICES, मुझे सहायता चाहिए")}: ${recommendation.service}. ${recommendation.summary}`
    : text("Hello SS TECH SERVICES, I need help choosing an IT service.", "नमस्ते SS TECH SERVICES, मुझे सही IT सेवा चुनने में सहायता चाहिए।");

  return (
    <>
      <Helmet>
        <title>{text("AI Service Advisor — SS TECH SERVICES", "AI सेवा सलाहकार — SS TECH SERVICES")}</title>
        <meta name="description" content={text("Describe your IT requirement and get an AI-assisted service recommendation, priority and next step from SS TECH SERVICES.", "अपनी IT आवश्यकता बताएँ और SS TECH SERVICES से AI-सहायित सेवा सुझाव, प्राथमिकता और अगला कदम पाएँ।")} />
        <link rel="canonical" href="/service-advisor" />
      </Helmet>
      <PageHero
        eyebrow={text("AI Service Advisor", "AI सेवा सलाहकार")}
        title={<>{text("Turn a requirement into a", "अपनी आवश्यकता को बनाएँ")} <span className="text-gradient-accent">{text("clear action plan", "स्पष्ट कार्य योजना")}</span></>}
        subtitle={text("Describe the customer's IT need. Our AI assistant will suggest the best-fit service, priority and practical next step.", "ग्राहक की IT आवश्यकता बताएँ। हमारा AI सहायक उपयुक्त सेवा, प्राथमिकता और व्यावहारिक अगला कदम सुझाएगा।")}
      />
      <section className="container py-16 md:py-20 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)] gap-8 items-start">
        <form onSubmit={analyze} className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-card space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <span className="h-11 w-11 rounded-md gradient-cta text-primary-foreground flex items-center justify-center"><BrainCircuit className="h-6 w-6" /></span>
            <div><h2 className="font-display text-xl font-bold">{text("Customer requirement", "ग्राहक की आवश्यकता")}</h2><p className="text-sm text-muted-foreground">{text("Do not include passwords or confidential credentials.", "पासवर्ड या गोपनीय लॉगिन जानकारी शामिल न करें।")}</p></div>
          </div>
          <div>
            <Label htmlFor="requirement">{text("Requirement details *", "आवश्यकता का विवरण *")}</Label>
            <Textarea id="requirement" rows={7} maxLength={3000} value={form.requirement} onChange={(e) => setForm({ ...form, requirement: e.target.value })} placeholder={text("Example: 80-user office needs secure Wi-Fi, structured cabling and CCTV across two floors...", "उदाहरण: 80 यूज़र वाले दो-मंज़िला ऑफिस के लिए सुरक्षित Wi-Fi, स्ट्रक्चर्ड केबलिंग और CCTV चाहिए...")} className="mt-1.5" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label htmlFor="location">{text("Location", "स्थान")}</Label><Input id="location" maxLength={120} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder={text("City / site", "शहर / साइट")} className="mt-1.5" /></div>
            <div><Label htmlFor="timeline">{text("Preferred timeline", "पसंदीदा समय सीमा")}</Label><Input id="timeline" maxLength={120} value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} placeholder={text("e.g. Within 2 weeks", "जैसे 2 सप्ताह में")} className="mt-1.5" /></div>
            <div><Label htmlFor="urgency">{text("Current urgency", "वर्तमान प्राथमिकता")}</Label><Select value={form.urgency} onValueChange={(urgency) => setForm({ ...form, urgency })}><SelectTrigger id="urgency" className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="normal">{text("Planning / Normal", "योजना / सामान्य")}</SelectItem><SelectItem value="high">{text("Business impacted", "व्यवसाय प्रभावित")}</SelectItem><SelectItem value="critical">{text("Operations stopped", "काम पूरी तरह रुका")}</SelectItem></SelectContent></Select></div>
            <div><Label htmlFor="contact">{text("Customer / contact reference", "ग्राहक / संपर्क संदर्भ")}</Label><Input id="contact" maxLength={120} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder={text("Optional internal reference", "वैकल्पिक आंतरिक संदर्भ")} className="mt-1.5" /></div>
          </div>
          <Button type="submit" variant="cta" size="lg" disabled={loading} className="w-full sm:w-auto">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" />{text("Analyzing requirement...", "आवश्यकता का विश्लेषण...")}</> : <><Sparkles className="h-4 w-4" />{text("Prepare Recommendation", "सुझाव तैयार करें")}</>}
          </Button>
        </form>

        <aside className="lg:sticky lg:top-24">
          {recommendation ? (
            <div className="bg-card border border-border rounded-lg shadow-elegant overflow-hidden">
              <div className="gradient-cta text-primary-foreground p-6"><p className="text-xs uppercase tracking-widest opacity-75 mb-2">{text("AI-assisted recommendation", "AI-सहायित सुझाव")}</p><h2 className="font-display text-2xl font-bold">{recommendation.service}</h2></div>
              <div className="p-6 space-y-5">
                <div className="flex items-center gap-2"><span className="text-sm font-semibold">{text("Priority", "प्राथमिकता")}:</span><Badge variant={recommendation.priority === "Critical" || recommendation.priority === "High" ? "destructive" : "secondary"}>{recommendation.priority}</Badge></div>
                <p className="text-muted-foreground leading-relaxed">{recommendation.summary}</p>
                <div><h3 className="font-semibold mb-1">{text("Why this priority", "यह प्राथमिकता क्यों")}</h3><p className="text-sm text-muted-foreground">{recommendation.priorityReason}</p></div>
                <div><h3 className="font-semibold mb-1">{text("Recommended next step", "सुझाया गया अगला कदम")}</h3><p className="text-sm text-muted-foreground">{recommendation.nextStep}</p></div>
                <div><h3 className="font-semibold mb-2">{text("Information to collect", "आवश्यक जानकारी")}</h3><ul className="space-y-2">{recommendation.informationNeeded.map((item) => <li key={item} className="text-sm flex gap-2"><CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />{item}</li>)}</ul></div>
                <div className="bg-secondary rounded-md p-4 text-sm"><span className="font-semibold">{text("Response guidance", "प्रतिक्रिया मार्गदर्शन")}:</span> {recommendation.responseGuidance}</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <Button type="button" variant="outline" onClick={copyRecommendation}><Clipboard className="h-4 w-4" />{text("Copy", "कॉपी")}</Button>
                  <Button asChild variant="cta"><a href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
                </div>
                <p className="text-xs text-muted-foreground">{text("AI guidance supports initial triage. Final scope and timeline are confirmed by our engineers after review.", "AI सुझाव प्रारंभिक आकलन में मदद करता है। अंतिम कार्यक्षेत्र और समय हमारी इंजीनियर टीम समीक्षा के बाद तय करती है।")}</p>
              </div>
            </div>
          ) : (
            <div className="gradient-hero text-primary-foreground rounded-lg p-7 shadow-elegant cyber-grid">
              <Sparkles className="h-9 w-9 text-primary-glow mb-5" />
              <h2 className="font-display text-2xl font-bold mb-3">{text("A faster first assessment", "तेज़ प्रारंभिक आकलन")}</h2>
              <p className="text-primary-foreground/75 leading-relaxed mb-6">{text("Give the assistant enough operational context to separate urgent outages from planned infrastructure work.", "सहायक को पर्याप्त जानकारी दें ताकि गंभीर outage और नियोजित infrastructure कार्य में सही अंतर किया जा सके।")}</p>
              <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 font-semibold hover:text-primary-glow"><Phone className="h-4 w-4" />{text("Urgent? Call", "तत्काल? कॉल करें")} {COMPANY.phone}</a>
            </div>
          )}
        </aside>
      </section>
    </>
  );
};

export default ServiceAdvisor;