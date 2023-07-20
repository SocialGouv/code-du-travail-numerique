const SLUG_FOR_POC_SWAP = [
  "les-conges-pour-evenements-familiaux",
  "quelle-est-la-duree-de-preavis-en-cas-de-licenciement",
];
const showNewContribPage = (slug): boolean => {
  const match = SLUG_FOR_POC_SWAP.find((url) => slug.endsWith("-" + url));
  return !!match;
};

export default showNewContribPage;
