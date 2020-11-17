import { SOURCES } from "@socialgouv/cdtn-sources";

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
    slug
    source
    modified: updated_at
  }
}`,
  });

async function getDocuments() {
  const sources = Object.values(SOURCES);
  const docs = await sources.flatMap(async (source) => {
    const nbDocResult = await fetch(CDTN_ADMIN_ENDPOINT, {
      body: gqlAgreggateDocumentBySource(source),
      method: "POST",
    }).then((r) => r.json());

    const nbDoc = nbDocResult.data.documents_aggregate.aggregate.count;
    const pages = Array.from({ length: Math.ceil(nbDoc / LIMIT) }, (_, i) => i);
    return await batchPromises(pages, () => fetchDocuments(source), 15);
  });
  return docs;
}

const fetchDocuments = (source) => async (page) => {
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
};

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

export async function getStaticProps() {
  const paths = getDocuments();
  return {
    fallback: false,
    paths,
  };
}

export default function Sitemap({ documents }) {
  let latestPost = 0;
  let projectsXML = "";

  documents.map((document) => {
    const postDate = Date.parse(document.modified);
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }

    const projectURL = `https://domain.ltd/project/${post.slug}/`;
    projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://domain.ltd/</loc>
        <lastmod>${latestPost}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://domain.ltd/about/</loc>
        <priority>0.80</priority>
      </url>
      ${projectsXML}
    </urlset>`;
}
