import { SkipLinks as DsfrSkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";
import { useState, useEffect } from "react";

const getSearchAnchor = () => {
  const desktop = document.getElementById("fr-header-search-button-desktop");
  return desktop && desktop.offsetParent !== null
    ? "#fr-header-search-button-desktop"
    : "#fr-header-search-button";
};

export const SkipLinks = () => {
  const [searchAnchor, setSearchAnchor] = useState("#fr-header-search-button");

  useEffect(() => {
    const updateAnchor = () => setSearchAnchor(getSearchAnchor());
    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    return () => window.removeEventListener("resize", updateAnchor);
  }, []);

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
          anchor: searchAnchor,
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
