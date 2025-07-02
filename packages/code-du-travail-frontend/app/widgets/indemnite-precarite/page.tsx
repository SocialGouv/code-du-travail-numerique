import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { ElasticTool } from "@socialgouv/cdtn-types";
import { CalculateurIndemnitePrecarite } from "src/modules/outils/indemnite-precarite";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/preavis-demission`,
    overrideCanonical: `${SITE_URL}/outils/preavis-demission`,
  });
}

async function IndemnitePrecariteWidget() {
  const { title, displayTitle } = await getTool();
  return (
    <WidgetWithIframeResizer title={displayTitle}>
      <CalculateurIndemnitePrecarite title={title} />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "indemnite-precarite"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemnitePrecariteWidget;
