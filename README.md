# Guide JOJ Dakar 2026 — Site web

Site Next.js bilingue FR/EN pour les Jeux Olympiques de la Jeunesse Dakar 2026
(31 octobre – 13 novembre 2026). Le contenu est piloté depuis Airtable — tu
n'as pas besoin de toucher au code pour mettre à jour l'information.

Tant qu'Airtable n'est pas connecté, le site fonctionne avec des données de
démonstration (déjà en ligne dans `lib/airtable.js`).

## 1. Créer la base Airtable

Sur [airtable.com](https://airtable.com), crée une base nommée par exemple
`JOJ Dakar 2026`, avec exactement ces 7 tables et colonnes :

**Hebergements**
| NomFR | NomEN | Ville | PrixIndicatif | Lien |

**Transport**
| TrajetFR | TrajetEN | DureeEstimee | PrixIndicatif |

**TauxChange**
| Devise | Valeur | MiseAJour |

**NumerosUtiles**
| NomFR | NomEN | Numero |

**Programme**
| EpreuveFR | EpreuveEN | Site | Date |

**Securite**
| ConseilFR | ConseilEN |

**Sponsors**
| NomFR | Lien | DateDebut | DateFin | Emplacement | MontantPaye |

## 2. Récupérer les identifiants Airtable

1. Va sur airtable.com/create/tokens → crée un jeton d'accès personnel avec
   accès en lecture sur ta base → copie-le (`AIRTABLE_API_KEY`).
2. Ouvre ta base → l'URL contient `appXXXXXXXXXXXXXX` → c'est ton
   `AIRTABLE_BASE_ID`.

## 3. Configurer le site

Copie `.env.example` en `.env.local` et renseigne les deux valeurs :

```
AIRTABLE_API_KEY=ton_jeton
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

## 4. Déployer sur Vercel (gratuit)

1. Crée un compte sur [vercel.com](https://vercel.com) (connexion possible
   avec GitHub).
2. Mets ce dossier dans un dépôt GitHub (ou demande à ce que ce soit fait
   pour toi), puis "Import Project" sur Vercel.
3. Dans les réglages du projet Vercel → Environment Variables → ajoute
   `AIRTABLE_API_KEY` et `AIRTABLE_BASE_ID`.
4. Déploie. Le site est en ligne en quelques minutes sur une URL du type
   `joj-guide-dakar.vercel.app`.
5. Pour un nom de domaine personnalisé, ajoute-le dans Vercel → Domains
   (ex : guidejoj2026.com — à réserver chez un registrar comme Namecheap
   ou OVH, ~10-15 000 FCFA/an).

## 5. Mettre à jour le contenu au quotidien

Toutes les modifications se font dans Airtable, depuis l'appli mobile :
- Ajouter/retirer un hôtel → table Hebergements
- Changer le taux du jour → table TauxChange
- Ajouter un sponsor → table Sponsors (le site régénère la page dans les
  5 minutes, `revalidate: 300`)

## Développement local

```
npm install
npm run dev
```
