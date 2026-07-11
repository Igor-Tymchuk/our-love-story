import { useState, useCallback, createContext, useContext } from "react";
import translations from "@/lib/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("nadia_lang") || "en";
    } catch {
      return "en";
    }
  });

  const switchLang = useCallback((l) => {
    setLang(l);
    try {
      localStorage.setItem("nadia_lang", l);
    } catch {}
  }, []);

  const t = useCallback(
    (key) => {
      return translations[lang]?.[key] || translations.en?.[key] || key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
