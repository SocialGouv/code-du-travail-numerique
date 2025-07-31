import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { DismissalProcessPage } from "../../../src/modules/outils/dismissal-process";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/procedure-licenciement`,
  });
}

async function DismissalProcedure() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "procedure-licenciement"
  );
  return (
    <DsfrLayout>
      <DismissalProcessPage title={tool.title} relatedItems={relatedItems} />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("procedure-licenciement");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default DismissalProcedure;
