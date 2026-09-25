import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/services";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const schema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Valid email required").max(120),
  phone: z.string().trim().min(7, "Phone required").max(20),
  company: z.string().trim().max(100).optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

export const InquiryForm = ({ compact = false }: { compact?: boolean }) => {
  const { toast } = useToast();
  const { language, text } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "", company: "", service: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
       toast({ title: text("Please check the form", "कृपया फ़ॉर्म जाँचें"), description: text(result.error.issues[0].message, "सभी आवश्यक जानकारी सही भरें।"), variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("submit-inquiry", {
        body: { ...result.data, source: typeof window !== "undefined" ? window.location.pathname : "unknown" },
      });
      if (error) throw error;
       toast({ title: text("Thank you!", "धन्यवाद!"), description: text("Your inquiry has been received. Our team will reach out within 24 hours.", "आपका अनुरोध मिल गया है। हमारी टीम 24 घंटे के भीतर संपर्क करेगी।") });
      setData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (err) {
      console.error(err);
       toast({ title: text("Something went wrong", "कुछ समस्या हुई"), description: text("Please try again or WhatsApp us directly.", "कृपया दोबारा प्रयास करें या सीधे WhatsApp करें।"), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <div>
          <Label htmlFor="name">{text("Full Name *", "पूरा नाम *")}</Label>
          <Input id="name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder={text("Your name", "आपका नाम")} maxLength={80} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">{text("Email *", "ईमेल *")}</Label>
          <Input id="email" type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@company.com" maxLength={120} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">{text("Phone *", "फ़ोन *")}</Label>
          <Input id="phone" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+91 ..." maxLength={20} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="company">{text("Company", "कंपनी")}</Label>
          <Input id="company" value={data.company} onChange={e => setData({ ...data, company: e.target.value })} placeholder={text("Organization", "संस्था")} maxLength={100} className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="service">{text("Service Required *", "आवश्यक सेवा *")}</Label>
        <Select value={data.service} onValueChange={v => setData({ ...data, service: v })}>
          <SelectTrigger id="service" className="mt-1.5"><SelectValue placeholder={text("Choose a service", "सेवा चुनें")} /></SelectTrigger>
          <SelectContent>
            {services.map(s => <SelectItem key={s.slug} value={s.title}>{language === "hi" ? s.titleHi : s.title}</SelectItem>)}
            <SelectItem value="Other">{text("Other / Not sure", "अन्य / निश्चित नहीं")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="message">{text("Project Details *", "प्रोजेक्ट विवरण *")}</Label>
        <Textarea id="message" rows={4} value={data.message} onChange={e => setData({ ...data, message: e.target.value })} placeholder={text("Briefly describe your requirement...", "अपनी आवश्यकता संक्षेप में बताएँ...")} maxLength={1000} className="mt-1.5" />
      </div>
      <Button type="submit" variant="cta" size="lg" disabled={loading} className="w-full">
        {loading ? text("Sending...", "भेजा जा रहा है...") : <>{text("Send Inquiry", "अनुरोध भेजें")} <Send className="h-4 w-4" /></>}
      </Button>
      <p className="text-xs text-muted-foreground text-center">{text("We typically respond within 24 hours. Your information is kept private.", "हम सामान्यतः 24 घंटे में जवाब देते हैं। आपकी जानकारी सुरक्षित रखी जाती है।")}</p>
    </form>
  );
};
