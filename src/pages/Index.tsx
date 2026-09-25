import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { InquiryForm } from "@/components/InquiryForm";
import { services } from "@/lib/services";
import { COMPANY } from "@/lib/company";
import {
  ArrowRight, CheckCircle2, Award, Clock, Users, ShieldCheck,
  Phone, Mail, MapPin, TrendingUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg from "@/assets/hero-it.jpg";
import serverImg from "@/assets/project-server.jpg";
import { projectDrafts } from "@/lib/projects";

const Index = () => {
  const { text } = useLanguage();
  const localizedStats = [
    { value: "9", label: text("Core IT Services", "मुख्य IT सेवाएँ") },
    { value: COMPANY.founded, label: text("Established", "स्थापना वर्ष") },
    { value: "EN / हिं", label: text("Bilingual Assistance", "द्विभाषी सहायता") },
    { value: "India", label: text("Service Coverage", "सेवा क्षेत्र") },
  ];
  const localizedWhyUs = [
    { icon: Award, title: text("Certified Engineers", "प्रमाणित इंजीनियर"), desc: text("Specialists across networking, Linux, cloud and enterprise platforms.", "नेटवर्किंग, Linux, क्लाउड और एंटरप्राइज़ प्लेटफ़ॉर्म के विशेषज्ञ।") },
    { icon: Clock, title: text("Rapid Response", "तेज़ सहायता"), desc: text("Fast onsite response across Uttar Pradesh and nearby regions.", "उत्तर प्रदेश और आसपास के क्षेत्रों में तेज़ ऑनसाइट सहायता।") },
    { icon: ShieldCheck, title: text("Enterprise-Grade SLAs", "एंटरप्राइज़ SLA"), desc: text("Clearly defined service levels and uptime commitments.", "स्पष्ट सेवा स्तर और अपटाइम प्रतिबद्धताएँ।") },
    { icon: TrendingUp, title: text("End-to-End Delivery", "शुरू से अंत तक सेवा"), desc: text("Design, procurement, deployment and ongoing support.", "डिज़ाइन, खरीद, डिप्लॉयमेंट और निरंतर सपोर्ट।") },
  ];
  return (
    <>
      <Helmet>
         <title>{text("SS TECH SERVICES — IT Infrastructure & Networking in Lucknow", "SS TECH SERVICES — लखनऊ में IT इंफ्रास्ट्रक्चर और नेटवर्किंग")}</title>
         <meta name="description" content={text("Lucknow-based IT company for network installation, cabling, servers, CCTV, cloud, OpenShift and IT manpower across India.", "लखनऊ की IT कंपनी—नेटवर्क, केबलिंग, सर्वर, CCTV, क्लाउड, OpenShift और IT मैनपावर सेवाएँ पूरे भारत में।")} />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="SS TECH SERVICES — IT Infrastructure & Networking" />
        <meta property="og:description" content="Network, server, CCTV, cloud and managed IT services from Lucknow." />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY.name,
          url: `https://${COMPANY.domain}`,
          telephone: COMPANY.phone,
          email: COMPANY.email,
          address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressRegion: "UP", addressCountry: "IN" },
        })}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center text-primary-foreground overflow-hidden gradient-hero">
        <div className="absolute inset-0">
          <img src={heroImg} alt="IT infrastructure server room" width={1920} height={1280} className="h-full w-full object-cover" />
          <div className="absolute inset-0 gradient-hero-overlay" />
          <div className="absolute inset-0 cyber-grid opacity-40" />
        </div>
         <div className="container relative py-20 md:py-24 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/5 backdrop-blur border border-primary-foreground/15 text-xs uppercase tracking-widest font-semibold mb-7">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-primary-glow opacity-60 animate-ping" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary-glow" /></span>
               {text("Enterprise IT Operations", "एंटरप्राइज़ IT संचालन")} • {text("Since", "वर्ष")} {COMPANY.founded}
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02] mb-6">
               {text("Engineering", "हम बनाते हैं")} <span className="text-gradient-accent">{text("Reliable IT", "भरोसेमंद IT")}</span><br />{text("Infrastructure", "इंफ्रास्ट्रक्चर")}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-9 leading-relaxed">
               {text("Secure networks, resilient servers, cloud operations and 24×7 managed support—engineered in Lucknow and delivered across India.", "सुरक्षित नेटवर्क, मजबूत सर्वर, क्लाउड संचालन और 24×7 मैनेज्ड सपोर्ट—लखनऊ में डिज़ाइन, पूरे भारत में डिलीवरी।")}
            </p>
            <div className="flex flex-wrap gap-3">
               <Button asChild variant="hero" size="xl"><Link to="/contact">{text("Get a Free Quote", "निःशुल्क कोटेशन पाएँ")} <ArrowRight /></Link></Button>
               <Button asChild variant="outlineHero" size="xl"><Link to="/services">{text("Explore Services", "सेवाएँ देखें")}</Link></Button>
            </div>
            <div className="mt-10 pt-7 border-t border-primary-foreground/10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/65">
               {[text("Certified engineers", "प्रमाणित इंजीनियर"), text("24×7 support", "24×7 सपोर्ट"), text("Pan-India delivery", "पूरे भारत में सेवा")].map(t => (
                <span key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary-glow" />{t}</span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-up relative">
            <div className="absolute -top-14 -right-2 h-28 w-28 opacity-30">
              <img src={COMPANY.logo} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="relative bg-background/90 backdrop-blur-xl border border-primary-foreground/15 rounded-lg p-6 shadow-elegant max-w-md ml-auto overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-glow via-primary-glow to-accent" />
              <div className="flex items-start justify-between gap-4 mb-5 text-foreground">
                 <div><p className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-1">{text("Project Desk", "प्रोजेक्ट डेस्क")}</p><h3 className="font-display text-xl font-semibold">{text("Request a consultation", "परामर्श का अनुरोध करें")}</h3></div>
                 <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded px-2 py-1">{text("24h response", "24 घंटे में जवाब")}</span>
              </div>
              <div className="text-foreground">
                <InquiryForm compact />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-glow/70 to-transparent" />
      </section>

      {/* STATS */}
      <section className="bg-secondary border-y border-border">
        <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
           {localizedStats.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-5xl font-bold text-primary">{s.value}</div>
              <div className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANY PROFILE */}
      <section className="container py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
           <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("About SS TECH SERVICES", "SS TECH SERVICES के बारे में")}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-5">
             {text("Your end-to-end IT infrastructure partner from", "आपका संपूर्ण IT इंफ्रास्ट्रक्चर पार्टनर,")} <span className="text-primary">{text("Lucknow", "लखनऊ")}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-5">
             {text(`Since ${COMPANY.founded}, SS TECH SERVICES has helped enterprises, SMBs, hospitals, educational institutions and government agencies build dependable IT backbones.`, `${COMPANY.founded} से SS TECH SERVICES एंटरप्राइज़, छोटे व्यवसाय, अस्पताल, शिक्षण और सरकारी संस्थानों के लिए भरोसेमंद IT आधार बना रहा है।`)}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
             {text("Our engineers design, deploy and operate business-critical systems with transparent processes, clean documentation and honest SLAs.", "हमारे इंजीनियर पारदर्शी प्रक्रिया, स्पष्ट दस्तावेज़ और ईमानदार SLA के साथ महत्वपूर्ण सिस्टम डिज़ाइन, डिप्लॉय और संचालित करते हैं।")}
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
             {[text("Certified & experienced engineers", "प्रमाणित और अनुभवी इंजीनियर"), text("Pan-India project execution", "पूरे भारत में प्रोजेक्ट"), text("Multi-vendor expertise", "मल्टी-वेंडर विशेषज्ञता"), text("24×7 NOC monitoring", "24×7 NOC मॉनिटरिंग")].map(t => (
              <div key={t} className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="h-5 w-5 text-accent" />{t}</div>
            ))}
          </div>
           <Button asChild variant="cta" size="lg"><Link to="/about">{text("Learn More About Us", "हमारे बारे में और जानें")} <ArrowRight /></Link></Button>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl gradient-accent opacity-20 blur-2xl" />
          <img src={serverImg} alt="SS TECH SERVICES engineers working" width={1024} height={768} loading="lazy" className="relative rounded-2xl shadow-elegant w-full" />
          <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-5 shadow-elegant max-w-[220px] hidden md:block">
            <Users className="h-8 w-8 text-accent mb-2" />
            <div className="font-display font-bold text-2xl text-primary">50+</div>
             <div className="text-xs text-muted-foreground">{text("Certified engineers on the field", "फील्ड में प्रमाणित इंजीनियर")}</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
             <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("What We Do", "हम क्या करते हैं")}</p>
             <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">{text("Full-stack IT services, one trusted partner", "सभी IT सेवाएँ, एक भरोसेमंद पार्टनर")}</h2>
             <p className="text-muted-foreground text-lg">{text("From structured cabling to cloud monitoring, we cover every layer of your IT estate.", "स्ट्रक्चर्ड केबलिंग से क्लाउड मॉनिटरिंग तक, हम आपकी हर IT जरूरत संभालते हैं।")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
           <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("Why Choose Us", "हमें क्यों चुनें")}</p>
           <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">{text("Built on trust. Delivered with discipline.", "भरोसे पर निर्मित। अनुशासन से डिलीवर।")}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {localizedWhyUs.map(w => (
            <div key={w.title} className="text-center p-6 rounded-2xl border border-border hover:border-accent/40 hover:shadow-card transition-smooth bg-card">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4 shadow-accent">
                <w.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{w.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS GALLERY */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
             <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{text("Recent Work", "हाल के प्रोजेक्ट")}</p>
             <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">{text("Projects we're proud of", "हमारे प्रमुख प्रोजेक्ट")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
             {projectDrafts.map(project => (
               <div key={project.id} className="group relative rounded-md overflow-hidden shadow-card hover:shadow-elegant transition-smooth">
                 <img src={project.image} alt={text(project.title, project.titleHi)} width={1024} height={768} loading="lazy" className="h-72 w-full object-cover group-hover:scale-105 transition-smooth duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                 <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                   <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold rounded gradient-accent mb-2">{text(project.service, project.serviceHi)}</span>
                   <h3 className="font-display font-semibold text-lg leading-snug">{text(project.title, project.titleHi)}</h3>
                   <p className="mt-1 text-xs text-primary-foreground/70">{text("Details pending verification", "विवरण का सत्यापन बाकी")}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
             <Button asChild variant="outline" size="lg"><Link to="/projects">{text("View All Projects", "सभी प्रोजेक्ट देखें")} <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section className="relative gradient-cta text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 10% 20%, hsl(22 100% 52% / 0.5), transparent 40%)"
        }} />
        <div className="container relative py-20 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 leading-tight">{text("Ready to build a more reliable IT setup?", "क्या आप अधिक भरोसेमंद IT सेटअप चाहते हैं?")}</h2>
             <p className="text-primary-foreground/85 text-lg mb-8">{text("Talk to our team for a free site survey and transparent quotation.", "निःशुल्क साइट सर्वे और स्पष्ट कोटेशन के लिए हमारी टीम से बात करें।")}</p>
            <div className="space-y-4">
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-3 hover:text-accent transition-smooth">
                <span className="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center"><Phone className="h-5 w-5" /></span>
                 <div><div className="text-xs uppercase tracking-widest opacity-70">{text("Call us", "कॉल करें")}</div><div className="font-semibold">{COMPANY.phone}</div></div>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 hover:text-accent transition-smooth">
                <span className="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center"><Mail className="h-5 w-5" /></span>
                 <div><div className="text-xs uppercase tracking-widest opacity-70">{text("Email", "ईमेल")}</div><div className="font-semibold">{COMPANY.email}</div></div>
              </a>
              <div className="flex items-center gap-3">
                <span className="h-11 w-11 rounded-full bg-white/15 flex items-center justify-center"><MapPin className="h-5 w-5" /></span>
                 <div><div className="text-xs uppercase tracking-widest opacity-70">{text("Office", "ऑफिस")}</div><div className="font-semibold">{COMPANY.address}</div></div>
              </div>
            </div>
          </div>
          <div className="bg-background text-foreground rounded-2xl p-7 md:p-8 shadow-elegant">
             <h3 className="font-display text-2xl font-bold mb-1">{text("Request a Service", "सेवा का अनुरोध करें")}</h3>
             <p className="text-muted-foreground text-sm mb-5">{text("We respond within 24 hours.", "हम 24 घंटे में जवाब देते हैं।")}</p>
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
