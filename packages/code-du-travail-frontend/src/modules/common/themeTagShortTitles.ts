// Titres raccourcis affichés UNIQUEMENT dans les tags thème/sous-thème.
// Le reste du site (fil d'Ariane, titres, recherche, JSON-LD) conserve le titre complet.
// Clé = label exact du breadcrumb (= titre du thème tel qu'ingéré dans Elasticsearch).
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
  "Épargne salariale, participation et interessement": "Épargne salariale",
};
