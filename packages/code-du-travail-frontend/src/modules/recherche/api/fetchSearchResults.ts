import { SearchResult } from "../modal/types";

export const mockSearchResults: SearchResult[] = [
  {
    id: "3",
    type: "CONVENTION COLLECTIVE",
    title: "Article L1234-9 du Code du travail",
    slug: "/code-du-travail/article-l1234-9",
  },
  {
    id: "4",
    type: "DROIT DU TRAVAIL",
    title: "Convention collective nationale de la métallurgie",
    slug: "/convention-collective/metallurgie",
  },
  {
    id: "5",
    type: "FICHE PRATIQUE",
    title: "Rupture du contrat en période d'essai par le salarié",
    slug: "/code-du-travail/rupture-contrat-periode-essai",
  },
  {
    id: "6",
    type: "INFOGRAPHIE",
    title: "Modèle de lettre de démission",
    slug: "/modeles/lettre-demission",
  },
  {
    id: "7",
    type: "INFOGRAPHIE",
    title: "Modèle de lettre de démission",
    slug: "/modeles/lettre-demission",
  },
  {
    id: "8",
    type: "MODÈLE DE DOCUMENT",
    title: "Modèle de lettre de démission",
    slug: "/modeles/lettre-demission",
  },
  {
    id: "9",
    type: "SIMULATEUR",
    title: "Modèle de lettre de démission",
    slug: "/modeles/lettre-demission",
  },
  {
    id: "10",
    type: "THÉMATIQUE",
    title: "Modèle de lettre de démission",
    slug: "/modeles/lettre-demission",
  },
];

export const fetchSearchResults = async (): Promise<SearchResult[]> => {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Retourner au maximum 4 résultats dans un ordre aléatoire
  const shuffled = [...mockSearchResults];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 4);
};
