import http from "http";
import https from "https";

const {
  AZURE_BASE_URL = "https://cdtnadminprod.blob.core.windows.net",
  FRONTEND_HOST,
} = process.env;

export default async function Sitemap(req, res) {
  let sitemapFile = "sitemap.xml";
  if (/dev2/.test(FRONTEND_HOST)) {
    const [hash] = FRONTEND_HOST.match(/^\w+/);
    sitemapFile = `sitemap-${hash}.xml`;
    try {
      const response = await fetch(`${AZURE_BASE_URL}/sitemap/${sitemapFile}`, {
        method: "HEAD",
      });
      if (!response.ok) {
        throw response;
      }
    } catch (error) {
      console.error(`fail to retrieve ${sitemapFile}`);
      sitemapFile = "sitemap.xml";
    }
  }

  const promise = new Promise(function SitemapStream(resolve, reject) {
    const get = AZURE_BASE_URL.startsWith("https") ? https.get : http.get;
    const sitempaReq = get(
      `${AZURE_BASE_URL}/sitemap/${sitemapFile}`,
      (response) => {
        response.pipe(res);
        response.on("end", () => {
          resolve();
        });
      }
    );

    sitempaReq.on("error", (error) => {
      console.error(error);
      reject();
      res.status(500).json({ error, message: "stream error", statusCode: 500 });
    });
  });
  return promise;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
