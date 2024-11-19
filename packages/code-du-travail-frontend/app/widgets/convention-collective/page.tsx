import { DocumentElasticResult } from "../../../src/modules/documents";
import {
  fetchTool,
  FindAgreementWidgetLayout,
} from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { ElasticTool } from "../../../src/modules/outils/type";
import { EnterpriseAgreementSearch } from "../../../src/modules/enterprise";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `/outils/convention-collective/entreprise`,
  });
}

async function FindAgreementByEnterprisePage() {
  return (
    <FindAgreementWidgetLayout>
      <EnterpriseAgreementSearch widgetMode />
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

export default FindAgreementByEnterprisePage;
