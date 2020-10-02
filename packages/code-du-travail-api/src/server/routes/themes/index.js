const Router = require("koa-router");
const { DOCUMENTS } = require("@cdt/data/indexing/esIndexName");
const { getRouteBySource, SOURCES } = require("@socialgouv/cdtn-sources");

const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const { getRootThemesQuery, getThemeQuery } = require("./search.elastic.js");
const getEsReferences = require("../search/getEsReferences");

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the root themes
 *
 * @example
 * http://localhost:1337/api/v1/themes
 *
 * @returns {Object} An object containing the matching theme .
 */
router.get("/themes", async (ctx) => {
  const body = getRootThemesQuery({});
  const response = await elasticsearchClient.search({
    body,
    index,
  });
  ctx.body = {
    children: response.body.hits.hits.map((t) => t._source),
  };
});

/**
 * Return the theme that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/themes/:slug
 *
 * @returns {Object} An object containing the matching theme .
 */

router.get("/themes/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getThemeQuery({ slug });
  const response = await elasticsearchClient.search({
    body,
    index,
  });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }

  const theme = response.body.hits.hits[0]._source;

  theme.refs = await getEsReferences(theme.refs).then((references) =>
    references.map((reference) => reference._source)
  );

  if (theme.children.length) {
    const childrenResponse = await populateChildren(theme.children);
    const populatedChildren = childrenResponse.map(
      (childResponse) =>
        childResponse.body.hits &&
        childResponse.body.hits.hits.length &&
        childResponse.body.hits.hits[0]._source
    );
    // if no direct ref, fetch first 2 of the children
    for (const child of populatedChildren) {
      if (child.refs && !child.refs.length) {
        const childrenResponse = await populateChildren(child.children);
        child.refs = childrenResponse.flatMap(
          (childResponse) =>
            childResponse.body.hits &&
            childResponse.body.hits.hits.length &&
            childResponse.body.hits.hits[0]._source.refs.slice(0, 2)
        );
      }
    }
    for (const child of populatedChildren) {
      child.refs = await getEsReferences(child.refs).then((references) =>
        references.map((reference) => reference._source)
      );
    }
    theme.children = populatedChildren;
  }

  ctx.body = {
    ...theme,
  };
});

module.exports = router;

async function populateChildren(children) {
  const results = await Promise.all(
    children.map(({ slug }) => {
      return elasticsearchClient.search({
        body: getThemeQuery({
          slug: slug.replace(`/${getRouteBySource(SOURCES.THEMES)}/`, ""),
        }),
        index,
      });
    })
  );
  return results;
}
