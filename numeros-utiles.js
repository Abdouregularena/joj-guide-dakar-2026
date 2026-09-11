import Layout from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { getNumerosUtiles, getSponsors } from "../lib/airtable";

export async function getStaticProps() {
  const [items, sponsors] = await Promise.all([getNumerosUtiles(), getSponsors()]);
  return { props: { items, sponsors }, revalidate: 300 };
}

export default function NumerosUtiles({ items, sponsors }) {
  const { lang } = useLanguage();
  return (
    <Layout sponsors={sponsors}>
      <h1 className="font-serif text-2xl text-ink mb-6">
        {lang !== "en" ? "Numéros utiles" : "Useful numbers"}
      </h1>
      <div className="space-y-3">
        {items.map((n, i) => (
          <div key={n.id || i} className="bg-white border border-gold/30 rounded-md p-4 flex justify-between items-center">
            <span className="text-ink">{lang !== "en" ? n.NomFR : n.NomEN}</span>
            <span className="font-serif text-lg text-gold">{n.Numero}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}
