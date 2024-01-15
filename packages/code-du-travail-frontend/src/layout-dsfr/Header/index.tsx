import { Header as HeaderDsfr } from "@codegouvfr/react-dsfr/Header";

export const Header = ({ currentPage = "" }) => {
  return (
    <HeaderDsfr
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
      id="fr-header-header-with-vertical-operator-logo"
      onSearchButtonClick={function noRefCheck(){}}
      operatorLogo={{
        alt: '[À MODIFIER - texte alternatif de l’image]',
        imgUrl: 'https://travail-emploi.gouv.fr/IMG/logo/arton377668.png?1581441256',
        orientation: 'horizontal'
      }}
      navigation={[
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Boîte à outils",
        },
        {
          isActive: true,
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Modèles de documents",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Vos fiches pratiques",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Votre convention collective",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "Thèmes",
        },
      ]}
    />
  );
};
