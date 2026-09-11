import Layout from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { getTransport, getSponsors } from "../lib/airtable";

export async function getStaticProps() {
  const [items, sponsors] = await Promise.all([getTransport(), getSponsors()]);
  return { props: { items, sponsors }, revalidate: 300 };
}

export default function Transport({ items, sponsors }) {
  const { lang } = useLanguage();
  return (
    <Layout sponsors={sponsors}>
      <h1 className="font-serif text-2xl text-ink mb-6">
        {lang !== "en" ? "Transport entre les sites" : "Transport between venues"}
      </h1>
      <div className="space-y-4">
        {items.map((tr, i) => (
          <div key={tr.id || i} className="bg-white border border-gold/30 rounded-md p-4">
            <div className="font-serif text-lg text-ink">{lang !== "en" ? tr.TrajetFR : tr.TrajetEN}</div>
            <div className="text-sm text-teal">{tr.DureeEstimee}</div>
            <div className="text-sm text-ink/80 mt-1">{tr.PrixIndicatif}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
