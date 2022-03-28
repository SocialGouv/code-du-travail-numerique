import http from "http";
import https from "https";
import getConfig from "next/config";

const {
  publicRuntimeConfig: {
    AZURE_BASE_URL = "https://cdtnadminprod.blob.core.windows.net",
  },
} = getConfig();
const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const sitemapFile = "sitemap.xml";

  return new Promise(function SitemapStream(resolve, reject) {
    const get = AZURE_BASE_URL.startsWith("https") ? https.get : http.get;
    const sitempaReq = get(
      `${AZURE_BASE_URL}/sitemap/${sitemapFile}`,
      (response) => {
        response.pipe(res);
        response.on("end", () => {
          resolve({
            props: {},
          });
        });
      }
    );

    sitempaReq.on("error", (error) => {
      console.error(error);
      reject();
      res.status(500).json({ error, message: "stream error", statusCode: 500 });
    });
  });
};

export default Sitemap;
