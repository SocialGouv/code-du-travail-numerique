// Lecture du CSV éditorial de la rubrique « Explorez nos thématiques »
// (#7455). Pur : aucune entrée/sortie, pour que `mapping.ts` reste la seule
// chose à connaître l'emplacement du fichier.

// Slug tel que le produit `slugify` : minuscules, chiffres et tirets simples.
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// `1486-mon-slug` est le slug du document Elasticsearch d'une déclinaison par
// convention collective ; la clé du mapping est celle de la fiche générique.
const IDCC_PREFIX = /^\d+-/;
const SEPARATOR = ";";
const HEADER = ["contribution", "theme", "sous_theme_1", "sous_theme_2"];

export type ContributionThemes = {
  // Sous-thème de rattachement de la contribution : la carte de repli quand
  // l'un des deux sous-thèmes complémentaires manque.
  theme: string;
  // Un ou deux sous-thèmes complémentaires, dans l'ordre d'affichage.
  subThemes: readonly string[];
};

export type ExploreThemesMapping = Record<string, ContributionThemes>;

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
  const mapping: ExploreThemesMapping = {};
  // Excel exporte volontiers un BOM, des fins de ligne Windows et des cellules
  // entre guillemets.
  const lines = content.replace(/^﻿/, "").split(/\r?\n/);
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

    // Excel omet le dernier « ; » quand la dernière cellule est vide : on
    // tolère une colonne manquante, jamais une de trop.
    if (cells.length < HEADER.length - 1 || cells.length > HEADER.length) {
      errors.push(
        `ligne ${lineNumber} : ${cells.length} colonne(s) au lieu de ${HEADER.length} — séparateur « ${SEPARATOR} » attendu`
      );
      return;
    }

    const contributionSlug = toContributionSlug(cells[0]);
    const theme = toSubThemeSlug(cells[1]);
    // Les deux sous-thèmes complémentaires sont facultatifs : une cellule vide
    // laisse la place au thème de rattachement.
    const subThemes = cells
      .slice(2)
      .filter((cell) => cell !== "")
      .map(toSubThemeSlug);

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
    if (!KEBAB_CASE.test(theme)) {
      errors.push(
        `ligne ${lineNumber} : thème illisible — « ${theme || cells[1]} »`
      );
      return;
    }
    if (subThemes.length === 0) {
      errors.push(
        `ligne ${lineNumber} : aucun sous-thème — il en faut au moins un en plus du thème « ${theme} »`
      );
      return;
    }

    const invalid = subThemes.filter((slug) => !KEBAB_CASE.test(slug));
    if (invalid.length > 0) {
      errors.push(
        `ligne ${lineNumber} : sous-thème illisible — ${invalid.map((slug) => `« ${slug} »`).join(", ")}`
      );
      return;
    }
    // Deux fois le même slug, entre sous-thèmes ou avec le thème de
    // rattachement, afficherait deux cartes identiques.
    const duplicate = [theme, ...subThemes].find(
      (slug, position, all) => all.indexOf(slug) !== position
    );
    if (duplicate) {
      errors.push(
        `ligne ${lineNumber} : le sous-thème « ${duplicate} » apparaît deux fois`
      );
      return;
    }

    mapping[contributionSlug] = { theme, subThemes };
  });

  if (!headerSeen) {
    errors.push(`en-tête « ${HEADER.join(SEPARATOR)} » introuvable`);
  }
  if (errors.length > 0) {
    throw new Error(`mapping invalide :\n- ${errors.join("\n- ")}`);
  }

  return mapping;
};
