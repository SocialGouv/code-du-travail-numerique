import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { ElasticTool } from "../../../src/modules/outils/type";
import { SITE_URL } from "../../../src/config";
import { CalculateurIndemniteRuptureCo } from "src/modules/outils/indemnite-rupture-conventionnelle/IndemniteRuptureCoSimulator";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/indemnite-rupture-conventionnelle`,
    overrideCanonical: `${SITE_URL}/outils/indemnite-rupture-conventionnelle`,
  });
}

async function IndemniteRuptureCoWidget() {
  const { title } = await getTool();
  return (
    <WidgetWithIframeResizer title={title}>
      <CalculateurIndemniteRuptureCo title={title} />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "indemnite-rupture-conventionnelle"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemniteRuptureCoWidget;
