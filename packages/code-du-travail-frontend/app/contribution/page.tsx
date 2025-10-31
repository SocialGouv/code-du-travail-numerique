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
      <ContributionsList
        contributions={documents}
        popularContributionSlugs={[
          "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
          "les-conges-pour-evenements-familiaux",
          "a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
          "quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
          "quelle-est-la-duree-du-preavis-en-cas-de-demission",
          "le-preavis-de-demission-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
        ]}
      />
    </DsfrLayout>
  );
}

const getContributions = async () => {
  const data = await getGenericContributionsGroupByThemes();
  return data;
};

export default Index;
