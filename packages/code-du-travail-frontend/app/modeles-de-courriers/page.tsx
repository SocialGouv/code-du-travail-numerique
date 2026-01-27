import { DsfrLayout, ListLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { fetchModels } from "../../src/modules/modeles-de-courriers";
import { groupByThemes } from "../../src/modules/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";

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
      <ListLayout
        title="Modèles de documents"
        description="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
        source={SOURCES.LETTERS}
        data={modeles}
        popularSlugs={[
          "lettre-de-demission",
          "attestation-de-travail",
          "rupture-du-contrat-en-periode-dessai-par-le-salarie",
          "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
          "promesse-dembauche",
          "rupture-dun-contrat-de-travail-a-duree-determinee-dun-commun-accord",
        ]}
      />
    </DsfrLayout>
  );
}

const getModeles = async () => {
  const documents = await fetchModels([
    "title",
    "source",
    "slug",
    "description",
    "breadcrumbs",
  ]);

  return groupByThemes(documents);
};

export default Index;
