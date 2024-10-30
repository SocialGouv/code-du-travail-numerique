import { DsfrLayout } from "../../../../src/modules/layout";
import {
  DocumentElasticResult,
  fetchRelatedItems,
} from "../../../../src/modules/documents";
import { fetchTool, FindAgreementLayout } from "../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { ElasticTool } from "../../../../src/modules/outils/type";
import { AgreementSearchByEnterprise } from "../../../../src/modules/convention-collective";

const SLUG = "convention-collective";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `/outils/${SLUG}`,
  });
}

async function FindAgreementByEnterprisePage() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems({ _id: tool._id }, SLUG);
  return (
    <DsfrLayout>
      <FindAgreementLayout
        relatedItems={relatedItems}
        description={tool.description}
      >
        <AgreementSearchByEnterprise />
      </FindAgreementLayout>
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(SLUG);

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default FindAgreementByEnterprisePage;
