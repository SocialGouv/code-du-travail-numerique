/**
 * prefix relative link with a given domain
 */

const RE_ARTICLE_NUM = /href=["']((?<!https:\/\/)[^'"]+)["']/g;

export const replaceArticlesRefs = (domain, html = "") =>
  html.replace(RE_ARTICLE_NUM, (_, href) => {
    return `href='${domain}${
      href.startsWith("/") ? "" : "/"
    }${href}' rel='nofollow noopener' target='_blank'`;
  });
