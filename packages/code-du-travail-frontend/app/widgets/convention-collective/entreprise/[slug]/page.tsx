import { DocumentElasticResult } from "../../../../../src/modules/documents";
import {
  fetchTool,
  FindAgreementWidgetLayout,
} from "../../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../../src/modules/common/metas";
import { ElasticTool } from "@socialgouv/cdtn-types";
import { EnterpriseAgreementSelectionLink } from "../../../../../src/modules/enterprise";
import { searchEnterprises } from "../../../../../src/modules/enterprise/queries";
import { SITE_URL } from "../../../../../src/config";

export async function generateMetadata(props) {
  const params = await props.params;
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/widgets/convention-collective/selection/${params.slug}`,
    overrideCanonical: `${SITE_URL}/outils/convention-collective`,
  });
}

async function AgreementSelectionPage(props) {
  const params = await props.params;
  const [enterprise] = await searchEnterprises({
    query: params.slug,
  });
  return (
    <FindAgreementWidgetLayout>
      <EnterpriseAgreementSelectionLink
        enterprise={enterprise}
        widgetMode
        level={2}
      />
    </FindAgreementWidgetLayout>
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
