import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhatsAppButton = () => {
  const { text: localize } = useLanguage();
  const message = encodeURIComponent(localize("Hi SS TECH SERVICES, I would like to enquire about your IT services.", "नमस्ते SS TECH SERVICES, मैं आपकी IT सेवाओं के बारे में जानकारी चाहता/चाहती हूँ।"));
  return (
    <a
      href={`https://wa.me/${COMPANY.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={localize("Chat on WhatsApp", "WhatsApp पर बात करें")}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant animate-pulse-ring hover:scale-110 transition-smooth"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  );
};
