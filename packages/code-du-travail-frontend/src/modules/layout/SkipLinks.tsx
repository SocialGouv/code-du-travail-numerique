import { SkipLinks as DsfrSkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";
import { useABTestVariant } from "src/modules/utils/useABTestVariant";
import { ABTesting, ABTestVariant } from "../config/initABTesting";
import { useBreakpoints } from "../common/useBreakpoints";

export const SkipLinks = () => {
  const variant = useABTestVariant(ABTesting.SEARCH);
  const { isBelow } = useBreakpoints();

  return (
    <DsfrSkipLinks
      links={[
        {
          anchor: "#main",
          label: "Contenu",
        },
        {
          anchor: "#fr-header-main-navigation",
          label: "Menu",
        },
        {
          anchor:
            variant === ABTestVariant.SEARCH_V2
              ? isBelow("lg")
                ? "#fr-header-search-button"
                : "#fr-header-search-button-desktop"
              : "#fr-header-search-input",
          label: "Recherche",
        },
        {
          anchor: "#more-info",
          label: "Pied de page",
        },
      ]}
    />
  );
};
