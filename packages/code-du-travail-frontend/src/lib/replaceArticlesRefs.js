/**
 * prefix relative link with a given domain
 */

const RE_ARTICLE_NUM = /href=["'](\/[^'"]+)["']/g;

export const replaceArticlesRefs = (domain, html = "") =>
  html.replace(RE_ARTICLE_NUM, (_, href) => {
    return `href='${domain}${href}' rel='nofollow noopener' target='_blank'`;
  });
