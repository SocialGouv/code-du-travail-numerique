const fetch = require("node-fetch");

// fetch datafiller results then check against ES index using a slug match
const ES_URL = process.env.ELASTICSEARCH_URL || "http://127.0.0.1:9200";

// remove prefix (source)
const getSlug = url => url.replace(/^(\/[^/]+\/)(.*)/, "$2");

// try to get the local ES reference for a given "result" (= a reference slug in datafiller)
const getReference = result => {
  const slug = getSlug(result.url);

  // find the good slug
  const query = {
    match: {
      slug: {
        query: slug,
        minimum_should_match: "90%"
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
          throw `ERR: Plusieurs résultats pour "${slug}" dans l'index ES`;
        }
        return {
          ...res.hits.hits[0],
          relevance: result.relevance
        };
      }
      throw `ERR: slug "${slug}" non trouvé dans l'index ES`;
    })
    .catch(e => {
      if (slug.match(/^http/)) {
        // silent for external links
        return false;
      }
      console.log("ERROR", e);
      return false;
    });
};

// check refs against ES
const getReferences = refs =>
  Promise.all(refs.filter(ref => ref.url).map(getReference)).then(arr =>
    arr.filter(Boolean)
  );

module.exports = { getReferences };
