const fetch = require("node-fetch");
const debug = require("debug")("@cdt/data...datafiller/elastic");

// fetch datafiller results then check against ES index using a slug match
const ES_URL = process.env.ELASTICSEARCH_URL || "http://127.0.0.1:9200";

// split source + prefix (source)
const getSlug = url => {
  const match = url.match(/^\/([^/]+)\/(.*)/);
  if (match) {
    return [slugToSource(match[1]), match[2]];
  }
  return [,];
};

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

const slugToSource = slug =>
  Object.keys(routeBySource).find(r => routeBySource[r] === slug);

// try to get the local ES reference for a given "result" (= a reference slug in datafiller)
const getReference = (title, ref) => {
  const [source, slug] = getSlug(ref.url);
  if (!source) {
    return false;
  }
  if (slug.match(/^https?:\/\//)) {
    console.log(`EXTERNAL | ${title} | ${slug} | external link`);
    return false;
  }

  // find the good slug
  const query = {
    bool: {
      must: [
        {
          match: {
            slug: {
              query: slug
            }
          }
        },
        {
          term: { source }
        }
      ]
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
          debug(`ERROR | ${title} | ${slug} | plusieurs résultats trouvés`);
          return;
        }
        if (res.hits.hits[0]._source.slug !== slug) {
          debug(
            `found | ${title} | ${slug} | ${res.hits.hits[0]._source.slug}`
          );
        }
        return {
          ...res.hits.hits[0],
          relevance: ref.relevance
        };
      }
      debug(`ERROR | ${title} | ${slug} | not found in ES`);
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

const cleanTitle = title => title.trim();

const getUrlTitle = url =>
  fetch(url)
    .then(r => r.text())
    .then(text => text.match(/<title>([^<]+)<\/title>/i))
    .then(matches => (matches && cleanTitle(matches[1])) || url);

const replaceReference = async (title, ref) => {
  // fetch page title for external urls
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
  // dont rewrite code-du-travail urls
  if (ref.url.match(/^\/code-du-travail\//)) {
    return {
      _source: {
        title: ref.title,
        url: ref.url,
        source: "code_du_travail"
      },
      relevance: ref.relevance
    };
  }
  if (ref.url.match(/^\/themes\//)) {
    return {
      _source: {
        title: ref.title,
        url: ref.url,
        source: "themes"
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
