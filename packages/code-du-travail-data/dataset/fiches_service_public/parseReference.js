
// Do we really need this one ?
const find = require("unist-util-find");
const queryString = require("query-string");
const cdt = require("../code_du_travail/code-du-travail.json");
const kali = require("../kali/kali.json");

const isConventionCollective = qs => qs.idConvention;
const isCodeDuTravail = qs => qs.cidTexte === "LEGITEXT000006072050";
const isJournalOfficiel = qs => (qs.cidText || "").includes("JORFTEXT");

const getTextType = (qs) => {
  if (isCodeDuTravail(qs)) {
    return "code-du-travail"
  }
  if (isConventionCollective(qs)) {
    return "convention-collective"
  }
  if (isJournalOfficiel(qs)) {
    return "journal-officiel"
  }
}

 // resolve article.num in LEGI extract
 const getArticleNumFromId = id => {
  const article = find(cdt, node => node.data.id === id);
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

const createCCRef = (id, title) => ({
  type: "convention-collective",
  id,
  title,
});

const createJORef = (id, title, url) => ({
  type: "journal-officiel",
  id,
  title,
  url
})

// Always return an array
const parseReference = reference => {
    /* todo :
      - gestion des dates
          - https://www.legifrance.gouv.fr/affichCode.do;jsessionid=F6A039BEA1CEBEED08A95F62603613C4.tpdila20v_1?idSectionTA=LEGISCTA000006195895&cidTexte=LEGITEXT000006072050&dateTexte=20170831
          - https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000018525018&cidTexte=LEGITEXT000006072050&dateTexte=20170831
    */
    const { URL: url } = reference._;
    const qs = queryString.parse(url.split("?")[1]);
    const type = getTextType(qs)
    switch (type) {
      case "code-du-travail":
        if (qs.idArticle) {
          // resolve related article num from CDT structure
          const articleNum = getArticleNumFromId(qs.idArticle);
          if(!articleNum) return [];
          console.error(articleNum);
          return [createCDTRef(articleNum)];
        }
        if (qs.idSectionTA) {
          // resolve related articles from CDT structure
          return getArticlesFromSection(qs.idSectionTA);
        }
      case "convention-collective":
        let title;
        const convention = kali.find(convention => convention.id === qs.idConvention);
        if (convention) {
          title = convention.titre;
        } else {
          title = `Convention collective ${qs.idConvention}`;
        }
        return [createCCRef(qs.idConvention, title)];
      case "journal-officiel":
        return [createJORef(qs.cidTexte, reference.$[0].$[0].$, url)];
      default:
        return [];
    }
  };

  module.exports = parseReference;
