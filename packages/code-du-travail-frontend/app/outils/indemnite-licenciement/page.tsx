import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import IndemniteLicenciementSimulator from "../../../src/modules/outils/indemnite-licenciement/IndemniteLicenciementSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/indemnite-licenciement`,
  });
}

async function IndemniteLicenciement() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "indemnite-licenciement"
  );
  return (
    <DsfrLayout>
      <IndemniteLicenciementSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("indemnite-licenciement");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default IndemniteLicenciement;
