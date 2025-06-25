import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import IndemnitePrecariteSimulator from "../../../src/modules/outils/indemnite-precarite/IndemnitePrecariteSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/widgets/indemnite-precarite`,
  });
}

async function IndemnitePrecariteWidget() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "indemnite-precarite"
  );
  return (
    <DsfrLayout>
      <IndemnitePrecariteSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("indemnite-precarite");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemnitePrecariteWidget;
