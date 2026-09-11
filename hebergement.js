import Layout from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { getHebergements, getSponsors } from "../lib/airtable";

export async function getStaticProps() {
  const [items, sponsors] = await Promise.all([getHebergements(), getSponsors()]);
  return { props: { items, sponsors }, revalidate: 300 };
}

export default function Hebergement({ items, sponsors }) {
  const { lang } = useLanguage();
  return (
    <Layout sponsors={sponsors}>
      <h1 className="font-serif text-2xl text-ink mb-6">
        {lang !== "en" ? "Hébergements" : "Accommodation"}
      </h1>
      <div className="space-y-4">
        {items.map((h, i) => (
          <div key={h.id || i} className="bg-white border border-gold/30 rounded-md p-4">
            <div className="font-serif text-lg text-ink">{lang !== "en" ? h.NomFR : h.NomEN}</div>
            <div className="text-sm text-teal">{h.Ville}</div>
            <div className="text-sm text-ink/80 mt-1">{h.PrixIndicatif}</div>
            {h.Lien && (
              <a href={h.Lien} className="text-sm text-gold underline">
                {lang !== "en" ? "Réserver" : "Book"}
              </a>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
