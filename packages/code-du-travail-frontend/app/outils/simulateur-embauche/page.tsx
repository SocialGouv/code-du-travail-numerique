import { DsfrLayout } from "../../../src/modules/layout";
import { HiringSimulator } from "../../../src/modules/outils/simulateur-embauche";
import {
  DocumentElasticResult,
  fetchRelatedItems,
} from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { ElasticTool } from "../../../src/modules/outils/type";

export async function generateMetadata() {
  const {  metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/simulateur-embauche`,
  });
}

async function HiringSimulatorPage() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "simulateur-embauche"
  );
  return (
    <DsfrLayout>
      <HiringSimulator
        relatedItems={relatedItems}
        title={tool.title}
        description={tool.description}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "simulateur-embauche"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default HiringSimulatorPage;
