import { DOCUMENTS } from "@cdt/data/indexing/esIndexName";
import { Client } from "@elastic/elasticsearch";
import { SOURCES } from "@socialgouv/cdtn-sources";
import { writeFile as _writeFile } from "fs";
import { join } from "path";
import { promisify } from "util";

import getDocumentsBySourceSlug from "../src/server/routes/items/searchBySourceSlug.elastic";
import glossaryData from "./glossary.json";
import highlightsData from "./highlights.json";
import preQualifiedData from "./prequalified.json";
import versions from "./versions.json";

const writeFile = promisify(_writeFile);

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

const client = new Client({
  log: [{ levels: ["error", "warning"], type: "stdio" }],
  node: `${ELASTICSEARCH_URL}`,
});

const documentsSlugs = [
  {
    slug: "themes/81-demission",
    source: SOURCES.THEMES,
  },
  {
    slug: "themes/8-depart-de-lentreprise",
    source: SOURCES.THEMES,
  },
  {
    slug: "themes/1-embauche-et-contrat-de-travail",
    source: SOURCES.THEMES,
  },
  {
    slug:
      "fiche-service-public/arret-maladie-pendant-le-preavis-quelles-consequences",
    source: SOURCES.SHEET_SP,
  },
  {
    slug: "fiche-service-public/demission-dun-salarie",
    source: SOURCES.SHEET_SP,
  },
  {
    slug: "fiche-service-public/demission-dune-assistante-maternelle",
    source: SOURCES.SHEET_SP,
  },
  {
    slug:
      "/fiche-ministere-travail/la-demission#Comment-presenter-une-demission",
    source: SOURCES.SHEET_MT,
  },
  {
    slug:
      "/fiche-ministere-travail/la-demission#L-absence-prolongee-du-salarie-est-elle-une-demission",
    source: SOURCES.SHEET_MT,
  },
  {
    slug: "code-du-travail/r1225-18",
    source: SOURCES.CDT,
  },
  {
    slug: "code-du-travail/l1237-1",
    source: SOURCES.CDT,
  },
  {
    slug: "outils/preavis-demission",
    source: SOURCES.TOOLS,
  },
  {
    slug: "outils/indemnite-licenciement",
    source: SOURCES.TOOLS,
  },
  {
    slug:
      "modeles-de-courriers/demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
    source: SOURCES.LETTERS,
  },
  {
    slug:
      "modeles-de-courriers/rupture-de-periode-dessai-a-linitiative-de-lemployeur",
    source: SOURCES.LETTERS,
  },
  {
    slug:
      "convention-collective/1747-activites-industrielles-de-boulangerie-et-patisserie",
    source: SOURCES.CCN,
  },
  {
    slug:
      "convention-collective/843-boulangerie-patisserie-entreprises-artisanales",
    source: SOURCES.CCN,
  },
  {
    slug:
      "convention-collective/2701-banque-personnel-des-banques-de-la-guyane",
    source: SOURCES.CCN,
  },
  {
    slug: "convention-collective/2120-banque",
    source: SOURCES.CCN,
  },
  {
    slug: "external/mon-compte-formation",
    source: SOURCES.EXTERNAL,
  },
  {
    slug: "external/index-egapro",
    source: SOURCES.EXTERNAL,
  },
  {
    slug:
      "page-convention-collective/1596-batiment-ouvriers-entreprises-occupant-jusqua-10-salaries",
    source: SOURCES.CCN_PAGE,
  },
  {
    slug:
      "/fiche-ministere-travail/5-questions-reponses-sur-la-sante-au-travail",
    source: SOURCES.SHEET_MT_PAGE,
  },
  {
    slug:
      "/fiche-ministere-travail/5-questions-reponses-sur-la-validation-des-acquis-de-lexperience-vae",
    source: SOURCES.SHEET_MT_PAGE,
  },
];

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

async function updateDocumentsData(slugs) {
  const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
  const requests = slugs.reduce((state, { slug, source }) => {
    state.push({ index });
    state.push(getDocumentsBySourceSlug({ slug, source }));
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
    data.push(highlightsData, preQualifiedData, glossaryData, versions);
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
