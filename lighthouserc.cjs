const DEFAULT_PREPROD_BASE_URL =
  "https://code-du-travail-numerique-preprod.ovh.fabrique.social.gouv.fr";

/**
 * List of audited routes (from the accessibility statement).
 * Keep this list as PATHS (not full URLs) so the base URL can be switched
 * between local / preprod / review environments.
 */
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

function slugifyBranchName(raw) {
  return (
    String(raw ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
      // keep it short to match typical review env limits (see kontiuous branchSlug32)
      .slice(0, 32)
  );
}

function computeBaseUrl() {
  // 1) Explicit override (works in local and CI)
  if (process.env.LHCI_BASE_URL)
    return normalizeBaseUrl(process.env.LHCI_BASE_URL);
  // Convenience aliases (so you can reuse existing env var naming)
  if (process.env.BASE_URL) return normalizeBaseUrl(process.env.BASE_URL);
  // "B URL" as requested (base URL), in case your shell/scripts already use it
  if (process.env.B_URL) return normalizeBaseUrl(process.env.B_URL);
  if (process.env.SITE_URL) return normalizeBaseUrl(process.env.SITE_URL);

  // 2) Local default
  if (!process.env.CI) return "http://localhost:3000";

  // 3) CI default: preprod for main branches, otherwise best-effort branch env
  const refName = process.env.GITHUB_REF_NAME;
  if (refName === "master" || refName === "main")
    return DEFAULT_PREPROD_BASE_URL;

  // Best-effort: review URL derived from branch name
  if (refName) {
    const branchSlug = slugifyBranchName(refName);
    if (branchSlug) {
      return `https://code-du-travail-numerique-${branchSlug}.ovh.fabrique.social.gouv.fr`;
    }
  }

  // Fallback: preprod (safe default)
  return DEFAULT_PREPROD_BASE_URL;
}

const baseUrl = computeBaseUrl();
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
