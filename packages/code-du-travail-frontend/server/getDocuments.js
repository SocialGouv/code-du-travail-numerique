import slugify from "@socialgouv/cdtn-slugify";
import { SOURCES } from "@socialgouv/cdtn-sources";

const LIMIT = 300;
const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:8080/v1/graphql";

const gqlAgreggateDocumentBySource = (source) =>
  JSON.stringify({
    query: `{
  documents_aggregate(where: {is_available:{_eq: true}, is_published: {_eq: true}, source: {_eq: "${source}"}}){
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
    where: {source: {_eq: "${source}"},  is_available: {_eq: true}, is_published: {_eq: true} }) {
    slug
    source
    modified: updated_at
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

export async function getDocuments() {
  const glossary = await fetchGlossary();
  const glossaryTerms = glossary.map(({ term }) => ({
    modified: new Date(),
    slug: slugify(term),
    source: SOURCES.GLOSSARY,
  }));

  const sources = [
    SOURCES.CDT,
    SOURCES.CONTRIBUTIONS,
    SOURCES.EDITORIAL_CONTENT,
    SOURCES.EXTERNALS,
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
