const Router = require("koa-router");
const { thematicFiles } = require("@cdt/data...dossiers");

const API_BASE_URL = require("../v1.prefix");
const getEsReferences = require("../search/getEsReferences");

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return thematic files that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/dossiers/:slug
 *
 * @returns {Object} An object containing the matching thematic file .
 */

router.get("/dossiers/:slug", async ctx => {
  const { slug } = ctx.params;
  const file = thematicFiles.find(file => file.slug === slug);
  console.log(slug);
  if (!file) {
    throw (404, `there is no thematic files that match ${slug}`);
  }
  const refTypeByUrl = [];
  for (const { url, type } of file.refs) {
    const [, slug] = url.match(/\/.+\/(.+)$/);
    refTypeByUrl[slug] = type;
  }
  const refs = await getEsReferences(file.refs);

  ctx.body = {
    ...file,
    refs: refs.map(({ _source }) => {
      _source.type = refTypeByUrl[_source.slug];
      return _source;
    })
  };
});

module.exports = router;
