import { DsfrLayout } from "../../../../src/modules/layout";
import { DocumentElasticResult } from "../../../../src/modules/documents";
import { fetchTool, FindAgreementLayout } from "../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { ElasticTool } from "@socialgouv/cdtn-types";
import { EnterpriseAgreementSearch } from "../../../../src/modules/enterprise";
import { agreementRelatedItems } from "../../../../src/modules/convention-collective/agreementRelatedItems";
import { SITE_URL } from "../../../../src/config";
import { Suspense } from "react";

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
        <Suspense fallback={<div>Chargement...</div>}>
          <EnterpriseAgreementSearch />
        </Suspense>
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

export default FindAgreementByEnterprisePage;
