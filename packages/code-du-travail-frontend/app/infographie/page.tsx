import { DsfrLayout, ListLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { fetchInfographics } from "../../src/modules/infographie";
import { groupByThemes } from "../../src/modules/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Metadata } from "next";

export const metadata: Metadata = generateDefaultMetadata({
  title: "Infographies",
  description:
    "Découvrez toutes nos infographies : des visuels clairs pour comprendre vos droits, obligations et démarches en un coup d'oeil.",
  path: "/infographie",
});

async function Index() {
  const { documents } = await getInfographics();

  return (
    <DsfrLayout>
      <ListLayout
        title="Infographies"
        description="Découvrez toutes nos infographies : des visuels clairs pour comprendre vos droits, obligations et démarches en un coup d'oeil."
        source={SOURCES.INFOGRAPHICS}
        data={documents}
        popularSlugs={[
          "licenciement-pour-inaptitude-medicale",
          "rupture-conventionnelle-les-etapes-de-la-procedure-et-les-delais",
          "report-des-conges-en-cas-de-maladie-de-courte-duree-moins-de-1-an",
          "que-se-passe-t-il-en-cas-dabandon-de-poste",
          "partage-de-la-valeur-nouvelles-regles-pour-les-entreprises-de-11-a-49-salaries",
          "refus-des-propositions-de-cdi-quelles-consequences",
        ]}
      />
    </DsfrLayout>
  );
}

const getInfographics = async () => {
  const data = await fetchInfographics([
    "title",
    "source",
    "meta_description",
    "slug",
    "breadcrumbs",
  ]);
  return groupByThemes(
    data.map((item) => ({
      ...item,
      description: item.meta_description,
    }))
  );
};

export default Index;
