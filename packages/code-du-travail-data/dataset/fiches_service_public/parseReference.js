// Do we really need this one ?
const queryString = require("query-string");
const {
  getCode,
  getArticleWithParentSections,
} = require("@socialgouv/legi-data");
const { getAgreements } = require("@socialgouv/kali-data");
const { SOURCES } = require("@socialgouv/cdtn-sources");
const slugify = require("@socialgouv/cdtn-slugify");
const find = require("unist-util-find");

const cdt = getCode("LEGITEXT000006072050");
const agreements = getAgreements();

const isConventionCollective = (qs) => qs.idConvention;
const isCodeDuTravail = (qs) => qs.cidTexte === "LEGITEXT000006072050";
const isJournalOfficiel = (qs) => (qs.cidText || "").includes("JORFTEXT");

const getTextType = (qs) => {
  if (isCodeDuTravail(qs)) {
    return "code-du-travail";
  }
  if (isConventionCollective(qs)) {
    return "convention-collective";
  }
  if (isJournalOfficiel(qs)) {
    return "journal-officiel";
  }
  return "";
};

function fixArticleNum(id, num = "") {
  if (num.match(/^annexe\s/i) && !num.includes("article")) {
    return `${num} ${id}`;
  }
  return num;
}

const createCDTRef = (node) => ({
  slug: slugify(fixArticleNum(node.data.id, node.data.num)),
  title: fixArticleNum(node.data.id, node.data.num),
  type: SOURCES.CDT,
});

const parseReferences = (references) => {
  return references.flatMap((reference) => {
    const { URL: url } = reference.attributes;
    const qs = queryString.parse(url.split("?")[1]);
    const type = getTextType(qs);
    switch (type) {
      case "code-du-travail":
        if (qs.idArticle) {
          // resolve related article num from CDT structure
          try {
            const article = getArticleWithParentSections(qs.idArticle);
            return [createCDTRef(article)];
          } catch (error) {
            console.error(`[fiche-sp] Article not found ${qs.idArticle}`);
            return [];
          }
        }
        if (qs.idSectionTA) {
          const section = find(cdt, (node) => node.data.id === qs.idSectionTA);
          if (!section) {
            return [];
          }
          return section.children
            .filter((child) => child.type === "article")
            .map((article) => createCDTRef(article));
        }
        return [];

      case "convention-collective": {
        const convention = agreements.find(
          (convention) => convention.id === qs.idConvention
        );
        if (!convention) {
          return [];
        }
        const { num, shortTitle } = convention;

        return [
          {
            slug: slugify(`${num}-${shortTitle}`.substring(0, 80)),
            title: shortTitle,
            type: SOURCES.CCN,
          },
        ];
      }

      case "journal-officiel":
        return [
          {
            title: reference.children[0].children[0].text,
            type: SOURCES.EXTERNALS,
            url,
          },
        ];
      default:
        return [];
    }
  });
};

module.exports = parseReferences;
