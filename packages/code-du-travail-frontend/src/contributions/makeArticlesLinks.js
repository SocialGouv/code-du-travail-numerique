// normalize article reference for slugs : l123-4-5
const normalize = str =>
  str
    .replace(/[.\s]+/g, "")
    .replace(/^([LRD])-/, "$1")
    .toLowerCase();

// basic cdt article matcher for internal links
// create relative markdown links
const makeArticlesLinks = markdown => {
  const articleRegex = /([^[\w])([LRD][.-]?\s*\d+[^\s]+)\b/gi;
  let match;
  let str2 = markdown;
  while ((match = articleRegex.exec(markdown))) {
    str2 = str2.replace(
      new RegExp(`[^[](${match[2]})`),
      (_, match2) =>
        `${match[1]}[${match[2]}](/code-du-travail/${normalize(match2)})`
    );
  }
  return str2;
};

export default makeArticlesLinks;
