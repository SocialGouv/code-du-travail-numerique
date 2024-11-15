import { DsfrLayout } from "../../../../src/modules/layout";
import {
  DocumentElasticResult,
  fetchRelatedItems,
} from "../../../../src/modules/documents";
import { fetchTool, FindAgreementLayout } from "../../../../src/modules/outils";
import { notFound, redirect } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { ElasticTool } from "../../../../src/modules/outils/type";
import { AgreementSearchByName } from "../../../../src/modules/convention-collective";
import { agreementRelatedItems } from "../../../../src/modules/convention-collective/agreementRelatedItems";

const SLUG = "convention-collective";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `/outils/${SLUG}`,
  });
}

async function FindAgreementByNamePage() {
  const tool = await getTool();
  return (
    <DsfrLayout>
      <FindAgreementLayout
        relatedItems={agreementRelatedItems}
        description={tool.description}
      >
        <AgreementSearchByName />
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

export default FindAgreementByNamePage;
