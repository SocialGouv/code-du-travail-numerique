import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import PreavisDemissionSimulator from "../../../src/modules/outils/preavis-demission/PreavisDemissionSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/preavis-demission`,
  });
}

async function PreavisDemission() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "preavis-demission"
  );
  return (
    <DsfrLayout>
      <PreavisDemissionSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("preavis-demission");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default PreavisDemission;
