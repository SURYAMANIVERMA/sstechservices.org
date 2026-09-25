import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectDrafts } from "@/lib/projects";

const Projects = () => {
  const { text } = useLanguage();
  return <>
    <Helmet>
      <title>{text("Projects — SS TECH SERVICES | IT Infrastructure Case Studies", "प्रोजेक्ट — SS TECH SERVICES | IT इंफ्रास्ट्रक्चर")}</title>
      <meta name="description" content={text("SS TECH SERVICES project portfolio for structured cabling, servers, CCTV and cloud monitoring. Verified case studies are being prepared.", "SS TECH SERVICES का केबलिंग, सर्वर, CCTV और क्लाउड मॉनिटरिंग पोर्टफोलियो। सत्यापित केस स्टडी तैयार की जा रही हैं।")} />
      <link rel="canonical" href="/projects" />
    </Helmet>
    <PageHero eyebrow={text("Project Portfolio", "प्रोजेक्ट पोर्टफोलियो")} title={<>{text("Verified", "सत्यापित")} <span className="text-gradient-accent">{text("project portfolio", "प्रोजेक्ट पोर्टफोलियो")}</span></>} subtitle={text("We are preparing genuine SS TECH SERVICES case studies with approved site photos and client details.", "हम स्वीकृत साइट फोटो और क्लाइंट विवरण के साथ वास्तविक SS TECH SERVICES केस स्टडी तैयार कर रहे हैं।")} />

    <section className="container py-20">
       <div className="mb-10 flex items-start gap-3 rounded-md border border-primary/20 bg-secondary p-4 text-sm">
         <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
         <p>{text("Client names, photographs and results will appear only after they are verified and approved. The images below currently illustrate service categories, not claimed client sites.", "क्लाइंट नाम, फोटो और परिणाम सत्यापन और स्वीकृति के बाद ही दिखेंगे। नीचे की तस्वीरें अभी सेवा श्रेणियों का उदाहरण हैं, किसी क्लाइंट साइट का दावा नहीं।")}</p>
       </div>
       <div className="grid md:grid-cols-2 gap-6">
          {projectDrafts.map(project => (
           <article key={project.id} className="overflow-hidden rounded-md bg-card border border-border shadow-card">
            <div className="relative overflow-hidden h-56">
               <img src={project.image} alt={text(project.title, project.titleHi)} width={1024} height={768} loading="lazy" className="h-full w-full object-cover" />
               <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold rounded gradient-accent text-accent-foreground">{text(project.service, project.serviceHi)}</span>
               <span className="absolute bottom-3 right-3 rounded bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-foreground">{text("Verification pending", "सत्यापन बाकी")}</span>
            </div>
            <div className="p-5">
               <h3 className="font-display text-lg font-semibold mb-2">{text(project.title, project.titleHi)}</h3>
               <p className="mb-2 text-sm font-medium text-foreground">{text(project.client, project.clientHi)}</p>
               <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{project.location}</p>
               <p className="text-muted-foreground text-sm leading-relaxed">{text(project.summary, project.summaryHi)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="container pb-20 text-center">
       <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">{text("Have a similar project in mind?", "क्या आपके पास भी ऐसा प्रोजेक्ट है?")}</h2>
       <Button asChild variant="cta" size="lg"><Link to="/contact">{text("Start a Conversation", "बात शुरू करें")} <ArrowRight /></Link></Button>
    </section>
  </>;
};

export default Projects;
