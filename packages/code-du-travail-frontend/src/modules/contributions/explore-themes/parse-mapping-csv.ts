// Lecture du CSV éditorial de la rubrique « Explorez nos thématiques »
// (#7455). Pur : aucune entrée/sortie, pour que `mapping.ts` reste la seule
// chose à connaître l'emplacement du fichier.

// Slug tel que le produit `slugify` : minuscules, chiffres et tirets simples.
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// `1486-mon-slug` est le slug du document Elasticsearch d'une déclinaison par
// convention collective ; la clé du mapping est celle de la fiche générique.
const IDCC_PREFIX = /^\d+-/;
const SEPARATOR = ";";
const HEADER = ["contribution", "sous_theme_1", "sous_theme_2"];

export type ExploreThemesMapping = Record<string, readonly [string, string]>;

/**
 * Slug générique d'une contribution, quoi que le métier ait collé : slug nu,
 * chemin, URL complète, ou page déclinée par convention collective.
 */
export const toContributionSlug = (value: string): string => {
  const segments = toPathSegments(value);
  const routeIndex = segments.indexOf("contribution");
  const slug = routeIndex === -1 ? segments[0] : segments[routeIndex + 1];
  return (slug ?? "").replace(IDCC_PREFIX, "");
};

/**
 * Slug d'un sous-thème. Le lien d'un sous-thème porte son slug en ancre
 * (`/themes/conges#conges-payes`) : c'est elle qu'on retient quand le métier
 * colle un lien plutôt qu'un slug.
 */
export const toSubThemeSlug = (value: string): string => {
  const [, fragment] = value.trim().split("#");
  if (fragment) return fragment.trim();
  const segments = toPathSegments(value);
  return segments[segments.length - 1] ?? "";
};

const toPathSegments = (value: string): string[] =>
  value
    .trim()
    .replace(/^https?:\/\/[^/]+/i, "")
    .split(/[?#]/)[0]
    .split("/")
    .filter(Boolean);

/**
 * Lit le CSV et en tire le mapping. Lève sur un fichier invalide, en listant
 * TOUTES les lignes fautives : le métier corrige son fichier en une passe
 * plutôt qu'en le rechargeant à chaque erreur.
 */
export const parseMappingCsv = (content: string): ExploreThemesMapping => {
  const errors: string[] = [];
  const mapping: Record<string, readonly [string, string]> = {};
  // Excel exporte volontiers un BOM, des fins de ligne Windows et des cellules
  // entre guillemets.
  const lines = content.replace(/^\uFEFF/, "").split(/\r?\n/);
  let headerSeen = false;

  lines.forEach((rawLine, index) => {
    const lineNumber = index + 1;
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) return;

    const cells = line.split(SEPARATOR).map((cell) =>
      cell
        .trim()
        .replace(/^"(.*)"$/, "$1")
        .trim()
    );

    if (!headerSeen) {
      headerSeen = true;
      if (cells.join(SEPARATOR) !== HEADER.join(SEPARATOR)) {
        errors.push(
          `ligne ${lineNumber} : en-tête attendu « ${HEADER.join(SEPARATOR)} », trouvé « ${line} »`
        );
      }
      return;
    }

    if (cells.length !== HEADER.length) {
      errors.push(
        `ligne ${lineNumber} : ${cells.length} colonne(s) au lieu de ${HEADER.length} — séparateur « ${SEPARATOR} » attendu`
      );
      return;
    }

    const contributionSlug = toContributionSlug(cells[0]);
    const subThemeSlugs = [
      toSubThemeSlug(cells[1]),
      toSubThemeSlug(cells[2]),
    ] as [string, string];

    if (!KEBAB_CASE.test(contributionSlug)) {
      errors.push(
        `ligne ${lineNumber} : slug de contribution illisible dans « ${cells[0]} »`
      );
      return;
    }
    if (mapping[contributionSlug]) {
      errors.push(
        `ligne ${lineNumber} : la contribution « ${contributionSlug} » est déjà mappée plus haut`
      );
      return;
    }

    const invalid = subThemeSlugs.filter((slug) => !KEBAB_CASE.test(slug));
    if (invalid.length > 0) {
      errors.push(
        `ligne ${lineNumber} : sous-thème illisible — ${invalid.map((slug) => `« ${slug} »`).join(", ")}`
      );
      return;
    }
    // Deux fois le même sous-thème afficherait deux cartes identiques.
    if (subThemeSlugs[0] === subThemeSlugs[1]) {
      errors.push(
        `ligne ${lineNumber} : les deux sous-thèmes sont identiques (« ${subThemeSlugs[0]} »)`
      );
      return;
    }

    mapping[contributionSlug] = subThemeSlugs;
  });

  if (!headerSeen) {
    errors.push(`en-tête « ${HEADER.join(SEPARATOR)} » introuvable`);
  }
  if (errors.length > 0) {
    throw new Error(`mapping invalide :\n- ${errors.join("\n- ")}`);
  }

  return mapping;
};
