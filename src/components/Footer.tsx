import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { text } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <img src={COMPANY.logo} alt="SS TECH SERVICES logo" className="h-14 w-14 object-contain" />
            <span className="font-display font-bold text-lg">{COMPANY.name}</span>
          </div>
          <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
             {text(`Trusted IT infrastructure, networking and managed services partner based in Lucknow, serving enterprises across India since ${COMPANY.founded}.`, `${COMPANY.founded} से लखनऊ स्थित भरोसेमंद IT इंफ्रास्ट्रक्चर, नेटवर्किंग और मैनेज्ड सर्विस पार्टनर, जो पूरे भारत में सेवाएँ देता है।`)}
          </p>
          <div className="flex gap-2">
            {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="h-9 w-9 rounded-md bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-smooth">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-base">{text("Company", "कंपनी")}</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-accent transition-smooth">{text("About Us", "हमारे बारे में")}</Link></li>
            <li><Link to="/services" className="hover:text-accent transition-smooth">{text("Services", "सेवाएँ")}</Link></li>
            <li><Link to="/service-advisor" className="hover:text-accent transition-smooth flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />{text("AI Service Advisor", "AI सेवा सलाहकार")}</Link></li>
            <li><Link to="/projects" className="hover:text-accent transition-smooth">{text("Projects", "प्रोजेक्ट")}</Link></li>
            <li><Link to="/careers" className="hover:text-accent transition-smooth">{text("Careers", "करियर")}</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-smooth">{text("Contact", "संपर्क")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-base">{text("Services", "सेवाएँ")}</h4>
          <ul className="space-y-2.5 text-sm text-primary-foreground/70">
            <li>{text("Network Installation", "नेटवर्क इंस्टॉलेशन")}</li>
            <li>{text("Structured Cabling", "स्ट्रक्चर्ड केबलिंग")}</li>
            <li>{text("Server & Storage", "सर्वर और स्टोरेज")}</li>
            <li>{text("CCTV & Security", "CCTV और सुरक्षा")}</li>
            <li>{text("Cloud & Monitoring", "क्लाउड और मॉनिटरिंग")}</li>
            <li>{text("IT Manpower Support", "IT मैनपावर सपोर्ट")}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-base">{text("Reach Us", "संपर्क करें")}</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" /> {COMPANY.address}</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" /> <a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-accent">{COMPANY.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-accent shrink-0" /> <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} {COMPANY.legal}. {text("All rights reserved.", "सर्वाधिकार सुरक्षित।")}</p>
          <p>{text("Designed for performance. Built for trust.", "बेहतर प्रदर्शन और भरोसे के लिए निर्मित।")}</p>
        </div>
      </div>
    </footer>
  );
};
