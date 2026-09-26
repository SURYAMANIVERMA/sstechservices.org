import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Languages, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, text } = useLanguage();
  const links = [
    { to: "/", label: text("Home", "होम") },
    { to: "/about", label: text("About", "हमारे बारे में") },
    { to: "/services", label: text("Services", "सेवाएँ") },
    { to: "/service-advisor", label: text("AI Advisor", "AI सलाहकार"), icon: Sparkles },
    { to: "/projects", label: text("Projects", "प्रोजेक्ट") },
    { to: "/careers", label: text("Careers", "करियर") },
    { to: "/contact", label: text("Contact", "संपर्क") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 8);
    onScroll();
    globalThis.addEventListener("scroll", onScroll);
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-smooth",
      scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-card" : "bg-background/90 backdrop-blur-xl border-b border-border/70"
    )}>
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={COMPANY.logo} alt="SS TECH SERVICES logo" className="h-12 w-12 md:h-14 md:w-14 object-contain drop-shadow-sm group-hover:scale-105 transition-smooth" />
          <div className="leading-tight">
            <div className="font-display font-bold text-sm md:text-base text-foreground">{COMPANY.name}</div>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground hidden sm:block">{text("Infrastructure • Cloud • Security", "इंफ्रास्ट्रक्चर • क्लाउड • सुरक्षा")}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({ isActive }) => cn(
                 "px-3 py-2 rounded-md text-sm font-medium transition-smooth relative",
                isActive ? "text-primary" : "text-foreground/65 hover:text-primary"
              )}>
              {({ isActive }) => (
                <>
                  {l.icon && <l.icon className="inline h-3.5 w-3.5 mr-1" />}{l.label}
                  {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center border border-border rounded-md p-0.5" aria-label={text("Language", "भाषा")}>
            <Button type="button" size="sm" variant={language === "en" ? "secondary" : "ghost"} className="h-7 px-2 text-xs" onClick={() => setLanguage("en")}>EN</Button>
            <Button type="button" size="sm" variant={language === "hi" ? "secondary" : "ghost"} className="h-7 px-2 text-xs" onClick={() => setLanguage("hi")}>हिंदी</Button>
          </div>
          <a href={`tel:${COMPANY.phoneRaw}`} className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-smooth">
            <Phone className="h-4 w-4" /> {COMPANY.phone}
          </a>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
             <Link to="/contact">{text("Get a Quote", "कोटेशन पाएँ")}</Link>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="lg:hidden -mr-2" onClick={() => setOpen(o => !o)} aria-label={text("Toggle menu", "मेन्यू खोलें या बंद करें")}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) => cn(
                  "px-4 py-3 rounded-md text-base font-medium",
                  isActive ? "bg-secondary text-primary" : "text-foreground/80"
                )}>
                 {l.icon && <l.icon className="inline h-4 w-4 mr-2" />}{l.label}
              </NavLink>
            ))}
            <a href={`tel:${COMPANY.phoneRaw}`} className="px-4 py-3 text-primary font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" /> {COMPANY.phone}
            </a>
            <div className="flex items-center gap-2 px-4 py-2 border-t border-border mt-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <Button type="button" size="sm" variant={language === "en" ? "secondary" : "ghost"} onClick={() => setLanguage("en")}>English</Button>
              <Button type="button" size="sm" variant={language === "hi" ? "secondary" : "ghost"} onClick={() => setLanguage("hi")}>हिंदी</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
