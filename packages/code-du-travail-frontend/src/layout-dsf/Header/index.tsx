import { Header as DsfrHeader } from "@codegouvfr/react-dsfr/Header";
import React from "react";

export const Header = () => {
  return (
    <DsfrHeader
      brandTop={
        <>
          RÉPUBLIQUE
          <br />
          FRANÇAISE
        </>
      }
      homeLinkProps={{
        href: "/",
        title:
          "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
      }}
      id="fr-header-with-horizontal-operator-logo"
      operatorLogo={{
        alt: "[À MODIFIER - texte alternatif de l’image]",
        imgUrl: "/static/assets/img/logo-cdtn.jpg",
        orientation: "horizontal",
      }}
      onSearchButtonClick={function noRefCheck(){}}
      /*





       */
      navigation={[
        {
          linkProps: {
            href: "/outils",
            target: "_self",
          },
          text: "Boîte à outils",
        },
        {
          isActive: true,
          linkProps: {
            href: "/modeles-de-courriers",
            target: "_self",
          },
          text: "Modèles de documents",
        },
        {
          linkProps: {
            href: "/contribution",
            target: "_self",
          },
          text: "Vos fiches pratiques",
        },
        {
          linkProps: {
            href: "/convention-collective",
            target: "_self",
          },
          text: "Votre convention collective",
        },
        {
          linkProps: {
            href: "/themes",
            target: "_self",
          },
          text: "Thèmes",
        },
      ]}
    />
  );
};
