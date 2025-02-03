import { DsfrLayout } from "../../../../src/modules/layout";
import { fetchTool, FindAgreementLayout } from "../../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { AgreementSearch } from "../../../../src/modules/convention-collective";
import { agreementRelatedItems } from "../../../../src/modules/convention-collective/agreementRelatedItems";
import { SITE_URL } from "../../../../src/config";

export async function generateMetadata() {
  const { title, description } = await getTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${title}`,
    description: description,
    path: `${SITE_URL}/outils/convention-collective/convention`,
    overrideCanonical: `${SITE_URL}/outils/convention-collective`,
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
        <AgreementSearch />
      </FindAgreementLayout>
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("convention-collective");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default FindAgreementByNamePage;
