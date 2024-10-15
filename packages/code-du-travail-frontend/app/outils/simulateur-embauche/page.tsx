import { DsfrLayout } from "../../../src/modules/layout";
import { HiringSimulator } from "../../../src/modules/outils/simulateur-embauche";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";

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
      <HiringSimulator relatedItems={relatedItems} />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("simulateur-embauche");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default HiringSimulatorPage;
