import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { COMPANY } from "@/lib/company";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const wa = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent("Hi SS TECH SERVICES, I'd like to enquire.")}`;
  const { text } = useLanguage();
  return (
    <>
      <Helmet>
        <title>{text("Contact SS TECH SERVICES — IT Services in Lucknow", "SS TECH SERVICES से संपर्क करें — लखनऊ IT सेवाएँ")}</title>
        <meta name="description" content={text("Contact SS TECH SERVICES for IT infrastructure, networking, CCTV, server and cloud services.", "IT इंफ्रास्ट्रक्चर, नेटवर्किंग, CCTV, सर्वर और क्लाउड सेवाओं के लिए SS TECH SERVICES से संपर्क करें।")} />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <PageHero eyebrow={text("Get in Touch", "संपर्क करें")} title={<>{text("Let's talk about your", "अपने अगले")} <span className="text-gradient-accent">{text("next project", "प्रोजेक्ट पर बात करें")}</span></>} subtitle={text("We respond within 24 hours. Free consultation and site survey.", "हम 24 घंटे में जवाब देते हैं। परामर्श और साइट सर्वे निःशुल्क है।")} />

      <section className="container py-20 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-smooth">
            <span className="h-12 w-12 rounded-xl gradient-cta text-primary-foreground flex items-center justify-center shrink-0"><Phone className="h-5 w-5" /></span>
             <div><div className="text-xs uppercase tracking-widest text-muted-foreground">{text("Call us", "कॉल करें")}</div><div className="font-semibold text-lg">{COMPANY.phone}</div><div className="text-sm text-muted-foreground">{text("Mon–Sat, 9 AM – 7 PM", "सोम–शनि, सुबह 9–शाम 7")}</div></div>
          </a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-smooth">
            <span className="h-12 w-12 rounded-xl gradient-cta text-primary-foreground flex items-center justify-center shrink-0"><Mail className="h-5 w-5" /></span>
             <div><div className="text-xs uppercase tracking-widest text-muted-foreground">{text("Email", "ईमेल")}</div><div className="font-semibold text-lg break-all">{COMPANY.email}</div><div className="text-sm text-muted-foreground">{text("Replies within 24 hrs", "24 घंटे में जवाब")}</div></div>
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-smooth">
            <span className="h-12 w-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0"><MessageCircle className="h-5 w-5" fill="currentColor" /></span>
             <div><div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div><div className="font-semibold text-lg">{text("Chat with us", "हमसे चैट करें")}</div><div className="text-sm text-muted-foreground">{text("Fast response during work hours", "कार्य समय में तेज़ जवाब")}</div></div>
          </a>
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border shadow-card">
            <span className="h-12 w-12 rounded-xl gradient-accent text-accent-foreground flex items-center justify-center shrink-0"><MapPin className="h-5 w-5" /></span>
             <div><div className="text-xs uppercase tracking-widest text-muted-foreground">{text("Office", "ऑफिस")}</div><div className="font-semibold text-lg">{COMPANY.address}</div><div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><Clock className="h-3.5 w-3.5" />{text("Open Mon – Sat", "सोम–शनि खुला")}</div></div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-card rounded-2xl p-7 md:p-10 shadow-elegant border border-border">
           <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{text("Send us a service request", "सेवा अनुरोध भेजें")}</h2>
           <p className="text-muted-foreground mb-6">{text("Tell us what you need — we'll prepare a clear proposal.", "अपनी जरूरत बताएँ—हम स्पष्ट प्रस्ताव तैयार करेंगे।")}</p>
          <InquiryForm />
        </div>
      </section>

      <section className="container pb-20">
        <div className="rounded-2xl overflow-hidden shadow-elegant border border-border h-[400px]">
          <iframe
            title="SS TECH SERVICES Lucknow"
            src="https://www.google.com/maps?q=Lucknow,Uttar+Pradesh,India&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
