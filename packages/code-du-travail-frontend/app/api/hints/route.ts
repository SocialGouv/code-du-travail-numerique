import { getRouteBySource } from "@socialgouv/cdtn-utils";
import { NextResponse } from "next/server";
import { REVALIDATE_CACHING_TIME } from "src/config";
import { fetchHighLights } from "src/modules/highlights";
import { HintsData } from "src/modules/recherche/modal/types";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_CACHING_TIME;

export async function GET() {
  try {
    const highlights = await fetchHighLights();
    const hints: HintsData = {
      actualites: highlights.map((highlight) => ({
        id: highlight.cdtnId,
        title: highlight.title,
        slug: `/${getRouteBySource(highlight.source)}/${highlight.slug}`,
      })),
      suggestions: [
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
      ],
    };
    return NextResponse.json(hints);
  } catch (error) {
    console.error("Error fetching hints:", error);
    return NextResponse.json(
      { error: "Failed to fetch hints" },
      { status: 500 }
    );
  }
}
