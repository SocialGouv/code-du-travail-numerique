import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { ElasticTool } from "../../../src/modules/outils/type";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { CalculateurPreavisRetraite } from "src/modules/outils/preavis-retraite/PreavisRetraiteSimulator";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/preavis-retraite`,
    overrideCanonical: `${SITE_URL}/outils/preavis-retraite`,
  });
}

async function PreavisRetraiteWidget() {
  const { title } = await getTool();
  return (
    <WidgetWithIframeResizer title={title}>
      <CalculateurPreavisRetraite title={title} />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> =
    await fetchTool("preavis-retraite");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default PreavisRetraiteWidget;
