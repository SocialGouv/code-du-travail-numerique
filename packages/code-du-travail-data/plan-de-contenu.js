import { buildGetBreadcrumbs } from "@cdtn/ingester";
import slugify from "@socialgouv/cdtn-slugify";
import { SOURCES } from "@socialgouv/cdtn-sources";
import fetch from "node-fetch";

const LIMIT = 300;
const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:8080/v1/graphql";

const gqlAgreggateDocumentBySource = (source) =>
  JSON.stringify({
    query: `{
  documents_aggregate(where: {is_available:{_eq: true}, source: {_eq: "${source}"}}){
    aggregate {
      count
    }
  }
}`,
  });

const gqlRequestBySource = (source, offset = 0, limit = LIMIT) =>
  JSON.stringify({
    query: `{
  documents(
    order_by: {cdtn_id: asc},
    limit: ${limit}
    offset: ${offset}
    where: {source: {_eq: "${source}"},  is_available: {_eq: true} }) {

    source
    title
    cdtn_id
    initial_id
    slug
    url: document(path: "$.url")
    meta_description
    description:  document(path: "$.description")
  }
}`,
  });

const themesQuery = JSON.stringify({
  query: `{
  themes: documents(where: {source: {_eq: "${SOURCES.THEMES}"}}) {
    cdtnId: cdtn_id
    id: initial_id
    slug
    source
    title
    document
    contentRelations: relation_a(where: {type: {_eq: "theme-content"}}, order_by: {}) {
      content: b {
        cdtnId: cdtn_id
        slug
        source
        title
      }
      position: data(path: "position")
    }
    parentRelations: relation_b(where: {type: {_eq: "theme"}}) {
      parentThemeId: document_a
      position: data(path: "position")
    }
  }
}`,
});

async function fetchDocuments(source, page) {
  return fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlRequestBySource(source, page * LIMIT, LIMIT),
    method: "POST",
  })
    .then((r) => r.json())
    .then((result) => {
      if (result.errors) {
        console.error(result.errors);
        throw result.errors[0];
      }
      return result.data.documents;
    });
}

async function fetchGlossary() {
  return fetch(CDTN_ADMIN_ENDPOINT, {
    body: JSON.stringify({
      query: `{
    glossary(order_by: {term: asc}) {
      term
    }
  }`,
    }),
    method: "POST",
  })
    .then((r) => r.json())
    .then((result) => {
      if (result.errors) {
        console.error(result.errors);
        throw result.errors[0];
      }
      return result.data.glossary;
    });
}

async function batchPromises(items, handler, batchSize) {
  const array = items.slice();
  let results = [];
  while (array.length) {
    const res = await Promise.allSettled(
      array.splice(0, batchSize).map(handler)
    );
    results = results.concat(res);
  }
  return results;
}

async function getDocuments() {
  const glossary = await fetchGlossary();
  const glossaryTerms = glossary.map(({ term }) => ({
    modified: new Date(),
    slug: slugify(term),
    source: SOURCES.GLOSSARY,
    title: term,
  }));

  const sources = [
    SOURCES.CONTRIBUTIONS,
    SOURCES.EDITORIAL_CONTENT,
    SOURCES.LETTERS,
    SOURCES.SHEET_MT_PAGE,
    SOURCES.SHEET_SP,
    SOURCES.THEMATIC_FILES,
    SOURCES.TOOLS,
    SOURCES.THEMES,
  ];
  const sourceDocs = [];
  for (const source of sources) {
    const nbDocResult = await fetch(CDTN_ADMIN_ENDPOINT, {
      body: gqlAgreggateDocumentBySource(source),
      method: "POST",
    }).then((r) => r.json());

    const nbDoc = nbDocResult.data.documents_aggregate.aggregate.count;
    const pages = Array.from({ length: Math.ceil(nbDoc / LIMIT) }, (_, i) => i);
    const handler = (page) => fetchDocuments(source, page);
    const docs = await batchPromises(pages, handler, 15);
    sourceDocs.push(
      docs.flatMap(({ value, status }) => (status === "fulfilled" ? value : []))
    );
  }
  return sourceDocs.flat().concat(glossaryTerms);
}

function createBreadcrumbsTransform(getBreadcrumbs) {
  return function convertIntoCSVLine(document) {
    const {
      cdtn_id: cdtnId,
      description,
      initial_id: id,
      meta_description: metaDescription,
      slug,
      source,
      title,
      url,
    } = document;
    const path = `"${getBreadcrumbs(`${source}/${slug}`).join(" | ")}"`;
    return `${source},${title},${cdtnId},${id},${slug},${url},${path},${escapeText(
      metaDescription || ""
    )},${escapeText(description || "")}`;
  };
}

function escapeText(text = "") {
  return `"${text.replace(/\n/g, "").replace(/"/g, "'")}"`;
}

async function main() {
  const themesQueryResult = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: themesQuery,
    method: "POST",
  }).then((r) => r.json());

  const themes = themesQueryResult.data.themes;

  const getBreadcrumbs = buildGetBreadcrumbs(themes);
  const toCsv = createBreadcrumbsTransform(getBreadcrumbs);
  const documents = await getDocuments();
  console.log(
    "source,titre,cdtnId,originalId,slug,url,chemin,metaDescription,description"
  );
  console.log(documents.map(toCsv).join(",\n"));
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
