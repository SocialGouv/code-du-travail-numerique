/**
 * Génère le mapping éditorial de la rubrique « Explorez nos thématiques »
 * (#7455) à partir du CSV tenu par le métier.
 *
 *   pnpm explore-themes:mapping
 *
 * Source : src/modules/contributions/explore-themes/mapping.csv
 * Sortie : src/modules/contributions/explore-themes/mapping.generated.ts
 *
 * Le CSV est la seule chose que le métier édite. Le fichier TypeScript est
 * versionné à côté : le mapping reste typé, et son diff se relit en revue sans
 * avoir à rejouer le script.
 */

import * as fs from "fs";
import * as path from "path";

// Résolus depuis la racine du package : ce fichier est exécuté compilé depuis
// `dist/` (pnpm explore-themes:mapping) mais lu depuis `scripts/` par les
// tests, et `__dirname` diffère donc entre les deux.
const PACKAGE_ROOT = path.join(__dirname, "..");
const MODULE_DIR = path.join(
  PACKAGE_ROOT,
  "src",
  "modules",
  "contributions",
  "explore-themes"
);
const CSV_FILE = path.join(MODULE_DIR, "mapping.csv");
const OUTPUT_FILE = path.join(MODULE_DIR, "mapping.generated.ts");

// Slug tel que le produit `slugify` : minuscules, chiffres et tirets simples.
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// `1486-mon-slug` est le slug du document Elasticsearch d'une déclinaison par
// convention collective ; la clé du mapping est celle de la fiche générique.
const IDCC_PREFIX = /^\d+-/;
const SEPARATOR = ";";
// `printWidth` de Prettier, laissé à sa valeur par défaut dans le dépôt.
const PRINT_WIDTH = 80;
const HEADER = ["contribution", "sous_theme_1", "sous_theme_2"];

export type ExploreThemesMapping = Record<string, [string, string]>;

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
 * Lit le CSV et en tire le mapping. Lève sur le premier fichier invalide, en
 * listant TOUTES les lignes fautives : le métier corrige son fichier en une
 * passe plutôt qu'en relançant le script à chaque erreur.
 */
export const parseMappingCsv = (content: string): ExploreThemesMapping => {
  const errors: string[] = [];
  const mapping: ExploreThemesMapping = {};
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
    throw new Error(`mapping.csv invalide :\n- ${errors.join("\n- ")}`);
  }

  return mapping;
};

/**
 * Rend le module TypeScript. Le format suit ce que produirait Prettier :
 * guillemets autour des clés qui en ont besoin, virgule finale, retour à la
 * ligne du type qui dépasse 80 colonnes.
 */
export const renderMapping = (mapping: ExploreThemesMapping): string => {
  const entries = Object.entries(mapping)
    .map(([contributionSlug, subThemeSlugs]) => {
      const key = toPropertyKey(contributionSlug);
      const values = subThemeSlugs.map((slug) => `"${slug}"`);
      const inline = `  ${key}: [${values.join(", ")}],`;
      // Au-delà de 80 colonnes, Prettier éclate le tableau ligne à ligne.
      return inline.length <= PRINT_WIDTH
        ? inline
        : `  ${key}: [\n${values.map((value) => `    ${value},`).join("\n")}\n  ],`;
    })
    .join("\n");

  return `// Généré par \`pnpm explore-themes:mapping\` depuis \`mapping.csv\`.
// Ne pas éditer à la main : la prochaine génération écraserait la retouche.
//
// Clé = slug GÉNÉRIQUE de la contribution : la page déclinée par convention
// collective et la fiche générique partagent la même entrée. Valeur = les deux
// sous-thèmes à mettre en avant, dans l'ordre d'affichage.
export const CONTRIBUTION_SUB_THEMES: Record<
  string,
  readonly [string, string]
> = {${entries === "" ? "" : `\n${entries}\n`}};
`;
};

// Prettier ne laisse de guillemets que sur les clés qui l'exigent : un slug
// porte presque toujours un tiret, mais pas toujours.
const toPropertyKey = (key: string): string =>
  /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : `"${key}"`;

const main = () => {
  const mapping = parseMappingCsv(fs.readFileSync(CSV_FILE, "utf8"));
  fs.writeFileSync(OUTPUT_FILE, renderMapping(mapping));

  const count = Object.keys(mapping).length;
  console.log(
    `[explore-themes] ${count} contribution(s) mappée(s) · écrit : ${path.relative(PACKAGE_ROOT, OUTPUT_FILE)}`
  );
};

// `require.main` : le fichier est aussi importé par ses tests, qui ne doivent
// pas déclencher l'écriture.
if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`[explore-themes] ${(error as Error).message}`);
    process.exit(1);
  }
}
