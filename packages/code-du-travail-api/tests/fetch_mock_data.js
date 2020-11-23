import { DOCUMENTS } from "@cdt/data/indexing/esIndexName";
import { Client } from "@elastic/elasticsearch";
import { writeFile as _writeFile } from "fs";
import { join } from "path";
import { promisify } from "util";

import getDocumentByUrlQuery from "../src/server/routes/search/getDocumentByUrlQuery";
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
];

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";

async function updateDocumentsData(slugs) {
  const index = `${ES_INDEX_PREFIX}_${DOCUMENTS}`;
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
    data.push(highlightsData, preQualifiedData, glossaryData, versions);
    data.push({
      action: "Calculer",
      breadcrumbs: [
        {
          label: "Départ de l'entreprise",
          slug: "/themes/8-depart-de-lentreprise",
        },
      ],
      cdtnId: "d8fca710c5",
      date: "08/11/2019",
      description:
        "Calculez le nombre d'heures pour recherche d'emploi prévues pendant le préavis",
      excludeFromSearch: false,
      id: "d09665fc-961c-44bf-a399-c34cfedf1d24",
      isPublished: false,
      slug: "heures-recherche-emploi",
      source: "outils",
      text: "heure pour recherche d'emploi",
      title: "[DRAFT] Heures pour recherche d’emploi",
    });
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
