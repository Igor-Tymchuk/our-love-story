import { useState, useCallback, createContext, useContext } from "react";
import translations from "@/lib/translations";

const LanguageContext = createContext();

const getDefaultLanguage = () => {
  try {
    const savedLang = localStorage.getItem("nadia_lang");

    if (savedLang) {
      return savedLang;
    }

    const browserLanguages = navigator.languages || [navigator.language];

    const supportedLanguages = ["uk", "pl", "en"];

    for (const browserLang of browserLanguages) {
      const lang = browserLang.toLowerCase().split("-")[0];

      if (supportedLanguages.includes(lang)) {
        localStorage.setItem("nadia_lang", lang);
        return lang;
      }
    }

    localStorage.setItem("nadia_lang", "en");
    return "en";
  } catch {
    return "en";
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getDefaultLanguage);

  const switchLang = useCallback((newLang) => {
    setLang(newLang);

    try {
      localStorage.setItem("nadia_lang", newLang);
    } catch {}
  }, []);

  const t = useCallback(
    (key) => {
      return translations[lang]?.[key] || translations.en?.[key] || key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        switchLang,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
