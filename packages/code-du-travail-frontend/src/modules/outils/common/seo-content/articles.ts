// Labour code article numbers such as "L1237-11", "R3243-1" or "D1237-2".
export const ARTICLE_REGEX = /^[LRD]\d{4}-\d+(?:-\d+)?$/;

export const getArticleHref = (article: string): string =>
  `/code-du-travail/${article.toLowerCase()}`;
