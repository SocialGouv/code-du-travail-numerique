import { SkipLinks as DsfrSkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";

export const SkipLinks = () => (
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
        anchor: "#fr-header-search-input",
        label: "Recherche",
      },
      {
        anchor: "#more-info",
        label: "Pied de page",
      },
    ]}
  />
);
