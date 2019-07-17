const fetch = require("node-fetch");

// fetch datafiller results then check against ES index using a slug match
const ES_URL = process.env.ELASTICSEARCH_URL || "http://127.0.0.1:9200";

// strip prefix (source)
const getSlug = url => url.replace(/^(\/[^/]+\/)(.*)/, "$2");

// try to get the local ES reference for a given "result" (= a reference slug in datafiller)
const getReference = (title, ref) => {
  const slug = getSlug(ref.url);

  if (slug.match(/^https?:\/\//)) {
    console.log(`EXTERNAL | ${title} | ${slug} | external link`);
    return;
  }

  // find the good slug
  const query = {
    match: {
      slug: {
        query: slug,
        minimum_should_match: "95%"
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
          console.log(
            `ERROR | ${title} | ${slug} | plusieurs résultats trouvés`
          );
          return;
        }
        if (res.hits.hits[0]._source.slug !== slug) {
          console.log(
            `FOUND | ${title} | ${slug} | ${res.hits.hits[0]._source.slug}`
          );
        }
        return res.hits.hits[0];
      }
      console.log(`ERROR | ${title} | ${slug} | not found in ES`);
    })
    .catch(e => {
      console.log("ERROR", e);
      return;
    });
};

const cleanTitle = title => title.trim();

const getUrlTitle = url =>
  fetch(url)
    .then(r => r.text())
    .then(text => text.match(/<title>([^<]+)<\/title>/i))
    .then(matches => (matches && cleanTitle(matches[1])) || url);

const replaceReference = async (title, ref) => {
  if (ref.url.match(/^https?:/)) {
    return {
      _source: {
        title: await getUrlTitle(ref.url),
        url: ref.url,
        source: "external"
      },
      relevance: ref.relevance
    };
  }
  const hit = await getReference(title, ref);
  if (hit) {
    return {
      ...hit,
      relevance: ref.relevance
    };
  }
  return;
};

// check refs against ES
const getReferences = result =>
  Promise.all(
    result.refs
      .filter(ref => ref.url)
      .map(ref => replaceReference(result.title, ref))
  ).then(arr => arr.filter(Boolean));

module.exports = { getReference, getReferences };
