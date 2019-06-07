const fetch = require("node-fetch");
const fetchAll = require("./fetch");
const serialExec = require("promise-serial-exec");

// fetch datafiller results then check against ES index using a slug match
const ES_URL = process.env.ELASTICSEARCH_URL || "http://127.0.0.1:9200";

// remove prefix (source)
const getSlug = url => url.replace(/^(\/[^/]+\/)(.*)/, "$2");

// try to get the local ES reference for a given "result" (= a reference slug in datafiller)
const getEsRef = result => {
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

// check each result.refs against ES
const getEsRefs = result =>
  Promise.all(result.refs.filter(ref => ref.url).map(getEsRef)).then(arr =>
    arr.filter(Boolean)
  );

// "convert" datafiller references to our ES index
const toEsResults = results =>
  serialExec(
    results.map(result => async () => ({
      ...result,
      refs: await getEsRefs(result)
    }))
  );

try {
  fetchAll()
    .then(toEsResults)
    .then(data => console.log(JSON.stringify(data, null, 2)));
} catch (e) {
  console.log("e", e);
}
