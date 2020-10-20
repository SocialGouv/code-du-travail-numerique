/**
 * prefix relative link with a given domain
 */

const RE_ARTICLE_NUM = /<a(.*)href=["']((?<!https:\/\/)[^'"]+)["']([^>]+)>/gim;

export const replaceArticlesRefs = (domain, html = "") =>
  html.replace(RE_ARTICLE_NUM, (_, param1, url, param2) => {
    return `<a${param1}href="${domain}${
      url.startsWith("/") ? "" : "/"
    }${url}"${param2} rel="nofollow noopener" target="_blank">`;
  });
