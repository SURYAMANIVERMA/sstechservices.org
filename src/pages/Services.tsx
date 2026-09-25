import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { InquiryForm } from "@/components/InquiryForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services } from "@/lib/services";
import { serviceFaqs } from "@/lib/faqs";
import { COMPANY } from "@/lib/company";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { language, text } = useLanguage();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((faq) => ({
      "@type": "Question",
      name: language === "hi" ? faq.questionHi : faq.question,
      acceptedAnswer: { "@type": "Answer", text: language === "hi" ? `${faq.answerHi} ${faq.timelineHi} ${faq.neededHi}` : `${faq.answer} ${faq.timeline} ${faq.needed}` },
    })),
  };
  const wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text("Hello SS TECH SERVICES, I need help choosing an IT service.", "नमस्ते SS TECH SERVICES, मुझे सही IT सेवा चुनने में सहायता चाहिए।"))}`;

  return (
    <>
      <Helmet>
        <title>{text("IT Services — Networking, Servers, CCTV, Cloud | SS TECH SERVICES", "IT सेवाएँ — नेटवर्किंग, सर्वर, CCTV, क्लाउड | SS TECH SERVICES")}</title>
        <meta name="description" content={text("Explore network installation, structured cabling, server, CCTV, cloud, OpenShift, system administration and IT manpower services with timelines and FAQs.", "नेटवर्क इंस्टॉलेशन, केबलिंग, सर्वर, CCTV, क्लाउड, OpenShift, सिस्टम एडमिन और IT मैनपावर सेवाओं की समय-सीमा और FAQ जानें।")} />
        <link rel="canonical" href="/services" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <PageHero eyebrow={text("Our Services", "हमारी सेवाएँ")} title={<>{text("Complete IT services", "संपूर्ण IT सेवाएँ")} <span className="text-gradient-accent">{text("under one roof", "एक ही जगह")}</span></>} subtitle={text("From cabling to cloud — explore our complete IT infrastructure and managed services portfolio.", "केबलिंग से क्लाउड तक—हमारी संपूर्ण IT इंफ्रास्ट्रक्चर और मैनेज्ड सर्विस सेवाएँ देखें।")} />

      <section className="container py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      </section>

      <section className="bg-secondary/50 py-20" id="service-faqs">
        <div className="container grid lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("Service FAQs", "सेवा से जुड़े प्रश्न")}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{text("Answers before your first call", "पहली कॉल से पहले जरूरी जवाब")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{text("Indicative timelines depend on site size, access, equipment availability and final technical assessment.", "दिया गया समय साइट के आकार, एक्सेस, उपकरण उपलब्धता और अंतिम तकनीकी जाँच पर निर्भर करता है।")}</p>
            <div className="grid gap-2">
              <Button asChild variant="cta"><Link to="/service-advisor"><Sparkles className="h-4 w-4" />{text("Ask AI Service Advisor", "AI सेवा सलाहकार से पूछें")}</Link></Button>
              <Button asChild variant="outline"><a href={`tel:${COMPANY.phoneRaw}`}><Phone className="h-4 w-4" />{text("Call our team", "हमारी टीम को कॉल करें")}</a></Button>
              <Button asChild variant="outline"><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
            </div>
          </div>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-lg px-5 md:px-7 shadow-card">
            {serviceFaqs.map((faq, index) => (
              <AccordionItem key={faq.service} value={`faq-${index}`}>
                <AccordionTrigger className="text-left gap-4 hover:no-underline py-5">
                  <span><span className="block text-xs uppercase tracking-widest text-accent mb-1">{language === "hi" ? faq.serviceHi : faq.service}</span>{language === "hi" ? faq.questionHi : faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>{language === "hi" ? faq.answerHi : faq.answer}</p>
                  <p className="font-semibold text-foreground">{language === "hi" ? faq.timelineHi : faq.timeline}</p>
                  <p><span className="font-semibold text-foreground">{text("Information needed:", "आवश्यक जानकारी:")}</span> {language === "hi" ? faq.neededHi : faq.needed}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="container py-20 max-w-3xl">
        <div className="text-center mb-10"><h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{text("Tell us about your project", "हमें अपने प्रोजेक्ट के बारे में बताएँ")}</h2><p className="text-muted-foreground">{text("Our specialists will respond with a clear proposal.", "हमारे विशेषज्ञ स्पष्ट प्रस्ताव के साथ संपर्क करेंगे।")}</p></div>
        <div className="bg-card rounded-lg p-7 md:p-10 shadow-elegant border border-border"><InquiryForm /></div>
      </section>
    </>
  );
};

export default Services;