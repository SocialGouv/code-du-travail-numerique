import { Client } from "@elastic/elasticsearch";
import { DOCUMENTS } from "@socialgouv/cdtn-elasticsearch";
import { getSourceByRoute, SOURCES } from "@socialgouv/cdtn-sources";
import { writeFile as _writeFile } from "fs";
import { join } from "path";
import { promisify } from "util";

import prefix from "../routes/v1.prefix";
import versions from "./versions.json";

const writeFile = promisify(_writeFile);

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const client = new Client({
  log: [{ levels: ["error", "warning"], type: "stdio" }],
  node: `${ELASTICSEARCH_URL}`,
});

const getDataFromUrl = (url) => {
  const [, sourceRoute, slug] = url.split("/");
  let source = getSourceByRoute(sourceRoute);
  // since theme routing has changed, we will keep this monkey patch for a while
  let trimmedSlug = slug;
  if (source === SOURCES.THEMES) {
    trimmedSlug = slug.replace(/^\d*-/, "");
  }
  // Beware, "/fiche-ministere-travail/la-demission" matches both
  // the split introduction and the full page. We always refer to the full page
  // to avoid bugs (because this page could have no introduction).
  if (source === SOURCES.SHEET_MT && !slug.includes("#")) {
    source = SOURCES.SHEET_MT_PAGE;
  }
  return {
    slug: trimmedSlug,
    source,
  };
};

const getDocumentByUrlQuery = (
  url,
  _source = [
    "title",
    "source",
    "slug",
    "description",
    "url",
    "action",
    "breadcrumbs",
    "cdtnId",
    "isPublished",
    "refs",
  ]
) => {
  const { slug, source } = getDataFromUrl(url);
  if (!source) return;
  return {
    _source,
    query: {
      bool: {
        filter: [{ term: { slug } }, { term: { source } }],
      },
    },
    size: 1,
  };
};

/*
 * Make sure you have at least two documents with the same slug here to test a corner case (certificat-de-travail)
 * Also make sure that you have a fiche-ministere-travail without a "#" to ensure that url resolution works fine
 */
const documentsSlugs = [
  "/themes/demission",
  "/themes/depart-de-lentreprise",
  "/themes/embauche-et-contrat-de-travail",
  "/fiche-service-public/arret-maladie-pendant-le-preavis-quelles-consequences",
  "/fiche-service-public/demission-dun-salarie",
  "/fiche-service-public/demission-dune-assistante-maternelle",
  "/fiche-service-public/certificat-de-travail",
  "/fiche-ministere-travail/la-demission",
  "/fiche-ministere-travail/la-demission#Comment-presenter-une-demission",
  "/fiche-ministere-travail/la-demission#L-absence-prolongee-du-salarie-est-elle-une-demission",
  "/code-du-travail/r1225-18",
  "/code-du-travail/l1237-1",
  "/outils/preavis-demission",
  "/outils/indemnite-licenciement",
  "/modeles-de-courriers/demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
  "/modeles-de-courriers/rupture-de-periode-dessai-a-linitiative-de-lemployeur",
  "/modeles-de-courriers/certificat-de-travail",
  "/convention-collective/1747-activites-industrielles-de-boulangerie-et-patisserie",
  "/convention-collective/843-boulangerie-patisserie-entreprises-artisanales",
  "/convention-collective/2701-banque-personnel-des-banques-de-la-guyane",
  "/convention-collective/2120-banque",
  "/external/mon-compte-formation",
  "/external/index-egapro",
  "/fiche-ministere-travail/5-questions-reponses-sur-la-sante-au-travail",
  "/highlights/homepage",
  "/prequalified/comment-demissionner",
  "/outils/heures-recherche-emploi",
];

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

async function updateDocumentsData(slugs) {
  const index = `${ES_INDEX_PREFIX}-${prefix.CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
  const requests = slugs.reduce((state, slug) => {
    state.push({ index });
    state.push(getDocumentByUrlQuery(slug, []));
    return state;
  }, []);
  try {
    const { body } = await client.msearch({ body: requests });
    const data = [];
    for (const res of body.responses) {
      if (res.hits.hits.length === 1) {
        const [item] = res.hits.hits;
        data.push(item._source);
      }
    }
    // it's easier to add a static glossary and versions entry
    data.push(
      {
        data: [
          {
            abbreviations: [],
            definition: "<p>Mesure d'urgence prise par précaution.</p>",
            references: [
              "https://www.service-public.fr/particuliers/glossaire/R37450",
            ],
            slug: "a-titre-conservatoire",
            title: "A titre conservatoire",
            variants: [],
          },
        ],
        source: "glossary",
      },
      versions
    );
    await writeFile(
      join(__dirname, "./cdtn_document.data.json"),
      JSON.stringify(data, 0, 2)
    );
  } catch (error) {
    console.error(error.meta || error);
  }
}

if (module === require.main) {
  updateDocumentsData(documentsSlugs).catch((error) =>
    console.error("›››" + error)
  );
}
