import Layout from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { getProgramme, getSponsors } from "../lib/airtable";

export async function getStaticProps() {
  const [items, sponsors] = await Promise.all([getProgramme(), getSponsors()]);
  return { props: { items, sponsors }, revalidate: 300 };
}

export default function Programme({ items, sponsors }) {
  const { lang } = useLanguage();
  return (
    <Layout sponsors={sponsors}>
      <h1 className="font-serif text-2xl text-ink mb-6">
        {lang !== "en" ? "Programme des épreuves" : "Competition schedule"}
      </h1>
      <div className="space-y-4">
        {items.map((p, i) => (
          <div key={p.id || i} className="bg-white border border-gold/30 rounded-md p-4">
            <div className="font-serif text-lg text-ink">{lang !== "en" ? p.EpreuveFR : p.EpreuveEN}</div>
            <div className="text-sm text-teal">{p.Site}</div>
            <div className="text-sm text-ink/80 mt-1">{p.Date}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
