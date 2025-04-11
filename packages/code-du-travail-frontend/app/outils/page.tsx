import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "../../src/config";
import { ToolsList } from "../../src/modules/outils/page-principale/ToolsList";
import { getToolsByIdsAndSlugs } from "../../src/api/modules/tools/service";
import { notFound } from "next/navigation";
import { REVALIDATE_TIME } from "../../src/config";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Tool } from "@socialgouv/cdtn-types";

// Les outils externes ont déjà une propriété url dans le type Tool

export const metadata = generateDefaultMetadata({
  title: "Outils et simulateurs",
  description:
    "Trouvez des réponses personnalisées selon votre situation grâce à nos outils et simulateurs",
  path: "/outils",
  overrideCanonical: `${SITE_URL}/outils`,
});

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

async function OutilsPage() {
  try {
    const tools = await getToolsByIdsAndSlugs();

    if (!tools || tools.length === 0) {
      return notFound();
    }

    const cdtnSimulators = tools.filter(
      (tool) => tool.source === SOURCES.TOOLS
    );

    const externalTools = tools.filter(
      (tool) => tool.source === SOURCES.EXTERNALS
    );

    return (
      <DsfrLayout>
        <ToolsList
          cdtnSimulators={cdtnSimulators}
          externalTools={externalTools}
        />
      </DsfrLayout>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des outils:", error);
    return notFound();
  }
}

export default OutilsPage;
