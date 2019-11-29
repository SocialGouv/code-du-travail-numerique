import fetch from "node-fetch";
import kaliData from "@socialgouv/kali-data/data/index.json";
import { selectAll } from "unist-util-select";
import find from "unist-util-find";
import contributions from "../contributions/contributions.data.json";
import themes from "./themes.data.json";
import remark from "remark";
import html from "remark-html";
import slugify from "../../slugify";

const compiler = remark().use(html, { sanitize: true });

const DATAFILLER_URL =
  process.env.DATAFILLER_URL || "https://datafiller.num.social.gouv.fr";

const RECORDS_URL = `${DATAFILLER_URL}/kinto/v1/buckets/datasets/collections/ccns/records?_sort=title`;

async function fetchAgreements() {
  const ccnBlockRecords = await fetch(RECORDS_URL, { params: { _limit: 1000 } })
    .then(res => res.json())
    .then(json => json.data);

  return kaliData.map(agreement => {
    const agreementTree = require(`@socialgouv/kali-data/data/${agreement.id}.json`);
    const blocksData = ccnBlockRecords.find(data => data.cid === agreement.id);

    return {
      ...getCCNInfo(agreement),
      ...getCCNDetail(agreementTree),
      articlesByTheme: blocksData
        ? getArticleByBlock(blocksData.groups, agreementTree)
        : [],
      answers: getContributionAnswers(agreement.num)
    };
  });
}

if (require.main === module) {
  fetchAgreements()
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);
}
/**
 * Get CCn geenral information
 * @param {Object} agreement
 */
function getCCNInfo({ id, num, date_publi, mtime, title, shortTitle, url }) {
  const idcc = `0000${num}`.slice(-4);
  return {
    id,
    slug: slugify(`${idcc}-${title}`.substring(0, 80)),
    date_publi,
    mtime,
    title,
    shortTitle,
    url,
    idcc
  };
}
/**
 * Get CCn detailed informations about articles and texts
 */
function getCCNDetail(agreementTree) {
  const texteDeBase = find(agreementTree, node =>
    node.data.title.startsWith("Texte de base")
  );
  const textesAttaches = find(
    agreementTree,
    node => node.data.title === "Textes Attachés"
  );
  const texteSalaires = find(
    agreementTree,
    node => node.data.title === "Textes Salaires"
  );
  const articles = selectAll("article", agreementTree);

  const nbArticleVigueurEtendu = articles.filter(
    ({ data }) => data.etat === "VIGUEUR_ETEN"
  );
  const nbArticleVigueurNonEtendu = articles.filter(
    ({ data }) => data.etat === "VIGUEUR_NON_ETEN"
  );

  const nbTextes =
    texteDeBase.children.length + textesAttaches
      ? textesAttaches.children.length
      : 0 + texteSalaires
      ? texteSalaires.children.length
      : 0;
  return {
    nbTextes,
    nbArticles: {
      vigueurEtendu: nbArticleVigueurEtendu.length,
      vigueurNonEtendu: nbArticleVigueurNonEtendu.length
    }
  };
}
/**
 * Return contribution answer for a given idcc
 * param {agreementNum} string
 */
function getContributionAnswers(agreementNum) {
  return contributions
    .map(({ value, answers }) => {
      const [answer] = answers.conventions.filter(
        ({ idcc }) => parseInt(idcc) === parseInt(agreementNum)
      );
      const unhandledRegexp = /La convention collective ne prévoit rien sur ce point/i;
      if (answer && !unhandledRegexp.test(answer.markdown)) {
        const slug = slugify(value);
        const slugMatcher = new RegExp(slug);
        const themeFinder = ({ url }) => slugMatcher.test(url);
        const theme = themes.find(theme => theme.refs.some(themeFinder));
        return {
          question: value,
          answer: compiler.processSync(answer.markdown).contents,
          theme: theme.breadcrumbs ? theme.breadcrumbs[0].title : theme.title,
          slug
        };
      }
    })
    .filter(Boolean);
}
/**
 * @param {id:<String>, selection:<String[]>}
 * @param {Object} agreementTree
 */
function getArticleByBlock(groups, agreementTree) {
  return groups.map(({ id, selection }) => ({
    bloc: id,
    articles: selection.map(articleId => {
      const node = find(agreementTree, node => node.data.id === articleId);
      return node
        ? {
            title: node.data.num,
            id: node.data.id,
            cid: node.data.cid,
            content: node.data.content
          }
        : null;
    })
  }));
}

export { fetchAgreements };
