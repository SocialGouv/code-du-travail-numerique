import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { ElasticTool } from "@socialgouv/cdtn-types";
import { CalculateurHeuresRechercheEmploi } from "src/modules/outils/heures-recherche-emploi/HeuresRechercheEmploiSimulator";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/heures-recherche-emploi`,
    overrideCanonical: `${SITE_URL}/outils/heures-recherche-emploi`,
  });
}

async function HeuresRechercheEmploiWidget() {
  const { title, displayTitle } = await getTool();
  return (
    <WidgetWithIframeResizer title={displayTitle}>
      <CalculateurHeuresRechercheEmploi title={title} />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "heures-recherche-emploi"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default HeuresRechercheEmploiWidget;
