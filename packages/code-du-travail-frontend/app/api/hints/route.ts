import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { NextResponse } from "next/server";
import { fetchNewsList } from "src/modules/actualite/queries";
import { HintsData, ModalLink } from "src/modules/recherche/modal/types";

// The latest news come from Elasticsearch: no prerendering at build time, the
// response is generated on demand with a short server cache, so that a newly
// published news item shows up quickly without querying Elasticsearch each
// time the search modal opens.
export const dynamic = "force-dynamic";

const HINTS_NEWS_COUNT = 4;
const CACHE_TTL_MS = 60 * 1000;

const SUGGESTIONS: ModalLink[] = [
  {
    id: "salaire-brut-net",
    title: "Salaire brut/net",
    slug: "/outils/simulateur-embauche",
  },
  {
    id: "indemnite-rupture-conventionnelle",
    title: "Indemnité de rupture conventionnelle",
    slug: "/outils/indemnite-rupture-conventionnelle",
  },
  {
    id: "indemnite-licenciement",
    title: "Indemnité de licenciement",
    slug: "/outils/indemnite-licenciement",
  },
  {
    id: "trouver-sa-convention-collective",
    title: "Trouver sa convention collective",
    slug: "/outils/convention-collective",
  },
];

// Latest news successfully fetched. Also used as a fallback when
// Elasticsearch is down or answers empty (alias switch during a reindex): the
// list must never disappear from the modal.
let lastKnownNews: { items: ModalLink[]; expiresAt: number } | undefined;

const respond = (actualites: ModalLink[]) =>
  NextResponse.json<HintsData>(
    { actualites, suggestions: SUGGESTIONS },
    {
      headers: {
        "Cache-Control": `public, max-age=${CACHE_TTL_MS / 1000}, s-maxage=${CACHE_TTL_MS / 1000}`,
      },
    }
  );

export async function GET() {
  const now = Date.now();
  if (lastKnownNews && lastKnownNews.expiresAt > now) {
    return respond(lastKnownNews.items);
  }

  try {
    const { items } = await fetchNewsList(["cdtnId", "title", "slug"], {
      page: 1,
      pageSize: HINTS_NEWS_COUNT,
    });
    // An empty result is neither served nor cached.
    if (items.length === 0) {
      throw new Error("Empty news list from Elasticsearch");
    }
    lastKnownNews = {
      items: items.map((news) => ({
        id: news.cdtnId,
        title: news.title,
        slug: `/${getRouteBySource(SOURCES.NEWS)}/${news.slug}`,
      })),
      expiresAt: now + CACHE_TTL_MS,
    };
    return respond(lastKnownNews.items);
  } catch (error) {
    console.error("Error fetching hints:", error);
    if (lastKnownNews) {
      // Fall back on the last known news, even expired.
      return respond(lastKnownNews.items);
    }
    return NextResponse.json(
      { error: "Failed to fetch hints" },
      { status: 500 }
    );
  }
}
