import Link from "next/link";
import { useLanguage, UI, LANG_LABELS } from "../context/LanguageContext";
import AudioPlayer from "./AudioPlayer";

export default function Layout({ children, sponsors = [], showFloating = false }) {
  const { lang, setLang, dir } = useLanguage();
  const t = UI[lang];

  const nav = [
    { href: "/", label: t.nav_home },
    { href: "/hebergement", label: t.nav_hebergement },
    { href: "/transport", label: t.nav_transport },
    { href: "/programme", label: t.nav_programme },
    { href: "/numeros-utiles", label: t.nav_numeros },
    { href: "/securite", label: t.nav_securite },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      {/* Liseré tricolore Sénégal */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-senegal-green" />
        <div className="flex-1 bg-senegal-yellow" />
        <div className="flex-1 bg-senegal-red" />
      </div>

      <header className="bg-senegal-green text-cream relative overflow-hidden">
        {showFloating && (
          <>
            <span className="pointer-events-none absolute -top-4 left-6 text-senegal-yellow/30 text-4xl animate-float select-none" style={{ animationDelay: "0s" }}>✦</span>
            <span className="pointer-events-none absolute top-6 right-16 text-cream/20 text-3xl animate-float select-none" style={{ animationDelay: "1.5s" }}>✦</span>
            <span className="pointer-events-none absolute -bottom-2 left-1/3 text-senegal-yellow/20 text-2xl animate-float select-none" style={{ animationDelay: "3s" }}>✦</span>
          </>
        )}
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between relative z-10">
          <span className="font-serif text-lg">JOJ Dakar 2026</span>
          <div className="flex gap-1.5 text-xs">
            {Object.keys(LANG_LABELS).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2 py-1 rounded ${lang === code ? "bg-senegal-yellow text-ink font-semibold" : "text-cream/70"}`}
              >
                {LANG_LABELS[code]}
              </button>
            ))}
          </div>
        </div>
        <nav className="max-w-3xl mx-auto px-5 pb-3 flex gap-4 overflow-x-auto text-sm relative z-10">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-cream/90 hover:text-senegal-yellow transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {sponsors && sponsors.length > 0 && (
        <div className="bg-white border-b border-senegal-yellow/50">
          <div className="max-w-3xl mx-auto px-5 py-2 flex gap-3 overflow-x-auto">
            {sponsors.map((s) => (
              <a
                key={s.id}
                href={s.Lien || "#"}
                className="text-xs text-teal border border-teal/30 rounded px-3 py-1 whitespace-nowrap"
              >
                {s.NomFR || s.Nom || "Sponsor"}
              </a>
            ))}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-3xl mx-auto px-5 py-8 w-full animate-fade-in-up">{children}</main>

      <footer className="text-center text-xs text-teal/70 py-6 border-t-2 border-senegal-red/20">
        Guide JOJ Dakar 2026 — informations à titre indicatif, vérifiez auprès des organisateurs officiels.
      </footer>

      <AudioPlayer />
    </div>
  );
}
