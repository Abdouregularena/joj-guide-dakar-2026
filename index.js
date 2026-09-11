import Layout from "../components/Layout";
import { useLanguage, UI } from "../context/LanguageContext";
import { getTauxChange, getSponsors } from "../lib/airtable";

export async function getStaticProps() {
  const [taux, sponsors] = await Promise.all([getTauxChange(), getSponsors()]);
  return { props: { taux, sponsors }, revalidate: 300 };
}

export default function Home({ taux, sponsors }) {
  const { lang } = useLanguage();
  const t = UI[lang];

  return (
    <Layout sponsors={sponsors} showFloating>
      <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">{t.home_title}</h1>
      <p className="text-teal text-lg mb-8 max-w-xl">{t.home_subtitle}</p>

      <div className="bg-white border-2 border-senegal-green/30 rounded-md p-5">
        <h2 className="text-sm text-teal mb-3">{t.exchange_title}</h2>
        <div className="grid grid-cols-3 gap-4">
          {taux.map((r) => (
            <div key={r.Devise}>
              <div className="font-serif text-2xl text-senegal-green">{r.Devise}</div>
              <div className="text-sm text-teal">{r.Valeur}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
