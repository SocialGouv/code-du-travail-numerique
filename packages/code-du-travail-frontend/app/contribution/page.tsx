import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { ContributionsList } from "../../src/modules/contributions";
import { getGenericContributionsGroupByThemes } from "../../src/api";

export const metadata = generateDefaultMetadata({
  title: "Vos fiches pratiques",
  description:
    "Obtenez une réponse personnalisée selon votre convention collective",
  path: "/contribution",
});

async function Index() {
  const { documents } = await getContributions();

  return (
    <DsfrLayout>
      <ContributionsList contribs={documents} />
    </DsfrLayout>
  );
}

const getContributions = async () => {
  const data = await getGenericContributionsGroupByThemes();
  return data;
};

export default Index;
