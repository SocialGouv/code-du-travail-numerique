import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { CalculateurPreavisLicenciement } from "src/modules/outils/preavis-licenciement/PreavisLicenciementSimulator";
import { ElasticTool } from "@socialgouv/cdtn-types";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/preavis-licenciement`,
    overrideCanonical: `${SITE_URL}/outils/preavis-licenciement`,
  });
}

async function PreavisLicenciementWidget() {
  const { title, displayTitle } = await getTool();
  return (
    <WidgetWithIframeResizer title={displayTitle}>
      <CalculateurPreavisLicenciement title={title} />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "preavis-licenciement"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default PreavisLicenciementWidget;
