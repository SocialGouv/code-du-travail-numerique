import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "../../src/config";
import { ToolsList } from "../../src/modules/outils/page-principale/ToolsList";
import { getToolsByIdsAndSlugs } from "../../src/api/modules/tools/service";
import { notFound } from "next/navigation";
import { REVALIDATE_TIME } from "../../src/config";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Tool } from "@socialgouv/cdtn-types";

// Type pour les outils externes qui ont une URL au lieu d'un slug
type ExternalTool = Tool & {
  url: string;
};

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
    const filteredTools = tools.filter((tool) =>
      process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT ? tool.displayTool : true
    );

    if (!filteredTools || filteredTools.length === 0) {
      return notFound();
    }

    // Filtrer les outils pour ne garder que les simulateurs CDTN et les outils externes
    const cdtnSimulators = filteredTools.filter(
      (tool) => tool.source === SOURCES.TOOLS
    );

    // Convertir les outils externes pour ajouter la propriété url
    const externalTools = filteredTools
      .filter((tool) => tool.source === SOURCES.EXTERNALS)
      .map((tool) => {
        // Pour les outils externes, on utilise le champ cdtnId comme URL
        // C'est une convention utilisée dans l'application
        return {
          ...tool,
          url: tool.cdtnId,
        } as ExternalTool;
      });

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
