import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { SITE_URL } from "../../../src/config";
import { SearchWidgetDisplay } from "src/modules/recherche";

export async function generateMetadata() {
  return generateDefaultMetadata({
    title: "Recherche - Code du travail numérique",
    description:
      "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités).",
    path: `${SITE_URL}/widgets/recherche`,
    overrideCanonical: `${SITE_URL}/recherche`,
  });
}

async function SearchWidget() {
  return <SearchWidgetDisplay />;
}

export default SearchWidget;
