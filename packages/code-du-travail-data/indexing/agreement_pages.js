import contributions from "@socialgouv/contributions-data/data/contributions.json";
import agreementsBlocks from "@socialgouv/datafiller-data/data/agreements.json";
import allThemes from "@socialgouv/datafiller-data/data/themes.json";
import kaliData from "@socialgouv/kali-data/data/index.json";
import remark from "remark";
import html from "remark-html";
import find from "unist-util-find";
import parents from "unist-util-parents";
import { createThemer } from "./breadcrumbs";
import slugify from "../slugify";

const compiler = remark().use(html, { sanitize: true });
const createSorter = (fn = (a) => a) => (a, b) => fn(a) - fn(b);
const getBreadcrumbs = createThemer(allThemes);

const contributionsWithTheme = contributions.map((contrib) => {
  return {
    ...contrib,
    breadcrumbs: getBreadcrumbs(slugify(contrib.title)),
  };
});

function getAgreementPages() {
  return kaliData
    .sort(createSorter(({ num }) => parseInt(num, 10)))
    .map((agreement) => {
      const agreementTree = require(`@socialgouv/kali-data/data/${agreement.id}.json`);
      const blocksData = agreementsBlocks.find(
        // cid = container-id not chronical-id
        (data) => data.cid === agreement.id
      );
      return {
        ...getCCNInfo(agreement),
        nbTextes: getNbText(agreementTree),
        articlesByTheme:
          blocksData && blocksData.groups
            ? getArticleByBlock(blocksData.groups, agreementTree)
            : [],
        answers: getContributionAnswers(agreement.num),
      };
    });
}

/**
 * Get CCn geenral information
 * @param {Object} agreement
 */
function getCCNInfo({ id, num, date_publi, mtime, title, shortTitle, url }) {
  return {
    id,
    slug: slugify(`${num}-${shortTitle}`.substring(0, 80)),
    date_publi,
    mtime,
    title,
    shortTitle,
    url,
    num,
  };
}

/**
 * Get CCn detailed informations about articles and texts
 */
function getNbText(agreementTree) {
  const texteDeBase = find(agreementTree, (node) =>
    node.data.title.startsWith("Texte de base")
  );
  if (!texteDeBase) {
    return;
  }

  return texteDeBase.children.length;
}

/**
 * Return contribution answer for a given idcc
 * param {agreementNum} string
 */
function getContributionAnswers(agreementNum) {
  const transformRef = ({ title, url, category, agreement }) => {
    return {
      title,
      url: url || (agreement && agreement.url),
      category: category,
    };
  };
  return contributionsWithTheme
    .map(({ title, slug, index, answers, breadcrumbs }) => {
      const [answer] = answers.conventions.filter(
        ({ idcc }) => parseInt(idcc) === parseInt(agreementNum)
      );
      const unhandledRegexp = /La convention collective ne prévoit rien sur ce point/i;
      if (answer && !unhandledRegexp.test(answer.markdown)) {
        let rootTheme = null;
        if (breadcrumbs.length > 0) {
          rootTheme = breadcrumbs[0].label;
        }

        return {
          index,
          question: title.trim(),
          answer: compiler.processSync(answer.markdown).contents,
          theme: rootTheme,
          references: answer.references.map(transformRef),
          slug,
        };
      }
    })
    .sort(createSorter((a) => a.index))
    .filter(Boolean);
}

/**
 * @param {id:<String>, selection:<String[]>}
 * @param {Object} agreementTree
 */
function getArticleByBlock(groups, agreementTree) {
  const treeWithParents = parents(agreementTree);
  return groups
    .filter(({ selection }) => selection.length > 0)
    .sort(createSorter((a) => a.id))
    .map(({ id, selection }) => ({
      bloc: id,
      articles: selection
        .map((articleId) => {
          const node = find(
            treeWithParents,
            (node) => node.data.id === articleId
          );
          if (!node) {
            console.error(
              `${articleId} not found in idcc ${agreementTree.data.num}`
            );
          }
          return node
            ? {
                title: node.data.num || "non numéroté",
                id: node.data.id,
                cid: node.data.cid,
                section: node.parent.data.title,
              }
            : null;
        })
        .filter(Boolean),
    }))
    .filter(({ articles }) => articles.length > 0);
}

if (require.main === module) {
  const data = getAgreementPages();
  console.log(JSON.stringify(data, null, 2));
}

export { getAgreementPages };
