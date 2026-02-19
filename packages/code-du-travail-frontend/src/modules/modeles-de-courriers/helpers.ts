const SLUG_LETTERS = [
  "document-dinformation-sur-le-conge-de-reclassement",
  "certificat-de-travail",
  "rupture-dun-commun-accord-conge-de-mobilite",
  "rupture-dun-commun-accord-rupture-conventionnelle-collective",
  "rupture-dun-contrat-de-travail-a-duree-determinee-dun-commun-accord",
  "releve-dheures-supplementaires",
  "rupture-dun-contrat-dapprentissage-dun-commun-accord",
  "promesse-dembauche",
  "affichage-obligatoire-relatif-au-harcelement-sexuel",
  "contrat-de-travail-a-duree-determinee-cdd",
  "contrat-de-travail-a-duree-indeterminee",
];

export const getTitle = (slug: string, title: string) => {
  if (SLUG_LETTERS.includes(slug)) {
    return `Modèle - ${title}`;
  }
  return `Modèle de lettre - ${title}`;
};

export const getDisclaimer = (slug: string) => {
  if (SLUG_LETTERS.includes(slug)) {
    return "Attention, chaque modèle de document proposé est à personnaliser selon votre situation et est susceptible d'évoluer suite à des changements de réglementation. Assurez-vous d'avoir la dernière version mise à jour avant toute utilisation.";
  }
  return "Attention, chaque modèle de lettre proposé est à personnaliser selon votre situation et est susceptible d'évoluer suite à des changements de réglementation. Assurez-vous d'avoir la dernière version mise à jour avant toute utilisation.";
};

const BLOCK_ELEMENTS_REGEX =
  /<(p|ul|ol|div|table|details|h[1-6]|blockquote|figure|section|article)[\s>/]/i;

export const wrapInParagraphIfNeeded = (html: string): string => {
  const trimmed = html.trim();

  if (
    /^<(p|ul|ol|div|table|details|h[1-6]|blockquote|figure|section|article)[\s>/]/i.test(
      trimmed
    )
  ) {
    return html;
  }

  const match = BLOCK_ELEMENTS_REGEX.exec(trimmed);
  if (match && match.index !== undefined && match.index > 0) {
    const textBefore = trimmed.substring(0, match.index);
    const rest = trimmed.substring(match.index);
    return `<p>${textBefore}</p>${rest}`;
  }

  return `<p>${html}</p>`;
};
