const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const elasticsearchClient = require("../../conf/elasticsearch.js");
const {
  getRootThemesQuery,
  getThemeQuery,
  getBySlug
} = require("./search.elastic.js");

// mapping elastic search source type -> route name
const routeBySource = {
  faq: "question",
  fiches_service_public: "fiche-service-public",
  fiches_ministere_travail: "fiche-ministere-travail",
  code_du_travail: "code-du-travail",
  conventions_collectives: "convention-collective",
  modeles_de_courriers: "modeles-de-courriers",
  themes: "themes",
  outils: "outils",
  idcc: "idcc",
  kali: "kali"
};

const indexContenus = "code_du_travail_numerique";
const indexThemes = "cdtn_themes";

const router = new Router({ prefix: API_BASE_URL });

/**
 * Return the root themes
 *
 * @example
 * http://localhost:1337/api/v1/themes
 *
 * @returns {Object} An object containing the matching theme .
 */
router.get("/themes", async ctx => {
  const body = getRootThemesQuery({});
  const response = await elasticsearchClient.search({
    index: indexThemes,
    body
  });
  ctx.body = {
    children: response.body.hits.hits.map(t => t._source)
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

const sourceToEsSource = source =>
  Object.keys(routeBySource).find(key => routeBySource[key] === source);

const extractFromUrl = url => {
  const [source, slug] = url.split("/").filter(Boolean);
  return [sourceToEsSource(source), slug];
};

const toEsRef = async ref => {
  const [source, slug] = extractFromUrl(ref.url);
  const body = getBySlug({ source, slug });
  const response = await elasticsearchClient.search({
    index: indexContenus,
    body
  });
  if (response.body.hits.hits.length) {
    return response.body.hits.hits[0];
  }
};

router.get("/themes/:slug", async ctx => {
  const { slug } = ctx.params;
  const body = getThemeQuery({ slug });
  const response = await elasticsearchClient.search({
    index: indexThemes,
    body
  });
  if (!response) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }
  // rewrite refs to match documents inside ES index
  // todo(perf): we should group ES resolution
  const responseBody = {
    ...response.body,
    hits: {
      hits: await Promise.all(
        response.body.hits.hits.map(async hit => {
          const refs = await Promise.all(
            (hit._source.refs || []).map(ref => toEsRef(ref))
          );
          return {
            ...hit,
            _source: {
              ...hit._source,
              refs
            }
          };
        })
      )
    }
  };
  ctx.body = responseBody;
});

module.exports = router;
