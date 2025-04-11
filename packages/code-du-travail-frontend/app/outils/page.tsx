import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "../../src/config";
import { ToolsList } from "../../src/modules/outils/page-principale/ToolsList";
import { getToolsByIdsAndSlugs } from "../../src/api/modules/tools/service";
import { notFound } from "next/navigation";
import { REVALIDATE_TIME } from "../../src/config";
import { SOURCES } from "@socialgouv/cdtn-utils";

export const metadata = generateDefaultMetadata({
  title: "Simulateurs",
  description: "Trouvez des réponses personnalisées selon votre situation",
  path: "/outils",
  overrideCanonical: `${SITE_URL}/outils`,
});

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

async function OutilsPage() {
  try {
    const result = await getToolsByIdsAndSlugs();
    const tools = result
      .map(({ _id, _source }) => ({ ..._source, _id }))
      .filter((tool) =>
        process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
          ? tool.displayTool
          : true
      );

    if (!tools || tools.length === 0) {
      return notFound();
    }

    // Filtrer les outils pour ne garder que les simulateurs CDTN
    const cdtnSimulators = tools.filter(
      (tool) => tool.source === SOURCES.TOOLS
    );

    return (
      <DsfrLayout>
        <ToolsList cdtnSimulators={cdtnSimulators} />
      </DsfrLayout>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des outils:", error);
    return notFound();
  }
}

export default OutilsPage;
