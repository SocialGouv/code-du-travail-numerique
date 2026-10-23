import { NextResponse } from "next/server";
import { fetchNewsList } from "../../../src/modules/actualite/queries";
import {
  buildNewsRssFeed,
  NEWS_RSS_ITEMS_COUNT,
} from "../../../src/modules/actualite/rss";

// Le flux dépend d'Elasticsearch : pas de pré-rendu au build, génération à la
// demande avec un cache serveur d'une heure (cohérent avec le <ttl> du flux)
// pour ne pas solliciter Elasticsearch à chaque passage d'un agrégateur.
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 60 * 60 * 1000;

// Dernier flux généré avec succès. Sert aussi de repli si Elasticsearch est
// indisponible ou répond vide (bascule d'alias pendant une réindexation) :
// un agrégateur ne doit jamais voir les actualités disparaître.
let lastKnownFeed: { body: string; expiresAt: number } | undefined;

const respond = (body: string) =>
  new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });

export async function GET() {
  const now = Date.now();
  if (lastKnownFeed && lastKnownFeed.expiresAt > now) {
    return respond(lastKnownFeed.body);
  }

  try {
    const { items } = await fetchNewsList(
      ["title", "meta_description", "date", "slug"],
      { page: 1, pageSize: NEWS_RSS_ITEMS_COUNT }
    );
    // Un résultat vide n'est ni servi ni mis en cache : jamais de flux sans
    // item en 200.
    if (items.length === 0) {
      throw new Error("Empty news list from Elasticsearch");
    }
    lastKnownFeed = {
      body: buildNewsRssFeed(items),
      expiresAt: now + CACHE_TTL_MS,
    };
    return respond(lastKnownFeed.body);
  } catch (error) {
    console.error("News RSS feed error:", error);
    if (lastKnownFeed) {
      // Repli sur le dernier flux connu, même expiré.
      return respond(lastKnownFeed.body);
    }
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
