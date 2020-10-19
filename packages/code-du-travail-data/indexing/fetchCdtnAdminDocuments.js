import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import allThemes from "@socialgouv/datafiller-data/data/themes.json";
import fetch from "node-fetch";
import PQueue from "p-queue";

import { createThemer } from "./breadcrumbs";

const getBreadcrumbs = createThemer(allThemes);
const fixBreadcrumbs = (source) => {
  if (source === SOURCES.EDITORIAL_CONTENT) {
    return [
      {
        label: "Dossier Coronavirus-Covid 19",
        slug: `/${getRouteBySource(
          SOURCES.THEMATIC_FILES
        )}/ministere-du-travail-notre-dossier-sur-le-coronavirus`,
      },
    ];
  }
  return [];
};

const LIMIT = 50;
const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:8080/v1/graphql";

const gqlRequestBySource = (source, limit = LIMIT, offset = 0) =>
  JSON.stringify({
    query: `{
  documents(
    limit: ${limit}
    offset: ${offset}
    where: {source: {_eq: "${source}"}}) {
    id:initial_id
    cdtnId:cdtn_id
    title
    slug
    source
    text
    is_published
    is_searchable
    metaDescription:meta_description
    document
  }
}`,
  });

const gqlAgreggateDocumentBySource = (source) =>
  JSON.stringify({
    query: `{
  documents_aggregate(where: {source: {_eq: "${source}"}}){
    aggregate {
      count
    }
  }
}`,
  });

export async function getDocumentBySource(source) {
  const nbDocResult = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlAgreggateDocumentBySource(source),
    method: "POST",
  }).then((r) => r.json());

  const nbDoc = nbDocResult.data.documents_aggregate.aggregate.count;
  const queue = new PQueue({ concurrency: 5 });

  const pDocuments = Array.from(
    { length: Math.ceil(nbDoc / LIMIT) },
    (_, i) => i
  ).map((index) => {
    console.log(`fetch ${source} : ${index * LIMIT} / ${nbDoc} `);
    return queue.add(() =>
      fetch(CDTN_ADMIN_ENDPOINT, {
        body: gqlRequestBySource(source, LIMIT, index * LIMIT),
        method: "POST",
      })
        .then((r) => r.json())
        .then(({ data }) => data.documents)
    );
  });
  return (await Promise.all(pDocuments)).flatMap((docs) => docs.map(toElastic));
}

function toElastic({
  id,
  cdtnId,
  title,
  source,
  slug,
  text,
  is_searchable,
  metaDescription,
  document,
}) {
  const breadcrumbs = getBreadcrumbs(`/${getRouteBySource(source)}/${slug}`);
  return {
    ...document,
    breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : fixBreadcrumbs(source),
    cdtnId,
    excludeFromSearch: !is_searchable,
    id,
    metaDescription,
    slug,
    source,
    text,
    title,
  };
}

async function main() {
  const documents = await getDocumentBySource(SOURCES.LETTERS);
  console.log(JSON.stringify(documents, 0, 2));
}

if (module === require.main) {
  main().catch(console.error);
}
