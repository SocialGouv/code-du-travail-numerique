// Do we really need this one ?
const find = require("unist-util-find");
const queryString = require("query-string");
const cdt = require("@socialgouv/legi-data/data/LEGITEXT000006072050.json");
const conventions = require("@socialgouv/kali-data/data/index.json");

const isConventionCollective = qs => qs.idConvention;
const isCodeDuTravail = qs => qs.cidTexte === "LEGITEXT000006072050";
const isJournalOfficiel = qs => (qs.cidText || "").includes("JORFTEXT");

const getTextType = qs => {
  if (isCodeDuTravail(qs)) {
    return "code-du-travail";
  }
  if (isConventionCollective(qs)) {
    return "convention-collective";
  }
  if (isJournalOfficiel(qs)) {
    return "journal-officiel";
  }
};

// resolve article.num in LEGI extract
const getArticleNumFromId = id => {
  const article = find(
    cdt,
    node => node.type === "article" && node.data.id === id
  );
  return article && article.data.num;
};

const getArticlesFromSection = id => {
  const section = find(cdt, node => node.data.id === id);
  if (section) {
    return section.children
      .filter(child => child.type === "article")
      .map(article => createCDTRef(article.data.num));
  }
  return [];
};

const createCDTRef = id => ({
  type: "code-du-travail",
  id: id.toLowerCase(),
  title: `Article ${id} du code du travail`
});

const createCCRef = (id, slug, title) => ({
  type: "convention-collective",
  id,
  slug,
  title
});

const createJORef = (id, title, url) => ({
  type: "journal-officiel",
  id,
  title,
  url
});

const parseReference = reference => {
  const { URL: url } = reference.attributes;
  const qs = queryString.parse(url.split("?")[1]);
  const type = getTextType(qs);
  switch (type) {
    case "code-du-travail":
      if (qs.idArticle) {
        // resolve related article num from CDT structure
        const articleNum = getArticleNumFromId(qs.idArticle);
        if (!articleNum) return [];
        return [createCDTRef(articleNum)];
      }
      if (qs.idSectionTA) {
        // resolve related articles from CDT structure
        return getArticlesFromSection(qs.idSectionTA);
      }
      break;
    case "convention-collective": {
      const { id, slug, title } = conventions.find(
        convention => convention.id === qs.idConvention
      );
      return [createCCRef(id, slug, title)];
    }
    case "journal-officiel":
      return [
        createJORef(qs.cidTexte, reference.children[0].children[0].text, url)
      ];
    default:
      return [];
  }
};

module.exports = parseReference;
