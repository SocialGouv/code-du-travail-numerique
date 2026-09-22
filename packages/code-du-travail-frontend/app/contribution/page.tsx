import { DsfrLayout, ListLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { fetchContributions } from "../../src/modules/contributions";
import { fetchAllInformations } from "../../src/modules/informations";
import { fetchThemesRefs, sortByThemeOrder } from "../../src/modules/themes";
import { groupByThemes } from "../../src/modules/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Metadata } from "next";

const DESCRIPTION =
  "Obtenez une réponse personnalisée selon votre convention collective ou des informations précises sur le droit du travail";

export const metadata: Metadata = generateDefaultMetadata({
  title: "Fiches pratiques",
  description: DESCRIPTION,
  path: "/contribution",
});

// Liste pilotée par le code, appariée sur (source, slug) : elle peut accueillir
// des fiches infos (source `information`) sans collision avec une contribution
// de même slug.
const POPULAR_DOCUMENTS = [
  "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  "les-conges-pour-evenements-familiaux",
  "a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
  "quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
  "quelle-est-la-duree-du-preavis-en-cas-de-demission",
  "le-preavis-de-demission-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
].map((slug) => ({ source: SOURCES.CONTRIBUTIONS, slug }));

async function Index() {
  const documents = await getPracticalSheets();

  return (
    <DsfrLayout>
      <ListLayout
        title="Fiches pratiques"
        description={DESCRIPTION}
        source={SOURCES.CONTRIBUTIONS}
        data={documents}
        popularDocuments={POPULAR_DOCUMENTS}
      />
    </DsfrLayout>
  );
}

const LIST_FIELDS = [
  "title",
  "source",
  "description",
  "slug",
  "breadcrumbs",
] as const;

/**
 * Fiches pratiques = contributions génériques + fiches infos (#7464). Les deux
 * types sont mêlés et triés dans l'ordre éditorial des thèmes (sous-thème puis
 * rang du contenu dans le sous-thème, comme sur la page du thème) avant le
 * regroupement par thème, qui conserve cet ordre au sein de chaque section. Un
 * document sans thème n'est pas listé (`groupByThemes`).
 */
const getPracticalSheets = async () => {
  const [contributions, informations, themes] = await Promise.all([
    fetchContributions([...LIST_FIELDS], { generic: true }),
    fetchAllInformations([...LIST_FIELDS]),
    fetchThemesRefs(),
  ]);
  const documents = sortByThemeOrder(
    [...contributions, ...informations],
    themes
  );
  return groupByThemes(documents);
};

export default Index;
