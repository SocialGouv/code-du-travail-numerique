import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import allThemes from "@socialgouv/datafiller-data/data/themes.json";
import fetch from "node-fetch";

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
const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:3000/api/graphql";

const gqlRequestBySource = (source) =>
  JSON.stringify({
    query: `{
  documents(where: {source: {_eq: "${source}"}}){
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

export function getDocumentBySource(source) {
  return fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlRequestBySource(source),
    method: "POST",
  })
    .then((r) => r.json())
    .then(({ data }) => data.documents.map(toElastic));
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

main().catch(console.error);
