// Matches labour code article numbers such as "L1237-11", "R3243-1" or "D1237-2".
const ARTICLE_REGEX = /\b([LRD]\d{4}-\d+(?:-\d+)?)\b/g;

export type ReferencePart =
  | { type: "text"; value: string }
  | { type: "article"; value: string; href: string };

export const getArticleHref = (article: string): string =>
  `/code-du-travail/${article.toLowerCase()}`;

/** Splits a references sentence into plain text and article parts. */
export const splitReferences = (references: string): ReferencePart[] =>
  references
    .split(ARTICLE_REGEX)
    .filter((value) => value !== "")
    .map((value) =>
      /^[LRD]\d{4}-\d+(?:-\d+)?$/.test(value)
        ? { type: "article", value, href: getArticleHref(value) }
        : { type: "text", value }
    );
