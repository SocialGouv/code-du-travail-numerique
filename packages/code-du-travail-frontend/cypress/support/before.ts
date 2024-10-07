// @ts-ignore
import fs from "fs";
import { parseString } from "xml2js";

const PRODUCTION_DOMAIN = "https://code.travail.gouv.fr";
const PREPROD_DOMAIN =
  "https://code-du-travail-numerique-preprod.ovh.fabrique.social.gouv.fr";

export const downloadAllUrlsToValidate = async () => {
  console.log("Download all URLs to validate HTML...");
  try {
    const response = await fetch(`${PREPROD_DOMAIN}/sitemap.xml`);
    const data = await response.text();
    const parseUrls: Promise<string[]> = new Promise((resolve, reject) => {
      parseString(data, (err, result) => {
        if (err) {
          reject(err);
        }

        const urls: string[] = result.urlset.url.map((url: any) => url.loc[0]);
        resolve(urls);
      });
    });

    const urls = (await parseUrls).map((url: string) => {
      return url.replace(PRODUCTION_DOMAIN, PREPROD_DOMAIN);
    });

    fs.writeFileSync(
      "./cypress/support/urls-to-validate.json",
      JSON.stringify(
        urls.filter(
          (url) =>
            url.includes("/information/") ||
            url.includes("/convention-collective/"),
        ),
      ),
    );

    const urlsContributions: string[] = urls.filter((url) =>
      url.includes("/contribution/"),
    );

    fs.writeFileSync(
      "./cypress/support/urls-contributions-to-validate.json",
      JSON.stringify(urlsContributions),
    );
    console.log("All URLs to validate HTML downloaded");
  } catch (error) {
    console.error("Failed to download URLs from sitemap", error);
  }
};
