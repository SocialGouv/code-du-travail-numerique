// Do we really need this one ?
const queryString = require("query-string");
const { getCode } = require("@socialgouv/legi-data");
const { getAgreements } = require("@socialgouv/kali-data");
const { SOURCES, getRouteBySource } = require("@socialgouv/cdtn-sources");
const slugify = require("@socialgouv/cdtn-slugify");

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

const createCDTRef = (node) => ({
  id: node.data.id,
  title: node.data.num,
  type: SOURCES.CDT,
  url: `https://www.legifrance.gouv.fr/codes/id/${node.data.id}`,
});

const parseReference = (reference) => {
  const { URL: url } = reference.attributes;
  const qs = queryString.parse(url.split("?")[1]);
  const type = getTextType(qs);
  switch (type) {
    case "code-du-travail":
      if (qs.idArticle) {
        // resolve related article num from CDT structure
        const article = find(cdt, (node) => node.data.id === qs.idArticle);
        if (!article) {
          return [];
        }
        return [createCDTRef(article)];
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
          id: convention.id,
          title: `${num} ${shortTitle}`,
          type: SOURCES.CCN,
          url: convention.url,
        },
      ];
    }

    case "journal-officiel":
      return [
        {
          id: qs.cidTexte,
          title: reference.children[0].children[0].text,
          type: "external",
          url,
        },
      ];
    default:
      return [];
  }
};

module.exports = parseReference;
