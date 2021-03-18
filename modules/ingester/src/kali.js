import find from "unist-util-find";
import parents from "unist-util-parents";

/**
 * @template A
 * @param {(a:A) => number} fn
 * @returns {(a:A, b:A) => number}
 */
const createSorter = (fn) => (a, b) => fn(a) - fn(b);

/**
 * @param {ingester.AgreementKaliBlocks} blocks
 * @param {import("@socialgouv/kali-data-types").Agreement} agreementTree
 * @returns {ingester.AgreementArticleByBlock[]}
 */
export function getArticlesByTheme(allBlocks, id) {
  const conventionBlocks = allBlocks.find((blocks) => blocks.id === id);
  const agreementTree = require(`@socialgouv/kali-data/data/${id}.json`);
  const treeWithParents = parents(agreementTree);
  if (!conventionBlocks) {
    return [];
  }
  const { blocks } = conventionBlocks;
  return (
    (blocks &&
      Object.keys(blocks)
        .filter((key) => blocks[key].length > 0)
        .sort(createSorter((a) => parseInt(a, 10)))
        .map((key) => ({
          articles:
            blocks[key] &&
            blocks[key].flatMap((articleId) => {
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
                ? [
                    {
                      cid: node.data.cid,
                      id: node.data.id,
                      section: node.parent.data.title,
                      title: node.data.num || "non numéroté",
                    },
                  ]
                : [];
            }),
          bloc: key,
        }))
        .filter(({ articles }) => articles.length > 0)) ||
    []
  );
}
