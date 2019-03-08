const find = require("unist-util-find");
const queryString = require("query-string");

const cdt = require("../code_du_travail/code-du-travail.json");

// todo: use new KALI data
const kali = require("../kali/idcc-kali-ape.json");

/*
todo :
 - gestion des dates
    - https://www.legifrance.gouv.fr/affichCode.do;jsessionid=F6A039BEA1CEBEED08A95F62603613C4.tpdila20v_1?idSectionTA=LEGISCTA000006195895&cidTexte=LEGITEXT000006072050&dateTexte=20170831
    - https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000018525018&cidTexte=LEGITEXT000006072050&dateTexte=20170831

*/

const getConventionTitle = idConvention => {
  const cc = kali.find(doc => doc.convention);
  if (cc) {
    return cc.titre;
  }
  return `Convention collective ${idConvention}`;
};

const isArticleCode = url =>
  url.match(
    /^https?:\/\/(?:www\.)?legifrance\.gouv\.fr\/affichCodeArticle\.do;?/
  );

const isArticleTexte = url =>
  url.match(
    /^https?:\/\/(?:www\.)?legifrance\.gouv\.fr\/affichTexteArticle\.do;?/
  );

const isCode = url =>
  url.match(/^https?:\/\/(?:www\.)?legifrance\.gouv\.fr\/affichCode\.do;?/);

const isConventionCollective = url =>
  url.match(/^https?:\/\/(?:www\.)?legifrance\.gouv\.fr\/affichIDCC\.do;?/);

const isCodeDuTravail = cid => cid === "LEGITEXT000006072050";

const makeArticleData = num => ({
  type: "article",
  num: num,
  id: `code_du_travail--${num}`,
  title: `Article ${num} du code du travail`
});

// resolve articles from LEGI extract
const getArticlesFromSection = (cidTexte, id) => {
  const section = find(cdt, node => node.data.id === id);
  if (section) {
    return section.children
      .filter(child => child.type === "article")
      .map(article => makeArticleData(article.data.num));
  }
};

// resolve article.num in LEGI extract
const getArticleNumFromId = id => {
  const article = find(cdt, node => node.data.id === id);
  return article && article.data && article.data.num;
};

// parse a legifrance url and return an [] of related articles
// extract data only when isCodeDuTravail or isConventionCollective
const parseLegifranceUrl = url => {
  const qs = queryString.parse(url.split("?")[1]);
  if (isArticleCode(url) || isArticleTexte(url) || isCode(url)) {
    if (isCodeDuTravail(qs.cidTexte)) {
      if (qs.idArticle) {
        // resolve related article num from CDT structure
        const num = getArticleNumFromId(qs.idArticle);
        return [makeArticleData(num)];
      }
      if (qs.idSectionTA) {
        // resolve related articles from CDT structure
        return getArticlesFromSection(qs.cidTexte, qs.idSectionTA) || [];
      }
    }
  } else if (isConventionCollective(url)) {
    return [
      {
        type: "convention-collective",
        id: `conventions_collectives--${qs.idConvention}`,
        title: getConventionTitle(qs.idConvention),
        num: qs.idConvention,
        ...qs
      }
    ];
  }
  return [];
};

module.exports = parseLegifranceUrl;
