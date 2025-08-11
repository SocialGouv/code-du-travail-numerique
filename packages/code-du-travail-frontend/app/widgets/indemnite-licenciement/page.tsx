import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { ElasticTool } from "@socialgouv/cdtn-types";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { CalculateurIndemniteLicenciement } from "src/modules/outils/indemnite-licenciement";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/indemnite-licenciement`,
    overrideCanonical: `${SITE_URL}/outils/indemnite-licenciement`,
  });
}

async function IndemniteLicenciementWidget() {
  const { title, displayTitle } = await getTool();
  return (
    <WidgetWithIframeResizer title={displayTitle || title}>
      <CalculateurIndemniteLicenciement title={title} />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "indemnite-licenciement"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemniteLicenciementWidget;
