import fetch from "node-fetch";
import PQueue from "p-queue";

const PAGE_SIZE = 200;
const JOB_CONCURRENCY = 5;
const CDTN_ADMIN_ENDPOINT =
  process.env.CDTN_ADMIN_ENDPOINT || "http://localhost:8080/v1/graphql";

const gqlRequestBySource = (source, offset = 0, limit = null) =>
  JSON.stringify({
    query: `{
  documents(
    order_by: {cdtn_id: asc}
    limit: ${limit}
    offset: ${offset}
    where: {source: {_eq: "${source}"},  is_available: {_eq: true} }
  ) {
    id:initial_id
    cdtnId:cdtn_id
    title
    slug
    source
    text
    isPublished: is_published
    isSearchable: is_searchable
    metaDescription:meta_description
    document
  }
}`,
  });

const gqlRequestBySourceWithRelations = (source, offset = 0, limit = null) =>
  JSON.stringify({
    query: `{
  documents(
    order_by: {cdtn_id: asc}
    limit: ${limit}
    offset: ${offset}
    where: {source: {_eq: "${source}"},  is_available: {_eq: true} }
  ) {
    id:initial_id
    cdtnId:cdtn_id
    title
    slug
    source
    text
    isPublished: is_published
    isSearchable: is_searchable
    metaDescription:meta_description
    document
    contentRelations: relation_a(where: {type: {_eq: "document-content"}}) {
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
  const fetchDocuments = createDocumentsFetcher(gqlRequestBySource);
  const pDocuments = await fetchDocuments(source, {
    concurrency: 10,
    pageSize: 300,
  });
  const docs = await Promise.all(pDocuments);
  const documents = docs.flatMap((docs) =>
    docs.map((doc) => toElastic(doc, getBreadcrumbs))
  );
  return documents;
}

export async function getDocumentBySourceWithRelation(source, getBreadcrumbs) {
  const fetchDocuments = createDocumentsFetcher(
    gqlRequestBySourceWithRelations
  );
  const pDocuments = await fetchDocuments(source, {
    concurrency: 3,
    pageSize: 100,
  });
  const docs = await Promise.all(pDocuments);
  const documents = docs.flatMap((docs) =>
    docs.map((doc) =>
      toElastic({
        ...doc,
        refs: toRefs(doc.contentRelations, getBreadcrumbs),
      })
    )
  );
  return documents;
}

const createDocumentsFetcher = (gqlRequest = gqlRequestBySource) => async (
  source,
  { pageSize = PAGE_SIZE, concurrency = JOB_CONCURRENCY }
) => {
  const nbDocResult = await fetch(CDTN_ADMIN_ENDPOINT, {
    body: gqlAgreggateDocumentBySource(source),
    method: "POST",
  }).then((r) => r.json());
  if (nbDocResult.errors && nbDocResult.errors.length) {
    return [];
  }
  const nbDoc = nbDocResult.data.documents_aggregate.aggregate.count;
  const queue = new PQueue({ concurrency });

  return Array.from({ length: Math.ceil(nbDoc / pageSize) }, (_, i) => i).map(
    (index) => {
      return queue.add(() => {
        return fetch(CDTN_ADMIN_ENDPOINT, {
          body: gqlRequest(source, index * pageSize, pageSize),
          method: "POST",
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            const error = new Error(res.statusText);
            error.status = res.status;
            throw error;
          })
          .then((result) => {
            if (result.errors) {
              console.error(result.errors);
              throw result.errors[0];
            }
            return result.data.documents;
          });
      });
    }
  );
};

function toElastic(
  {
    id,
    cdtnId,
    title,
    source,
    slug,
    text,
    isSearchable,
    isPublished,
    metaDescription,
    document,
    refs,
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
    excludeFromSearch: !isSearchable,
    id,
    isPublished,
    metaDescription,
    refs,
    slug,
    source,
    text,
    title,
  };
}

function toRefs(contentRelations, getBreadcrumbs) {
  return contentRelations
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
}
