import { DsfrLayout } from "../../../src/modules/layout";
import {
  DocumentElasticResult,
  fetchRelatedItems,
} from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { ElasticTool } from "../../../src/modules/outils/type";
import HiringSimulator from "../../../src/modules/outils/simulateur-embauche/HiringSimulator";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
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
