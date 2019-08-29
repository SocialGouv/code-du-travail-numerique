const fetch = require("node-fetch");
const debug = require("debug")("@cdt/data...datafiller/elastic");

// fetch datafiller results then check against ES index using a slug match
const ES_URL = process.env.ELASTICSEARCH_URL || "http://127.0.0.1:9200";

// remove prefix (source)
const getSlug = url => url.replace(/^(\/[^/]+\/)(.*)/, "$2");

// try to get the local ES reference for a given "result" (= a reference slug in datafiller)
const getReference = (result, ref) => {
  const slug = getSlug(ref.url);

  if (slug.match(/^https?:\/\//)) {
    console.log(`EXTERNAL | ${result.title} | ${slug} | external link`);
    return false;
  }

  // find the good slug
  const query = {
    match: {
      slug: {
        query: slug,
        minimum_should_match: "70%"
      }
    }
  };

  return fetch(`${ES_URL}/code_du_travail_numerique/_search`, {
    method: "POST",
    body: JSON.stringify({
      size: 1,
      _source: ["title", "source", "slug", "anchor", "url"],
      query
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(res => {
      if (!res.hits) {
        throw res;
      }
      if (res.hits.hits.length) {
        if (res.hits.hits.length > 1) {
          debug(
            `ERROR | ${result.title} | ${slug} | plusieurs résultats trouvés`
          );
          return;
        }
        if (res.hits.hits[0]._source.slug !== slug) {
          debug(
            `FIXED | ${result.title} | ${slug} | ${
              res.hits.hits[0]._source.slug
            }`
          );
        }
        return {
          ...res.hits.hits[0],
          relevance: ref.relevance
        };
      }
      debug(`ERROR | ${result.title} | ${slug} | not found in ES`);
    })
    .catch(e => {
      if (slug.match(/^http/)) {
        // silent for external links
        return false;
      }
      // console.log("ERROR", e);
      return false;
    });
};

// check refs against ES
const getReferences = result =>
  Promise.all(
    result.refs.filter(ref => ref.url).map(ref => getReference(result, ref))
  ).then(arr => arr.filter(Boolean));

module.exports = { getReferences };
