import http from "http";
import https from "https";
import { AZURE_BASE_URL } from "../src/config";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  return new Promise(function SitemapStream(resolve, reject) {
    const get = AZURE_BASE_URL.startsWith("https") ? https.get : http.get;
    const sitempaReq = get(
      `${AZURE_BASE_URL}/sitemap/sitemap.xml`,
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
