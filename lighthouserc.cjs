const PATHS = [
  "/",
  "/mentions-legales",
  "/plan-du-site",
  "/accessibilite",
  "/droit-du-travail",
  "/outils",
  "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
  "/information/licenciement-pour-inaptitude-medicale",
  "/stats",
  "/themes/contrat-de-travail",
  "/recherche?query=cong%C3%A9s%20sans%20solde",
  "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie",
  "/contribution/les-conges-pour-evenements-familiaux",
  "/glossaire",
  "/fiche-ministere-travail/les-jours-feries-et-les-ponts",
  "/code-du-travail/d3133-1",
  "/convention-collective/2120-banque",
  "/outils/indemnite-licenciement",
  "/outils/indemnite-rupture-conventionnelle",
];

function normalizeBaseUrl(raw) {
  const trimmed = String(raw ?? "").trim();
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

if (!process.env.LHCI_BASE_URL) {
  throw new Error("LHCI_BASE_URL environment variable is not set");
}

const baseUrl = normalizeBaseUrl(process.env.LHCI_BASE_URL);
const urls = PATHS.map((path) => new URL(path, baseUrl).toString());

module.exports = {
  ci: {
    collect: {
      url: urls,
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
      },
    },
  },
};
