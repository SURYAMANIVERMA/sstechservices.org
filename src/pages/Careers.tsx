import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, ArrowRight, GraduationCap, Heart, Rocket } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { useLanguage } from "@/contexts/LanguageContext";

const jobs = [
  { title: "Network Engineer (L2)", location: "Lucknow", type: "Full-time", exp: "2-5 yrs" },
  { title: "Linux / OpenShift Engineer", location: "Lucknow / Remote", type: "Full-time", exp: "3-6 yrs" },
  { title: "Field Service Engineer — CCTV & Networking", location: "Lucknow", type: "Full-time", exp: "1-3 yrs" },
  { title: "Cloud & DevOps Engineer", location: "Remote", type: "Full-time", exp: "2-5 yrs" },
  { title: "IT Support Executive (L1)", location: "Lucknow", type: "Full-time", exp: "0-2 yrs" },
];

const Careers = () => {
  const { text } = useLanguage();
  const perks = [
    { icon: GraduationCap, title: text("Continuous Learning", "निरंतर सीखना"), desc: text("Certifications, training support and lab access.", "सर्टिफिकेशन, ट्रेनिंग सहायता और लैब एक्सेस।") },
    { icon: Heart, title: text("Work-Life Balance", "काम और जीवन का संतुलन"), desc: text("Reasonable hours, paid leave and flexible options.", "उचित कार्य समय, सवेतन अवकाश और लचीले विकल्प।") },
    { icon: Rocket, title: text("Real Growth", "वास्तविक विकास"), desc: text("Mentorship, responsibility and clear career paths.", "मार्गदर्शन, जिम्मेदारी और स्पष्ट करियर पथ।") },
  ];
  return <>
    <Helmet>
      <title>{text("Careers — Join SS TECH SERVICES in Lucknow", "करियर — लखनऊ में SS TECH SERVICES से जुड़ें")}</title>
      <meta name="description" content={text("Build your IT career with SS TECH SERVICES in networking, Linux, OpenShift and cloud.", "नेटवर्किंग, Linux, OpenShift और क्लाउड में SS TECH SERVICES के साथ अपना IT करियर बनाएँ।")} />
      <link rel="canonical" href="/careers" />
    </Helmet>
    <PageHero eyebrow={text("Careers", "करियर")} title={<>{text("Build your career", "अपना करियर बनाएँ")} <span className="text-gradient-accent">{text("with engineers", "इंजीनियरों के साथ")}</span></>} subtitle={text("Join a team that values skill, learning and ownership.", "ऐसी टीम से जुड़ें जो कौशल, सीखने और जिम्मेदारी को महत्व देती है।")} />

    <section className="container py-20">
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {perks.map(p => (
          <div key={p.title} className="p-7 rounded-2xl bg-card border border-border shadow-card text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-foreground shadow-accent mb-4"><p.icon className="h-7 w-7" /></div>
            <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm">{p.desc}</p>
          </div>
        ))}
      </div>

       <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">{text("Open Positions", "खाली पद")}</h2>
       <p className="text-center text-muted-foreground mb-10">{text("Don't see your role? Email your CV to", "अपनी भूमिका नहीं मिली? CV भेजें")} <a href={`mailto:${COMPANY.email}`} className="text-accent font-semibold">{COMPANY.email}</a></p>

      <div className="space-y-4 max-w-4xl mx-auto">
        {jobs.map(j => (
          <div key={j.title} className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:border-accent/40 transition-smooth flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold mb-1.5">{j.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{j.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{j.type}</span>
                 <span>{text("Experience", "अनुभव")}: {j.exp}</span>
              </div>
            </div>
            <Button asChild variant="cta">
               <a href={`mailto:${COMPANY.email}?subject=Application: ${encodeURIComponent(j.title)}`}>{text("Apply Now", "अभी आवेदन करें")} <ArrowRight /></a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  </>;
};

export default Careers;
