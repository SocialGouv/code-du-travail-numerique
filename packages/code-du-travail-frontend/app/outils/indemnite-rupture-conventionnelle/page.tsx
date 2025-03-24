import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import IndemniteRuptureCoSimulator from "../../../src/modules/outils/indemnite-rupture-conventionnelle/IndemniteRuptureCoSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/indemnite-rupture-conventionnelle`,
  });
}

async function IndemniteRuptureCo() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "indemnite-rupture-conventionnelle"
  );
  return (
    <DsfrLayout>
      <IndemniteRuptureCoSimulator
        title={tool.displayTitle}
        breadcrumbTitle={tool.title}
        relatedItems={relatedItems}
        description={tool.description}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("indemnite-rupture-conventionnelle");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemniteRuptureCo;
