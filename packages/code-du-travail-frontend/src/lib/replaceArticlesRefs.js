// assume we only have code-du-travail articles

// match basic article references
const RE_ARTICLE_NUM = /<a[^>]+>(((l' *)?article )?([LRD])[\s-.]*([\d-]+))\s*<\/a>/gim;
//(?:article )?

// fix single articles reference
export const replaceArticlesRefs = html =>
  (html &&
    html.replace(RE_ARTICLE_NUM, (all, text, prefix1, prefix2, type, num) => {
      const slug = type.trim().toLowerCase() + num.trim().toLowerCase();
      return `<a href="/code-du-travail/${slug}">${text}</a>`;
    })) ||
  "";
