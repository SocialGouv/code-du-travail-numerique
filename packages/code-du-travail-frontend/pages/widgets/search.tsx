import Metas from "../../src/common/Metas";
import { useIframeResizer } from "../../src/common/hooks";
import { SITE_URL } from "../../src/config";
import { SearchWidget } from "../../src/search/SearchWidget";

function Widgets(): JSX.Element {
  useIframeResizer();

  return (
    <>
      <Metas
        title="Recherche - Code du travail numérique"
        description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
        overrideCanonical={SITE_URL + "/search"}
      />
      <SearchWidget />
    </>
  );
}

export default Widgets;
