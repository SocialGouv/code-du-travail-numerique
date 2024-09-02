import { Footer as FooterDsfr } from "@codegouvfr/react-dsfr/Footer";
import { PACKAGE_VERSION } from "../../config";
import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import { BrandTop } from "./BrandTop";
import { homeLinksProps } from "./common";
import { css } from "../../../styled-system/css";

export const Footer = () => {
  return (
    <FooterDsfr
      brandTop={<BrandTop />}
      homeLinkProps={homeLinksProps}
      accessibility="partially compliant"
      linkList={[
        {
          categoryName: "Code du travail numérique",
          links: [
            {
              linkProps: {
                href: "/droit-du-travail",
              },
              text: "Le droit du travail",
            },
            {
              linkProps: {
                href: "/glossaire",
              },
              text: "Glossaire",
            },
            {
              linkProps: {
                href: "/a-propos",
              },
              text: "À propos",
            },
            {
              linkProps: {
                href: "/stats",
              },
              text: "Statistiques d’utilisation",
            },
            {
              linkProps: {
                href: "/integration",
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
                href: "/outils/simulateur-embauche",
              },
              text: "Calcul du salaire brut/net",
            },
            {
              linkProps: {
                href: "/outils/indemnite-rupture-conventionnelle",
              },
              text: "Calcul de l'indemnité de rupture conventionnelle",
            },
            {
              linkProps: {
                href: "/outils/convention-collective",
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
                href: "/modeles-de-courriers/lettre-de-demission",
              },
              text: "Lettre de démission",
            },
            {
              linkProps: {
                href: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie",
              },
              text: "Rupture du contrat en période d'essai par le salarié",
            },
            {
              linkProps: {
                href: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
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
                href: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
              },
              text: "Durée du préavis de démission",
            },
            {
              linkProps: {
                href: "/contribution/les-conges-pour-evenements-familiaux",
              },
              text: "Congés pour événements familiaux",
            },
            {
              linkProps: {
                href: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
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
                href: "/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
              },
              text: "Services de l'automobile",
            },
            {
              linkProps: {
                href: "/convention-collective/3248-metallurgie",
              },
              text: "Métallurgie",
            },
            {
              linkProps: {
                href: "/convention-collective/573-commerces-de-gros",
              },
              text: "Commerce de gros",
            },
          ],
        },
      ]}
      domains={[
        "travail-emploi.gouv.fr",
        "info.gouv.fr",
        "service-public.fr",
        "legifrance.gouv.fr",
        "data.gouv.fr",
      ]}
      partnersLogos={{
        sub: [
          {
            alt: "service-public.fr, le site officiel de l'administration française",
            href: "https://www.service-public.fr/",
            imgUrl: "/static/assets/img/logo_sp_hd_rvb.png",
          },
          {
            alt: "legifrance.gouv.fr - le service public de la diffusion du droit",
            href: "https://www.legifrance.gouv.fr/",
            imgUrl: "/static/assets/img/legifrance.svg",
          },
        ],
      }}
      bottomItems={[
        {
          linkProps: {
            href: "/mentions-legales",
          },
          text: "Mentions légales",
        },
        {
          linkProps: {
            href: "/politique-confidentialite",
          },
          text: "Politique de confidentialité",
        },
        {
          linkProps: {
            href: `https://github.com/SocialGouv/code-du-travail-numerique/tree/v${PACKAGE_VERSION}`,
            rel: "noopener noreferrer",
            target: "_blank",
          },
          text: "Contribuer sur Github",
        },
        {
          linkProps: {
            href: "/plan-du-site",
          },
          text: "Plan du site",
        },
        headerFooterDisplayItem,
      ]}
      classes={{
        logo: footerLogo,
      }}
    />
  );
};

const footerLogo = css({
  boxShadow: "none !important",
});
