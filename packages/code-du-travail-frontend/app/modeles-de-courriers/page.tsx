import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import {
  fetchModels,
  formatByRootTheme,
  LetterModels,
} from "../../src/modules/modeles-de-courriers";

export const metadata = generateDefaultMetadata({
  title: "Modèles de documents",
  description:
    "Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail",
  path: "/modeles-de-courriers",
});

async function Index() {
  const modeles = await getModeles();

  return (
    <DsfrLayout>
      <LetterModels modeles={modeles} />
    </DsfrLayout>
  );
}

const getModeles = async () => {
  const themes = await fetchModels([
    "title",
    "slug",
    "description",
    "breadcrumbs",
  ]);

  return formatByRootTheme(themes);
};

export default Index;
