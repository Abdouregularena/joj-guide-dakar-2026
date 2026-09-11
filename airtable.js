// Couche d'accès aux données Airtable.
// Si AIRTABLE_API_KEY / AIRTABLE_BASE_ID ne sont pas définis, on retombe
// sur des données de démonstration pour que le site reste consultable.

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

async function fetchTable(tableName) {
  if (!API_KEY || !BASE_ID) {
    return null; // pas de config -> l'appelant utilisera les données de secours
  }
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName)}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate: 300 }, // 5 min
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.records.map((r) => ({ id: r.id, ...r.fields }));
  } catch (e) {
    console.error(`Airtable fetch failed for ${tableName}:`, e.message);
    return null;
  }
}

// ---- Données de démonstration (utilisées tant qu'Airtable n'est pas connecté) ----

const DEMO = {
  Hebergements: [
    { NomFR: "Hôtel Terrou-Bi", NomEN: "Terrou-Bi Hotel", Ville: "Dakar", PrixIndicatif: "60 000 - 120 000 FCFA/nuit", Lien: "" },
    { NomFR: "Résidence Diamniadio", NomEN: "Diamniadio Residence", Ville: "Diamniadio", PrixIndicatif: "35 000 - 70 000 FCFA/nuit", Lien: "" },
    { NomFR: "Hôtel Lamantin Saly", NomEN: "Lamantin Beach Saly", Ville: "Saly", PrixIndicatif: "45 000 - 90 000 FCFA/nuit", Lien: "" },
  ],
  Transport: [
    { TrajetFR: "Dakar → Diamniadio", TrajetEN: "Dakar → Diamniadio", DureeEstimee: "45-60 min", PrixIndicatif: "5 000 - 8 000 FCFA (VTC)" },
    { TrajetFR: "Dakar → Saly", TrajetEN: "Dakar → Saly", DureeEstimee: "1h15-1h30", PrixIndicatif: "12 000 - 18 000 FCFA (VTC)" },
    { TrajetFR: "Diamniadio → Saly", TrajetEN: "Diamniadio → Saly", DureeEstimee: "45 min", PrixIndicatif: "7 000 - 10 000 FCFA (VTC)" },
  ],
  TauxChange: [
    { Devise: "EUR", Valeur: "655.96 FCFA", MiseAJour: "manuelle" },
    { Devise: "USD", Valeur: "600.00 FCFA", MiseAJour: "manuelle" },
    { Devise: "GBP", Valeur: "760.00 FCFA", MiseAJour: "manuelle" },
  ],
  NumerosUtiles: [
    { NomFR: "Police secours", NomEN: "Police emergency", Numero: "17" },
    { NomFR: "Pompiers / SAMU", NomEN: "Fire / Ambulance", Numero: "18" },
    { NomFR: "Comité d'organisation JOJ (COJOJ)", NomEN: "Dakar 2026 Organising Committee", Numero: "À compléter" },
  ],
  Programme: [
    { EpreuveFR: "Cérémonie d'ouverture", EpreuveEN: "Opening ceremony", Site: "Dakar", Date: "31 octobre 2026" },
    { EpreuveFR: "Athlétisme", EpreuveEN: "Athletics", Site: "Diamniadio", Date: "1-8 novembre 2026" },
    { EpreuveFR: "Aviron de mer", EpreuveEN: "Coastal rowing", Site: "Saly", Date: "3-6 novembre 2026" },
  ],
  Securite: [
    { ConseilFR: "Gardez une copie numérique de vos papiers d'identité.", ConseilEN: "Keep a digital copy of your ID documents." },
    { ConseilFR: "Privilégiez les VTC réservés via une application plutôt que le hélage dans la rue.", ConseilEN: "Prefer app-booked rideshares over street hailing." },
    { ConseilFR: "Évitez d'exhiber des objets de valeur dans les lieux très fréquentés.", ConseilEN: "Avoid displaying valuables in crowded areas." },
  ],
  Sponsors: [],
};

export async function getHebergements() {
  return (await fetchTable("Hebergements")) || DEMO.Hebergements;
}
export async function getTransport() {
  return (await fetchTable("Transport")) || DEMO.Transport;
}
export async function getTauxChange() {
  return (await fetchTable("TauxChange")) || DEMO.TauxChange;
}
export async function getNumerosUtiles() {
  return (await fetchTable("NumerosUtiles")) || DEMO.NumerosUtiles;
}
export async function getProgramme() {
  return (await fetchTable("Programme")) || DEMO.Programme;
}
export async function getSecurite() {
  return (await fetchTable("Securite")) || DEMO.Securite;
}
export async function getSponsors() {
  return (await fetchTable("Sponsors")) || DEMO.Sponsors;
}
