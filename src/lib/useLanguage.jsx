import { useState, useCallback, createContext, useContext } from "react";
import translations from "@/lib/translations";

const LanguageContext = createContext();

const getDefaultLanguage = () => {
  try {
    const savedLang = localStorage.getItem("nadia_lang");

    if (savedLang) {
      return savedLang;
    }

    const browserLang = navigator.language.toLowerCase();

    if (browserLang.startsWith("uk")) return "uk";
    if (browserLang.startsWith("pl")) return "pl";
    if (browserLang.startsWith("en")) return "en";

    return "en";
  } catch {
    return "en";
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getDefaultLanguage);

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
