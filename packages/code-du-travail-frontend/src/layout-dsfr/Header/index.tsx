import { Header as HeaderDsfr } from "@codegouvfr/react-dsfr/Header";

export const Header = ({ currentPage = "" }) => {
  return (
    <HeaderDsfr
      brandTop={
        <>
          INTITULE
          <br />
          OFFICIEL
        </>
      }
      homeLinkProps={{
        href: "/",
        title:
          "Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)",
      }}
      id="fr-header-simple-header"
      navigation={[
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "accès direct",
        },
        {
          isActive: true,
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "accès direct",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "accès direct",
        },
        {
          linkProps: {
            href: "#",
            target: "_self",
          },
          text: "accès direct",
        },
      ]}
    />
  );
};
