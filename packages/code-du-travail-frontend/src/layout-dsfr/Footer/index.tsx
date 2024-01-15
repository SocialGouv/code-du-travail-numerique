import { Footer as FooterDsfr } from "@codegouvfr/react-dsfr/Footer";

export const Footer = () => {
  return (
    <FooterDsfr
      accessibility="partially compliant"
      contentDescription=""
      license={"Ma super licence !"}
      brandTop={
        <>
          MINISTÈRE
          <br />
          DU TRAVAIL,
          <br />
          DU PLEIN EMPLOI
          <br />
          ET DE L&apos;INSERTION FRANÇAISE
        </>
      }
      termsLinkProps={{
        href: "#",
      }}
      websiteMapLinkProps={{
        href: "#",
      }}
      homeLinkProps={{ title: "#", href: "#" }}
      linkList={[
        {
          categoryName: "Code du travail numérique",
          links: [
            {
              linkProps: {
                href: "#",
              },
              text: "Le droit du travail",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Glossaire",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "À propos",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Statistiques d’utilisation",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Intégrer les outils du Code du travail numérique",
            },
          ],
        },
        {
          categoryName: "Outils populaires",
          links: [
            {
              linkProps: {
                href: "#",
              },
              text: "Calcul du salaire brut/net",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Calcul de l'indemnité de licenciement",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Trouver sa convention collective",
            },
          ],
        },
        {
          categoryName: "Modèles populaires",
          links: [
            {
              linkProps: {
                href: "#",
              },
              text: "Lettre de démission",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Rupture du contrat en période d'essai par le salarié",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Convocation à un entretien préalable au licenciement pour motif personnel",
            },
          ],
        },
        {
          categoryName: "Fiches pratiques populaires",
          links: [
            {
              linkProps: {
                href: "#",
              },
              text: "Durée du préavis de démission",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Congés pour événements familiaux",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Maintien du salaire en cas d'arrêt maladie",
            },
          ],
        },
        {
          categoryName: "Conventions collectives populaires",
          links: [
            {
              linkProps: {
                href: "#",
              },
              text: "Services de l'automobile",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Métallurgie",
            },
            {
              linkProps: {
                href: "#",
              },
              text: "Commerce de gros",
            },
          ],
        },
      ]}
    />
  );
};
