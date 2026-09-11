import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "fr", setLang: () => {}, dir: "ltr" });

const RTL_LANGS = ["ar"];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("joj-lang") : null;
    if (["fr", "en", "ar", "zh"].includes(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const changeLang = (l) => {
    setLang(l);
    if (typeof window !== "undefined") window.localStorage.setItem("joj-lang", l);
  };

  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// Dictionnaire des textes d'interface (hors contenu Airtable, qui a ses propres champs FR/EN/AR/ZH)
export const UI = {
  fr: {
    nav_home: "Accueil",
    nav_hebergement: "Hébergement",
    nav_transport: "Transport",
    nav_programme: "Programme",
    nav_numeros: "Numéros utiles",
    nav_securite: "Sécurité",
    home_title: "Le guide des JOJ Dakar 2026",
    home_subtitle: "Hébergement, transport, taux de change, programme et conseils pratiques pour les Jeux Olympiques de la Jeunesse à Dakar, Diamniadio et Saly.",
    exchange_title: "Taux de change du jour",
    see_more: "Voir plus",
  },
  en: {
    nav_home: "Home",
    nav_hebergement: "Accommodation",
    nav_transport: "Transport",
    nav_programme: "Schedule",
    nav_numeros: "Useful numbers",
    nav_securite: "Safety",
    home_title: "The Dakar 2026 YOG guide",
    home_subtitle: "Accommodation, transport, exchange rates, schedule and practical tips for the Youth Olympic Games in Dakar, Diamniadio and Saly.",
    exchange_title: "Today's exchange rates",
    see_more: "See more",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_hebergement: "الإقامة",
    nav_transport: "النقل",
    nav_programme: "البرنامج",
    nav_numeros: "أرقام مفيدة",
    nav_securite: "السلامة",
    home_title: "دليل الألعاب الأولمبية للشباب داكار 2026",
    home_subtitle: "الإقامة والنقل وأسعار الصرف والبرنامج ونصائح عملية للألعاب الأولمبية للشباب في داكار وديامنيادو وسالي.",
    exchange_title: "أسعار الصرف اليوم",
    see_more: "شاهد المزيد",
  },
  zh: {
    nav_home: "首页",
    nav_hebergement: "住宿",
    nav_transport: "交通",
    nav_programme: "赛程",
    nav_numeros: "常用电话",
    nav_securite: "安全提示",
    home_title: "2026年达喀尔青年奥运会指南",
    home_subtitle: "达喀尔、迪亚姆尼亚久和萨利青年奥运会的住宿、交通、汇率、赛程和实用提示。",
    exchange_title: "今日汇率",
    see_more: "查看更多",
  },
};

export const LANG_LABELS = { fr: "FR", en: "EN", ar: "AR", zh: "中文" };
