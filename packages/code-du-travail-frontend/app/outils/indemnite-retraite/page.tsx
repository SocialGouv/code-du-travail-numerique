import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import IndemniteRetraiteSimulator from "../../../src/modules/outils/indemnite-retraite/IndemniteRetraiteSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/indemnite-retraite`,
  });
}

async function IndemniteRetraite() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "indemnite-retraite"
  );
  return (
    <DsfrLayout>
      <IndemniteRetraiteSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("indemnite-retraite");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemniteRetraite;
