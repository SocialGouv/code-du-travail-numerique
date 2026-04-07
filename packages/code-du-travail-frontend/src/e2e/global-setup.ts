import type { FullConfig } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseString } from "xml2js";

const PRODUCTION_DOMAIN = "https://code.travail.gouv.fr";

async function downloadUrlsToValidate(baseURL: string, dataDir: string) {
  console.log("Download all URLs to validate HTML...");
  try {
    const response = await fetch(`${baseURL}/sitemap.xml`);
    const data = await response.text();

    const urls: string[] = await new Promise((resolve, reject) => {
      parseString(data, (err, result) => {
        if (err) return reject(err);
        resolve(result.urlset.url.map((url: { loc: string[] }) => url.loc[0]));
      });
    });

    const paths = urls.map((url) =>
      url.replace(PRODUCTION_DOMAIN, "").replace(baseURL, "")
    );

    await writeFile(
      path.join(dataDir, "urls-to-validate.json"),
      JSON.stringify(
        paths.filter(
          (p) =>
            p.includes("/information/") || p.includes("/convention-collective/")
        )
      )
    );

    await writeFile(
      path.join(dataDir, "urls-contributions-to-validate.json"),
      JSON.stringify(paths.filter((p) => p.includes("/contribution/")))
    );

    console.log("All URLs to validate HTML downloaded");
  } catch (error) {
    console.error("Failed to download URLs from sitemap", error);
  }
}

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL as string | undefined;

  if (!baseURL) {
    throw new Error("Playwright baseURL is not defined");
  }

  const dataDir = path.resolve(__dirname, ".data");
  await mkdir(dataDir, { recursive: true });

  const storageState = {
    cookies: [],
    origins: [
      {
        origin: new URL(baseURL).origin,
        localStorage: [
          {
            name: "cdtn-cookie-consent-given",
            value: "true",
          },
        ],
      },
    ],
  };

  await writeFile(
    path.join(dataDir, "storage-state.json"),
    JSON.stringify(storageState, null, 2)
  );

  await downloadUrlsToValidate(baseURL, dataDir);
}
