import { DsfrLayout } from "../../../../src/modules/layout";
import { DocumentElasticResult } from "../../../../src/modules/documents";
import { fetchTool, FindAgreementLayout } from "../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { ElasticTool } from "../../../../src/modules/outils/type";
import { EnterpriseAgreementSearch } from "../../../../src/modules/enterprise";
import { agreementRelatedItems } from "../../../../src/modules/convention-collective/agreementRelatedItems";
import { SITE_URL } from "../../../../src/config";

const SLUG = "convention-collective";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/outils/convention-collective/entreprise`,
    overrideCanonical: `${SITE_URL}/outils/convention-collective`,
  });
}

async function FindAgreementByEnterprisePage() {
  const tool = await getTool();
  return (
    <DsfrLayout>
      <FindAgreementLayout
        relatedItems={agreementRelatedItems}
        description={tool.description}
      >
        <EnterpriseAgreementSearch />
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
