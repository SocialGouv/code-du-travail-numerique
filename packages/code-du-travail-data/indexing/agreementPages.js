import slugify from "@socialgouv/cdtn-slugify";
import { SOURCES } from "@socialgouv/cdtn-sources";
import contributions from "@socialgouv/contributions-data/data/contributions.json";
import agreementsBlocks from "@socialgouv/datafiller-data/data/agreements.json";
import allThemes from "@socialgouv/datafiller-data/data/themes.json";
import kaliData from "@socialgouv/kali-data/data/index.json";
import remark from "remark";
import html from "remark-html";
import find from "unist-util-find";
import parents from "unist-util-parents";

import { createThemer } from "./breadcrumbs";

const compiler = remark().use(html, { sanitize: true });
const createSorter = (fn = (a) => a) => (a, b) => fn(a) - fn(b);
const getBreadcrumbs = createThemer(allThemes);

const contributionsWithTheme = contributions.map((contrib) => {
  const slug = slugify(contrib.title);
  return {
    ...contrib,
    breadcrumbs: getBreadcrumbs(slug),
    slug,
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
        answers: getContributionAnswers(agreement.num),
        articlesByTheme:
          blocksData && blocksData.groups
            ? getArticleByBlock(blocksData.groups, agreementTree)
            : [],
      };
    });
}

/**
 * Get CCn geenral information
 * @param {Object} agreement
 */
function getCCNInfo({
  effectif,
  id,
  num,
  date_publi,
  mtime,
  title,
  shortTitle,
  url,
}) {
  return {
    date_publi,
    effectif,
    id,
    mtime,
    num,
    shortTitle,
    slug: slugify(`${num}-${shortTitle}`.substring(0, 80)),
    text: `IDCC ${num} ${title}`,
    title,
    url,
  };
}

/**
 * Return contribution answer for a given idcc
 * param {agreementNum} string
 */
function getContributionAnswers(agreementNum) {
  const transformRef = ({ title, url, agreement }) => {
    return {
      category: SOURCES.EXTERNALS,
      title,
      url: url || (agreement && agreement.url),
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
          answer: compiler.processSync(answer.markdown).contents,
          index,
          question: title.trim(),
          references: answer.references.map(transformRef),
          slug,
          theme: rootTheme,
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
                cid: node.data.cid,
                id: node.data.id,
                section: node.parent.data.title,
                title: node.data.num || "non numéroté",
              }
            : null;
        })
        .filter(Boolean),
      bloc: id,
    }))
    .filter(({ articles }) => articles.length > 0);
}

if (require.main === module) {
  const data = getAgreementPages();
  console.log(JSON.stringify(data, null, 2));
}

export { getAgreementPages };
