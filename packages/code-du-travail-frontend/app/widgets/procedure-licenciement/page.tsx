import { DocumentElasticResult } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { ElasticTool } from "@socialgouv/cdtn-types";
import { DismissalProcess } from "../../../src/modules/outils/dismissal-process/DismissalProcess";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/procedure-licenciement`,
    overrideCanonical: `${SITE_URL}/outils/procedure-licenciement`,
  });
}

async function PreavisRetraiteWidget() {
  const { displayTitle } = await getTool();
  return (
    <WidgetWithIframeResizer title={displayTitle}>
      <DismissalProcess widgetMode />
    </WidgetWithIframeResizer>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "procedure-licenciement"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default PreavisRetraiteWidget;
