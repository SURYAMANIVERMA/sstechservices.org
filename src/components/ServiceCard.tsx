import { Link } from "react-router-dom";
import { Service } from "@/lib/services";
import { ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServiceCard = ({ service }: { service: Service }) => {
  const Icon = service.icon;
  const { language, text } = useLanguage();
  return (
    <div className="group relative gradient-card border border-border rounded-2xl p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-smooth overflow-hidden">
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-smooth" />
      <div className="relative">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl gradient-cta text-primary-foreground shadow-elegant mb-5 group-hover:scale-110 transition-smooth">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{language === "hi" ? service.titleHi : service.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{language === "hi" ? service.shortHi : service.short}</p>
        <ul className="space-y-1.5 mb-5">
          {service.features.slice(0, 3).map(f => (
            <li key={f} className="text-sm text-foreground/80 flex items-start gap-2">
              <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />{f}
            </li>
          ))}
        </ul>
        <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-smooth">
           {text("Request Service", "सेवा का अनुरोध करें")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
        </Link>
      </div>
    </div>
  );
};
