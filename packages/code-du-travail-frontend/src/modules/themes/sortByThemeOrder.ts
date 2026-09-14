import { Breadcrumb } from "@socialgouv/cdtn-types";
import { orderByAlpha } from "../utils";
import { ThemeRefs } from "./queries";

type Document = {
  slug: string;
  source: string;
  title: string;
  breadcrumbs?: Breadcrumb[];
};

// Rang d'un document sans breadcrumb ou absent des refs de son thème : il
// passe après les documents ordonnés, à égalité avec ses semblables.
const UNRANKED = Number.MAX_SAFE_INTEGER;

/**
 * Slug du thème désigné par un breadcrumb, tel que construit par cdtn-admin :
 * `/themes/parent#enfant` → `enfant`, `/themes/parent` → `parent`.
 */
const themeSlugOf = ({ slug }: Breadcrumb): string => {
  const [path, hash] = slug.split("#");
  return hash ?? path.slice(path.lastIndexOf("/") + 1);
};

const refKey = ({ source, slug }: { source: string; slug: string }) =>
  `${source}:${slug}`;

/**
 * Trie des documents dans l'ordre éditorial des thèmes (#7464) :
 * 1. position du thème racine, puis du sous-thème (`breadcrumbs[].position`,
 *    qui est la position d'un thème parmi ses frères) ;
 * 2. rang du document dans les `refs` du thème auquel il est rattaché, c'est
 *    l'ordre visible sur la page du thème ;
 * 3. titre, pour garder un ordre stable entre documents non classés.
 *
 * Un document rattaché directement à un thème racine passe avant ceux de ses
 * sous-thèmes.
 */
export const sortByThemeOrder = <T extends Document>(
  documents: T[],
  themes: (Pick<ThemeRefs, "slug"> & Partial<Pick<ThemeRefs, "refs">>)[]
): T[] => {
  const rankByTheme = new Map(
    themes.map(({ slug, refs }) => [
      slug,
      new Map((refs ?? []).map((ref, index) => [refKey(ref), index])),
    ])
  );

  const rankOf = (document: T): [number, number, number] => {
    const breadcrumbs = document.breadcrumbs ?? [];
    const theme = breadcrumbs.at(-1);
    const index = theme
      ? rankByTheme.get(themeSlugOf(theme))?.get(refKey(document))
      : undefined;
    return [
      breadcrumbs[0]?.position ?? UNRANKED,
      breadcrumbs[1]?.position ?? -1,
      index ?? UNRANKED,
    ];
  };

  const ranks = new Map(documents.map((doc) => [doc, rankOf(doc)]));
  return documents.toSorted((a, b) => {
    const rankA = ranks.get(a)!;
    const rankB = ranks.get(b)!;
    for (let level = 0; level < rankA.length; level++) {
      if (rankA[level] !== rankB[level]) return rankA[level] - rankB[level];
    }
    return orderByAlpha(a, b, "title");
  });
};
