import { DocumentElasticResult } from "../../../../src/modules/documents";
import {
  fetchTool,
  FindAgreementWidgetLayout,
} from "../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { ElasticTool } from "../../../../src/modules/outils/type";
import { AgreementSearchByName } from "../../../../src/modules/convention-collective";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `/outils/convention-collective/convention`,
  });
}

async function FindAgreementByNamePage() {
  return (
    <FindAgreementWidgetLayout>
      <AgreementSearchByName navigationUrl="/widgets/convention-collective" />
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

export default FindAgreementByNamePage;
