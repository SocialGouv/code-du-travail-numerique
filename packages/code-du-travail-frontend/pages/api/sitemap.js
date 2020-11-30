import { getRouteBySource } from "@socialgouv/cdtn-sources";
import memoizee from "memoizee";

import { getDocuments as _getDocuments } from "../../server/getDocuments";

const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

export default async function Sitemap(req, res) {
  const documents = await getDocuments();
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(`https://${PROD_HOSTNAME}`, documents));
  res.end();
}

const getDocuments = memoizee(_getDocuments, {
  maxAge: 24 * 60 * 60 * 1000,
  preFetch: true,
  promise: true,
});

const createSitemap = memoizee(_createSitemap);

function _createSitemap(baseUrl, documents) {
  let latestPost = 0;
  const pages = documents.map((doc) => {
    const postDate = Date.parse(doc.modified);
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }
    const projectURL = `${baseUrl}/${getRouteBySource(doc.source)}/${doc.slug}`;
    return toUrlEntry(projectURL, doc.modified);
  });

  const staticPages = [
    `/a-propos`,
    `/droit-du-travail`,
    `/mentions-legales`,
    `/politique-confidentialite`,
    `/integration`,
  ]
    .map((path) => `https://${PROD_HOSTNAME}${path}`)
    .map(toUrlEntry);
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date(latestPost).toISOString()}</lastmod>
      <priority>0.8</priority>
    </url>
    ${pages.concat(staticPages).join("")}
  </urlset>`;
}

function toUrlEntry(url, date = new Date().toISOString(), priority = 0.5) {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}
