import { ElasticTool } from "@socialgouv/cdtn-types";
import { DsfrLayout } from "../../../../../src/modules/layout";
import { DocumentElasticResult } from "../../../../../src/modules/documents";
import {
  fetchTool,
  FindAgreementLayout,
} from "../../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../../src/modules/common/metas";
import { EnterpriseAgreementSelectionLink } from "../../../../../src/modules/enterprise";
import { searchEnterprises } from "../../../../../src/modules/enterprise/queries";
import { agreementRelatedItems } from "../../../../../src/modules/convention-collective/agreementRelatedItems";
import { SITE_URL } from "../../../../../src/config";

export async function generateMetadata({ params }) {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/outils/convention-collective/selection/${params.slug}`,
    overrideCanonical: `${SITE_URL}/outils/convention-collective`,
  });
}

async function AgreementSelectionPage({ params }) {
  const [enterprise] = await searchEnterprises({
    query: params.slug,
  });
  if (!enterprise) {
    return notFound();
  }
  const tool = await getTool();
  return (
    <DsfrLayout>
      <meta name="robots" content="noindex,nofollow" />
      <FindAgreementLayout
        relatedItems={agreementRelatedItems}
        description={tool.description}
      >
        <EnterpriseAgreementSelectionLink enterprise={enterprise} />
      </FindAgreementLayout>
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool: DocumentElasticResult<ElasticTool> = await fetchTool(
    "convention-collective"
  );

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default AgreementSelectionPage;
