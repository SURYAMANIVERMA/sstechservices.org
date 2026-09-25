import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "hi";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (english: string, hindi: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("ss-tech-language") === "hi" ? "hi" : "en";
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("ss-tech-language", nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    text: (english: string, hindi: string) => language === "hi" ? hindi : english,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};