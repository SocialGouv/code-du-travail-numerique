import { SkipLinks as DsfrSkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";
import { useBreakpoints } from "../common/useBreakpoints";

export const SkipLinks = () => {
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
          anchor: isBelow("lg")
            ? "#fr-header-search-button"
            : "#fr-header-search-button-desktop",
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
