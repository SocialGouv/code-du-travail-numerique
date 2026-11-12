import type { MetadataRoute } from "next";
import { IS_PROD, SITE_URL } from "../src/config";

// Évalué à la requête : seule la production doit être indexée.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PROD) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      disallow: ["/assets/", "/images/", "/recherche"],
    },
    sitemap: `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
  };
}
