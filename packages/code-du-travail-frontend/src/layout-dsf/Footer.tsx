import { Footer as DsfrFooter } from "@codegouvfr/react-dsfr/Footer";
import React from "react";

const Footer = (): JSX.Element => {
  return (
    <DsfrFooter
      accessibility="fully compliant"
      contentDescription="
    Ce message est à remplacer par les informations de votre site.

    Comme exemple de contenu, vous pouvez indiquer les informations
    suivantes : Le site officiel d’information administrative pour les entreprises.
    Retrouvez toutes les informations et démarches administratives nécessaires à la création,
    à la gestion et au développement de votre entreprise.
    "
      termsLinkProps={{
        href: "#",
      }}
      websiteMapLinkProps={{
        href: "#",
      }}
    />
  );
};

export default Footer;
