import http from "http";
import https from "https";
import { BUCKET_URL, BUCKET_SITEMAP_FOLDER } from "../src/config";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  return new Promise(function SitemapStream(resolve, reject) {
    const get = BUCKET_URL.startsWith("https") ? https.get : http.get;
    const sitempaReq = get(
      `${BUCKET_URL}/${BUCKET_SITEMAP_FOLDER}/sitemap.xml`,
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
