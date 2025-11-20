import { SearchResultsByCategory } from "./types";

export const mockSearchResults: SearchResultsByCategory = {
  actualites: [
    {
      id: "1",
      type: "ARTICLE DU DROIT DU TRAVAIL",
      title: "Rupture du contrat en période d'essai par le salarié",
      slug: "/code-du-travail/rupture-contrat-periode-essai",
    },
    {
      id: "2",
      type: "THEME",
      title: "Mise en demeure pour abandon de poste",
      slug: "/themes/mise-en-demeure-abandon-poste",
    },
    {
      id: "3",
      type: "MODELE DE DOCUMENT",
      title: "Convocation à un entretien préalable au licenciement pour...",
      slug: "/modeles/convocation-entretien-prealable",
    },
    {
      id: "4",
      type: "CONVENTION COLLECTIVE",
      title: "Lettre de démission",
      slug: "/modeles/lettre-demission",
    },
  ],
  suggestions: [
    {
      id: "5",
      type: "THEME",
      title: "Thématique : Congés",
      slug: "/themes/conges",
    },
    {
      id: "6",
      type: "CONVENTION COLLECTIVE",
      title: "Convention collective : Métallurgie",
      slug: "/convention-collective/metallurgie",
    },
    {
      id: "7",
      type: "MODELE DE DOCUMENT",
      title: "Outils : Simuler mon indemnité de rupture conventionnelle",
      slug: "/outils/simulateur-indemnite-rupture",
    },
    {
      id: "8",
      type: "CONVENTION COLLECTIVE",
      title: "Modèle de lettre de démission",
      slug: "/modeles/lettre-demission-2",
    },
  ],
};
