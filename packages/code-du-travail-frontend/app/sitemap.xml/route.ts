import http from "http";
import https from "https";
import { NextResponse } from "next/server";
import {
  BUCKET_FOLDER,
  BUCKET_SITEMAP_FOLDER,
  BUCKET_URL,
} from "../../src/config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const get = BUCKET_URL.startsWith("https") ? https.get : http.get;
    const sitemapUrl = `${BUCKET_URL}/${BUCKET_FOLDER}/${BUCKET_SITEMAP_FOLDER}/sitemap.xml`;

    return new Promise<NextResponse>((resolve, reject) => {
      const sitemapReq = get(sitemapUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to fetch sitemap: ${response.statusCode}`));
          return;
        }

        let data = "";
        response.setEncoding("utf8");

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(
            new NextResponse(data, {
              status: 200,
              headers: {
                "Content-Type": "text/xml",
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
              },
            })
          );
        });
      });

      sitemapReq.on("error", (error) => {
        console.error("Sitemap fetch error:", error);
        reject(error);
      });

      sitemapReq.setTimeout(10000, () => {
        sitemapReq.destroy();
        reject(new Error("Sitemap request timeout"));
      });
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
