import { SOURCES } from "@socialgouv/cdtn-sources";
import fetch from "node-fetch";
import PQueue from "p-queue";

const LIMIT = 300;
const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:8080/v1/graphql";

const gqlRequestBySource = (source, offset = 0, limit = LIMIT) =>
  JSON.stringify({
    query: `{
  documents(
    order_by: {cdtn_id: asc},
    limit: ${limit}
    offset: ${offset}
    where: {source: {_eq: "${source}"},  is_available: {_eq: true} }) {
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
  documents_aggregate(where: {is_available:{_eq: true}, source: {_eq: "${source}"}}){
    aggregate {
      count
    }
  }
}`,
  });

const gqlAllKaliBlocks = () =>
  JSON.stringify({
    query: `query KaliBlocks {
      kali_blocks {id, blocks}
 }`,
  });

/**
 *
 * @param {string} id
 * @returns {Promise<ingester.AgreementKaliBlocks>}
 */
export async function getAllKaliBlocks() {
  const result = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlAllKaliBlocks(),
    method: "POST",
  }).then((r) => r.json());
  if (result.errors && result.errors.length) {
    console.error(result.errors[0].message);
    throw new Error(`error fetching kali blocks`);
  }
  return result.data.kali_blocks;
}

const gqlGlossary = () =>
  JSON.stringify({
    query: `query Glossary {
      glossary {term, abbreviations, definition, variants, references, slug}
 }`,
  });

export async function getGlossary() {
  const result = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlGlossary(),
    method: "POST",
  }).then((r) => r.json());
  if (result.errors && result.errors.length) {
    console.error(result.errors[0].message);
    throw new Error(`error fetching kali blocks`);
  }
  return result.data.glossary;
}

const gqlHighlights = () =>
  JSON.stringify({
    query: `query getHighlights {
    highlights: documents(where: {source: {_eq: "${SOURCES.HIGHLIGHTS}"}}) {
      cdtnId: cdtn_id
      id:initial_id
      slug
      source
      isPublished: is_published
      is_searchable
      contentRelations: relation_a(where: {type: {_eq: "highlight"}}) {
        position: data(path: "position")
        content: b {
          cdtnId: cdtn_id
          slug
          source
          title
          document
        }
      }
    }
  }`,
  });

export async function getHighlights(getBreadcrumbs) {
  const result = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlHighlights(),
    method: "POST",
  }).then((r) => r.json());
  if (result.errors && result.errors.length) {
    console.error(result.errors[0].message);
    throw new Error(`error fetching highlights`);
  }
  const toElasticHighlights = result.data.highlights.map((highlight) => {
    const refs = highlight.contentRelations
      .sort(
        ({ position: positionA }, { position: positionB }) =>
          positionA - positionB
      )
      .map(({ content: { cdtnId, document, slug, source, title } }) => ({
        breadcrumbs: getBreadcrumbs(cdtnId),
        cdtnId,
        description: document.description,
        slug,
        source,
        title,
      }));
    delete highlight.contentRelations;
    return {
      ...highlight,
      excludeFromSearch: true,
      refs,
    };
  });
  return toElasticHighlights;
}

export async function getDocumentBySource(source, getBreadcrumbs) {
  const nbDocResult = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlAgreggateDocumentBySource(source),
    method: "POST",
  }).then((r) => r.json());
  if (nbDocResult.errors && nbDocResult.errors.length) {
    return [];
  }
  const nbDoc = nbDocResult.data.documents_aggregate.aggregate.count;
  const queue = new PQueue({ concurrency: 10 });

  const pDocuments = Array.from(
    { length: Math.ceil(nbDoc / LIMIT) },
    (_, i) => i
  ).map((index) => {
    return queue.add(() => {
      return fetch(CDTN_ADMIN_ENDPOINT, {
        body: gqlRequestBySource(source, index * LIMIT, LIMIT),
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
    });
  });
  const docs = await Promise.all(pDocuments);
  const documents = docs.flatMap((docs) =>
    docs.map((doc) => toElastic(doc, getBreadcrumbs))
  );
  return documents;
}

function toElastic(
  {
    id,
    cdtnId,
    title,
    source,
    slug,
    text,
    is_searchable,
    is_published,
    metaDescription,
    document,
  },
  getBreadcrumbs
) {
  let breadcrumbs = [];
  if (getBreadcrumbs) {
    breadcrumbs = getBreadcrumbs(cdtnId);
  }
  return {
    ...document,
    breadcrumbs,
    cdtnId,
    excludeFromSearch: !is_searchable,
    id,
    isPublished: is_published,
    metaDescription,
    slug,
    source,
    text,
    title,
  };
}
