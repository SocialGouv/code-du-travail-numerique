import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import HiringSimulator from "../../../src/modules/outils/simulateur-embauche/HiringSimulator";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

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
        title={tool.displayTitle}
        breadcrumbTitle={tool.title}
        relatedItems={relatedItems}
        description={tool.description}
      />
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
