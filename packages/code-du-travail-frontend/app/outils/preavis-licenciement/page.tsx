import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import PreavisLicenciementSimulator from "../../../src/modules/outils/preavis-licenciement/PreavisLicenciementSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/preavis-licenciement`,
  });
}

async function PreavisLicenciement() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "preavis-licenciement"
  );
  return (
    <DsfrLayout>
      <PreavisLicenciementSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("preavis-licenciement");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default PreavisLicenciement;
