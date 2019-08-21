const slugify = require("@cdt/data/slugify");

function splitArticle(article) {
  const { title, description, intro, date, breadcrumbs, themeCdtn } = article;
  let prefixTitle = title;
  // extract accronyms inside parenthesis
  // Contrat de sécurisation professionnelle (CSP)
  const [, acronym = ""] = title.match(/\((.+)\)/) || [];
  // If there is only one opening parenthesis, assume that the value between parenthesis
  // is an acronym: use it as the prefix.
  // and sometimes accronyms can be followed by text
  if (title.split("(").length === 2 && acronym === acronym.toUpperCase()) {
    prefixTitle = acronym + title.slice(title.indexOf(")") + 1);
  } else if (title.indexOf(":") > -1) {
    // Otherwise use the part before the first colon.
    [prefixTitle] = title.split(/:/);
  }

  const patterns = [
    "5 questions réponses sur ",
    "5 questions sur ",
    "5 questions-réponses sur ",
    "5 questions/réponses sur "
  ];
  for (const pattern of patterns) {
    prefixTitle = prefixTitle.replace(pattern, "");
  }
  prefixTitle = prefixTitle.replace(/\s+/g, " ").trim();
  return article.text_by_section
    .filter(isUnusedSection)
    .map(({ title: sectionTitle, url, text, html }) => {
      const title = transformSectionTitle({ sectionTitle, prefixTitle });
      const [anchor] = url.match(/#.+$/);
      return {
        title,
        anchor,
        intro,
        description,
        date,
        breadcrumbs,
        text,
        html,
        url,
        themeCdtn,
        slug: slugify(title)
      };
    });
}

function isUnusedSection({ title }) {
  return !/L.INFO EN PLUS/i.test(title) && !/POUR ALLER PLUS LOIN/i.test(title);
}

function transformSectionTitle({ sectionTitle: title, prefixTitle }) {
  // Remove '1)', '2)', '3)' etc.
  let sectionTitle = title.replace(/\d\)/, "");

  //Remove 'Question 1 : ', 'Question 2 : ' etc.
  sectionTitle = sectionTitle.replace(/question\s?\d\s?:?\s?/i, "");
  // add the prefix, only if it is not present in the sectionTitle
  // and if sectionTitle doesn't contains ":" ( there is already a prefix)
  if (sectionTitle.indexOf(prefixTitle) === -1) {
    sectionTitle = `${prefixTitle}: ${sectionTitle.toLowerCase()}`;
  }

  // replace multiple spaces by a single space.
  sectionTitle = sectionTitle.replace(/\s+/g, " ").trim();

  return sectionTitle.trim().replace(/^\w/, value => value.toUpperCase());
}

module.exports = { splitArticle };
