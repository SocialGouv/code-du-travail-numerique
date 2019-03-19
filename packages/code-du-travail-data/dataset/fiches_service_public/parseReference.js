
// Do we really need this one ?
const find = require("unist-util-find");
const queryString = require("query-string");
const cdt = require("../code_du_travail/code-du-travail.json");
const kali = require("../kali/kali.json");

const isConventionCollective = url => url.includes("idConvention");
const isCodeDuTravail = cid => cid === "LEGITEXT000006072050";
const isJournalOfficiel = cid => cid && cid.includes("JORFTEXT");

 // resolve article.num in LEGI extract
 const getArticleNumFromId = id => {
  const article = find(cdt, node => node.data.id === id);
  return article && article.data && article.data.num;
};

const makeArticleData = num => ({
  type: "code-du-travail",
  num: num,
  id: `code_du_travail--${num}`,
  title: `Article ${num} du code du travail`
});

const getArticlesFromSection = (cidTexte, id) => {
  const section = find(cdt, node => node.data.id === id);
  if (section) {
    return section.children
      .filter(child => child.type === "article")
      .map(article => makeArticleData(article.data.num));
  }
  return [];
};

// Can return either an array of objects, an object, or undefined !
const parseReference = reference => {
    /* todo :
      - gestion des dates
          - https://www.legifrance.gouv.fr/affichCode.do;jsessionid=F6A039BEA1CEBEED08A95F62603613C4.tpdila20v_1?idSectionTA=LEGISCTA000006195895&cidTexte=LEGITEXT000006072050&dateTexte=20170831
          - https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000018525018&cidTexte=LEGITEXT000006072050&dateTexte=20170831
    */
    let { ID: id, URL: url } = reference._;
    let num;
    const qs = queryString.parse(url.split("?")[1]);
    if (isCodeDuTravail(qs.cidTexte)) {
      if (qs.idArticle) {
        // resolve related article num from CDT structure
        num = getArticleNumFromId(qs.idArticle);
        return makeArticleData(num);
      }
      if (qs.idSectionTA) {
        // resolve related articles from CDT structure
        return getArticlesFromSection(qs.cidTexte, qs.idSectionTA);
      }
    } else if (isConventionCollective(url)) {
      let title;
      const convention = kali.find(convention => convention.id === qs.idConvention);
      if (convention) {
        title = convention.titre;
      } else {
        title = `Convention collective ${qs.idConvention}`;
      }
      return {
          type: "convention-collective",
          id: `conventions_collectives--${qs.idConvention}`,
          title,
          num: qs.idConvention
        };
    } else if (isJournalOfficiel(qs.cidTexte)) {
      return {
        type: "journal-officiel",
        id: `journal-officiel--${qs.cidTexte}`,
        num: qs.cidTexte,
        title: reference.$[0].$[0].$, // .Titre.text.contenu
        url: reference._.URL
      }
    }
  };

  module.exports = parseReference;
