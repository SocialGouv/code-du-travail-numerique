// Titres raccourcis affichés UNIQUEMENT dans les tags thème/sous-thème.
// Le reste du site (fil d'Ariane, titres, recherche, JSON-LD) conserve le titre complet.
// Clé = label du breadcrumb (= titre du thème tel qu'ingéré dans Elasticsearch),
// comparé de façon tolérante via getThemeTagShortTitle (cf. normalizeThemeLabel).
export const THEME_TAG_SHORT_TITLES: Record<string, string> = {
  "Entretien professionnel et conseil en évolution professionnelle (CEP)":
    "Entretien professionnel",
  "Congés liés à la vie familiale (mariage, décès, naissance...)":
    "Congés liés à la vie familiale",
  "Rupture conventionnelle collective et départ volontaire":
    "Départ volontaire",
  "Maladie, accident du travail et maladie professionnelle":
    "Maladie et accident du travail",
  "Représentation du personnel et négociation collective":
    "Représentation du personnel",
  "Temps d'équivalence, astreintes et temps d'habillage":
    "Temps d'équivalence, astreinte et habillage",
  "Mise à disposition, détachement et portage salarial":
    "Portage salariale et détachement",
  "Licenciement pour motif personnel ou disciplinaire":
    "Licenciement personnel ou disciplinaire",
  "Activité partielle (anciennement chômage partiel)":
    "Activité partielle (chômage partiel)",
  "Documents de fin de contrat et droit des salariés":
    "Documents de fin de contrat",
  "Épargne salariale, participation et intéressement": "Épargne salariale",
};

// Normalise un libellé de thème pour rendre le lookup robuste : les clés sont
// saisies à la main alors que le libellé réel vient d'Elasticsearch. On neutralise
// les écarts de ponctuation/casse/accents (apostrophe typographique vs droite,
// ellipsis vs "...", espaces insécables, diacritiques) qui feraient échouer une
// simple égalité de chaîne et retomber sur le titre long.
const normalizeThemeLabel = (label: string): string =>
  label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // supprime les diacritiques (accents)
    .replace(/[’‘`]/g, "'") // apostrophes typographiques -> droite
    .replace(/…/g, "...") // ellipsis -> trois points
    .replace(/[  ]/g, " ") // espaces insécables -> espace normal
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const NORMALIZED_SHORT_TITLES = new Map(
  Object.entries(THEME_TAG_SHORT_TITLES).map(([key, value]) => [
    normalizeThemeLabel(key),
    value,
  ])
);

// Renvoie le titre raccourci pour un libellé de thème, ou le libellé complet
// s'il n'y a pas de correspondance. À utiliser UNIQUEMENT pour les tags.
export const getThemeTagShortTitle = (label: string): string =>
  NORMALIZED_SHORT_TITLES.get(normalizeThemeLabel(label)) ?? label;
