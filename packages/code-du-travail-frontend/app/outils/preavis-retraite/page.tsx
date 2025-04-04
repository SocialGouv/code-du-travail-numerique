import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import PreavisRetraiteSimulator from "../../../src/modules/outils/preavis-retraite/PreavisRetraiteSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/preavis-retraite`,
  });
}

async function PreavisRetraite() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "preavis-retraite"
  );
  return (
    <DsfrLayout>
      <PreavisRetraiteSimulator
        title={tool.displayTitle}
        breadcrumbTitle={tool.title}
        relatedItems={relatedItems}
        description={tool.description}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("preavis-retraite");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default PreavisRetraite;
