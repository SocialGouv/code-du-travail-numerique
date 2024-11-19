import { DocumentElasticResult } from "../../../../../src/modules/documents";
import {
  fetchTool,
  FindAgreementWidgetLayout,
} from "../../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../../src/modules/common/metas";
import { ElasticTool } from "../../../../../src/modules/outils/type";
import { EnterpriseAgreementSelection } from "../../../../../src/modules/enterprise";
import { searchEnterprises } from "../../../../../src/modules/enterprise/queries";

const SLUG = "convention-collective";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `/outils/${SLUG}`,
  });
}

async function AgreementSelectionPage({ params }) {
  const [enterprise] = await searchEnterprises({
    query: params.slug,
  });
  return (
    <FindAgreementWidgetLayout>
      <EnterpriseAgreementSelection enterprise={enterprise} widgetMode />
    </FindAgreementWidgetLayout>
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
