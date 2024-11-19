import { DsfrLayout } from "../../../../../src/modules/layout";
import {
  DocumentElasticResult,
  fetchRelatedItems,
} from "../../../../../src/modules/documents";
import {
  fetchTool,
  FindAgreementLayout,
} from "../../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../../src/modules/common/metas";
import { ElasticTool } from "../../../../../src/modules/outils/type";
import { EnterpriseAgreementSelection } from "../../../../../src/modules/enterprise";
import { searchEnterprises } from "../../../../../src/modules/enterprise/queries";
import { agreementRelatedItems } from "../../../../../src/modules/convention-collective/agreementRelatedItems";
import { SITE_URL } from "../../../../../src/config";

const SLUG = "convention-collective";

export async function generateMetadata({ params }) {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/outils/convention-collective/selection/${params.slug}`,
    overrideCanonical: `${SITE_URL}/outils/convention-collective/selection/${params.slug}`,
  });
}

async function AgreementSelectionPage({ params }) {
  const [enterprise] = await searchEnterprises({
    query: params.slug,
  });
  const tool = await getTool();
  return (
    <DsfrLayout>
      <FindAgreementLayout
        relatedItems={agreementRelatedItems}
        description={tool.description}
      >
        <EnterpriseAgreementSelection enterprise={enterprise} />
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

export default AgreementSelectionPage;
