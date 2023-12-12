const SLUG_FOR_POC_SWAP = [
  "les-conges-pour-evenements-familiaux",
  "quelle-est-la-duree-de-preavis-en-cas-de-licenciement",
  "la-periode-dessai-peut-elle-etre-renouvelee",
];
export const showNewContribPage = (slug): boolean => {
  const match = SLUG_FOR_POC_SWAP.find((url) => slug.endsWith(url));
  return !!match;
};

export const removeCCNumberFromSlug = (slug: string): string =>
  slug.split("-").slice(1).join("-");
