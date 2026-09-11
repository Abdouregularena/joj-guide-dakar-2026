import Layout from "../components/Layout";
import { useLanguage } from "../context/LanguageContext";
import { getSecurite, getSponsors } from "../lib/airtable";

export async function getStaticProps() {
  const [items, sponsors] = await Promise.all([getSecurite(), getSponsors()]);
  return { props: { items, sponsors }, revalidate: 300 };
}

export default function Securite({ items, sponsors }) {
  const { lang } = useLanguage();
  return (
    <Layout sponsors={sponsors}>
      <h1 className="font-serif text-2xl text-ink mb-6">
        {lang !== "en" ? "Conseils sécurité" : "Safety tips"}
      </h1>
      <ul className="space-y-3 list-disc list-inside">
        {items.map((s, i) => (
          <li key={s.id || i} className="text-ink/90">
            {lang !== "en" ? s.ConseilFR : s.ConseilEN}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
