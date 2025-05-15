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
  const contribs = await getContributions();

  return (
    <DsfrLayout>
      <ContributionsList contribs={contribs} />
    </DsfrLayout>
  );
}

const getContributions = async () => {
  try {
    const data = await getGenericContributionsGroupByThemes();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default Index;
