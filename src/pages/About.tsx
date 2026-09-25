import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COMPANY } from "@/lib/company";
import { Target, Eye, Heart, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import serverImg from "@/assets/project-server.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { text } = useLanguage();
  const values = [
    { icon: Target, title: text("Mission", "मिशन"), desc: text("To empower Indian businesses with dependable, future-ready IT infrastructure delivered with integrity and craftsmanship.", "ईमानदारी और उत्कृष्ट कार्य के साथ भारतीय व्यवसायों को भरोसेमंद, भविष्य के लिए तैयार IT इंफ्रास्ट्रक्चर देना।") },
    { icon: Eye, title: text("Vision", "विजन"), desc: text("To be the most trusted IT infrastructure partner in North India — known for engineering excellence and customer focus.", "इंजीनियरिंग उत्कृष्टता और ग्राहक-केंद्रित सेवा के लिए उत्तर भारत का सबसे भरोसेमंद IT पार्टनर बनना।") },
    { icon: Heart, title: text("Values", "मूल्य"), desc: text("Honesty, ownership, technical depth and long-term partnerships. We treat your network like our own.", "ईमानदारी, जिम्मेदारी, तकनीकी गहराई और दीर्घकालीन साझेदारी। हम आपके नेटवर्क को अपना समझते हैं।") },
  ];
  return <>
    <Helmet>
      <title>{text("About Us — SS TECH SERVICES | IT Company in Lucknow", "हमारे बारे में — SS TECH SERVICES | लखनऊ IT कंपनी")}</title>
      <meta name="description" content={text("Learn about SS TECH SERVICES, a Lucknow-based IT infrastructure company delivering networking, server, CCTV, cloud and managed services since 2015.", "SS TECH SERVICES के बारे में जानें—लखनऊ की IT कंपनी जो 2015 से नेटवर्किंग, सर्वर, CCTV, क्लाउड और मैनेज्ड सेवाएँ देती है।")} />
      <link rel="canonical" href="/about" />
    </Helmet>
    <PageHero eyebrow={text("About Us", "हमारे बारे में")} title={<>{text("Built by engineers.", "इंजीनियरों द्वारा निर्मित।")} <span className="text-gradient-accent">{text("Trusted by businesses.", "व्यवसायों का भरोसा।")}</span></>} subtitle={text(`Since ${COMPANY.founded}, SS TECH SERVICES has delivered reliable IT infrastructure across India from Lucknow.`, `${COMPANY.founded} से SS TECH SERVICES लखनऊ से पूरे भारत में भरोसेमंद IT इंफ्रास्ट्रक्चर दे रहा है।`)} />

    <section className="container py-20 grid lg:grid-cols-2 gap-14 items-center">
      <img src={serverImg} alt="Engineering team" width={1024} height={768} loading="lazy" className="rounded-2xl shadow-elegant w-full" />
      <div>
         <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("Our Story", "हमारी कहानी")}</p>
         <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">{text("A decade of building dependable IT", "भरोसेमंद IT बनाने का एक दशक")}</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
           {text("SS TECH SERVICES was founded with a simple belief — businesses deserve IT infrastructure that just works. From a networking team in Lucknow, we have grown into a full-service IT company serving manufacturing, healthcare, education, BFSI and government organisations.", "SS TECH SERVICES की शुरुआत इस विश्वास से हुई कि हर व्यवसाय को ऐसा IT इंफ्रास्ट्रक्चर मिलना चाहिए जो भरोसे से काम करे। लखनऊ की नेटवर्किंग टीम से बढ़कर आज हम मैन्युफैक्चरिंग, हेल्थकेयर, शिक्षा, BFSI और सरकारी संस्थाओं को संपूर्ण IT सेवाएँ देते हैं।")}
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">
           {text("We combine deep technical expertise with disciplined delivery — every project documented, every cable labelled and every SLA honoured.", "हम गहरी तकनीकी विशेषज्ञता के साथ अनुशासित डिलीवरी करते हैं—हर प्रोजेक्ट का दस्तावेज़, हर केबल की लेबलिंग और हर SLA का सम्मान।")}
        </p>
        <div className="space-y-2.5">
           {[text("500+ successful project deployments", "500+ सफल प्रोजेक्ट"), text("Multi-vendor enterprise expertise", "मल्टी-वेंडर एंटरप्राइज़ विशेषज्ञता"), text("OpenShift and Linux specialists", "OpenShift और Linux विशेषज्ञ"), text("24×7 NOC for managed services", "मैनेज्ड सर्विस के लिए 24×7 NOC")].map(t => (
            <div key={t} className="flex gap-2 items-start"><CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" /><span className="text-foreground/85">{t}</span></div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-secondary/50 py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
           <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("What Drives Us", "हमारी प्रेरणा")}</p>
           <h2 className="font-display text-3xl md:text-4xl font-bold">{text("Mission, Vision & Values", "मिशन, विजन और मूल्य")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map(v => (
            <div key={v.title} className="p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition-smooth">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl gradient-cta text-primary-foreground shadow-elegant mb-5"><v.icon className="h-7 w-7" /></div>
              <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-20 text-center">
      <Award className="h-12 w-12 text-accent mx-auto mb-5" />
       <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{text("Let's build something reliable together", "आइए मिलकर भरोसेमंद समाधान बनाएँ")}</h2>
       <p className="text-muted-foreground max-w-xl mx-auto mb-8">{text("Talk to our team about your next IT project.", "अपने अगले IT प्रोजेक्ट के बारे में हमारी टीम से बात करें।")}</p>
       <Button asChild variant="cta" size="lg"><Link to="/contact">{text("Get in Touch", "संपर्क करें")} <ArrowRight /></Link></Button>
    </section>
  </>;
};

export default About;
