import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import fetch from "node-fetch";
import PQueue from "p-queue";

const fixBreadcrumbs = (source) => {
  // /!\ beware /!\
  // This won't work as soon as an editorial content is not in COVID folder !
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
    // /!\ beware /!\
    // first map should me removed once admin has a way to handle
    // editorial content's theme / path
    docs
      .map((doc) => {
        if (!getBreadcrumbs) return doc;
        const breadcrumbs = getBreadcrumbs(doc.cdtnId);
        return {
          ...doc,
          breadcrumbs:
            breadcrumbs.length > 0 ? breadcrumbs : fixBreadcrumbs(doc.source),
        };
      })
      .map((doc) => toElastic(doc, getBreadcrumbs))
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
    breadcrumbs: breadcrumbs.length > 0 ? breadcrumbs : fixBreadcrumbs(source),
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
