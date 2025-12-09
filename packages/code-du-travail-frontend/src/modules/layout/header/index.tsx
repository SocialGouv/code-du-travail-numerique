"use client";

import { usePathname, useRouter } from "next/navigation";
import { HeaderDsfr } from "./HeaderDsfr";

export const Header = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const onSearchSubmit = (text: string) => {
    if (text !== "") {
      router.push(`/recherche?query=${encodeURIComponent(text)}`);
    }
  };

  return (
    <HeaderDsfr
      currentPath={currentPath}
      onSearchSubmit={onSearchSubmit}
      navigation={[
        {
          text: "Code du travail",
          isActive:
            currentPath.startsWith("/droit-du-travail") ||
            currentPath.startsWith("/glossaire") ||
            currentPath.startsWith("/quoi-de-neuf"),
          menuLinks: [
            {
              text: "Quoi de neuf sur le Code du travail numérique ?",
              linkProps: {
                href: "/quoi-de-neuf",
              },
            },
            {
              text: "Comprendre le droit du travail",
              linkProps: {
                href: "/droit-du-travail",
              },
            },
            {
              text: "Nos infographies",
              linkProps: {
                href: "/infographie",
              },
            },
            {
              text: "Glossaire",
              linkProps: {
                href: "/glossaire",
              },
            },
          ],
        },
        {
          text: "Simulateurs",
          isActive:
            currentPath === "/outils" || currentPath.startsWith("/outils/"),
          menuLinks: [
            {
              text: "Voir tous les simulateurs",
              linkProps: {
                href: "/outils",
              },
            },
            {
              text: "Indemnité de rupture conventionnelle",
              linkProps: {
                href: "/outils/indemnite-rupture-conventionnelle",
              },
            },
            {
              text: "Indemnité de licenciement",
              linkProps: {
                href: "/outils/indemnite-licenciement",
              },
            },
            {
              text: "Indemnité de précarité",
              linkProps: {
                href: "/outils/indemnite-precarite",
              },
            },
            {
              text: "Salaire brut/net",
              linkProps: {
                href: "/outils/simulateur-embauche",
              },
            },
            {
              text: "Préavis de démission",
              linkProps: {
                href: "/outils/preavis-demission",
              },
            },
          ],
        },
        {
          text: "Modèles de documents",
          isActive:
            currentPath === "/modeles-de-courriers" ||
            currentPath.startsWith("/modeles-de-courriers/"),
          menuLinks: [
            {
              text: "Voir tous les modèles par thème",
              linkProps: {
                href: "/modeles-de-courriers",
              },
            },
            {
              text: "Lettre de démission",
              linkProps: {
                href: "/modeles-de-courriers/lettre-de-demission",
              },
            },
            {
              text: "Attestation de travail",
              linkProps: {
                href: "/modeles-de-courriers/attestation-de-travail",
              },
            },
            {
              text: "Rupture du contrat en période d'essai par le salarié",
              linkProps: {
                href: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie",
              },
            },
          ],
        },
        {
          text: "Fiches pratiques",
          isActive:
            currentPath === "/contribution" ||
            currentPath.startsWith("/contribution/"),
          menuLinks: [
            {
              text: "Voir toutes les fiches par thème",
              linkProps: {
                href: "/contribution",
              },
            },
            {
              text: "Congés pour événements familiaux",
              linkProps: {
                href: "/contribution/les-conges-pour-evenements-familiaux",
              },
            },
            {
              text: "Maintien du salaire en cas d'arrêt maladie",
              linkProps: {
                href: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
              },
            },
            {
              text: "Indemnités de départ à la retraite",
              linkProps: {
                href: "/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
              },
            },
          ],
        },
        {
          text: "Par thème",
          isActive:
            currentPath === "/themes" || currentPath.startsWith("/themes/"),
          menuLinks: [
            {
              text: "Voir tous les thèmes",
              linkProps: {
                href: "/themes",
              },
            },
            {
              text: "Embauche",
              linkProps: {
                href: "/themes/embauche",
              },
            },
            {
              text: "Contrat de travail",
              linkProps: {
                href: "/themes/contrat-de-travail",
              },
            },
            {
              text: "Rémunération",
              linkProps: {
                href: "/themes/remuneration",
              },
            },
            {
              text: "Temps de travail",
              linkProps: {
                href: "/themes/temps-de-travail",
              },
            },
            {
              text: "Congés",
              linkProps: {
                href: "/themes/conges",
              },
            },
            {
              text: "Santé au travail",
              linkProps: {
                href: "/themes/sante-au-travail",
              },
            },
            {
              text: "Fin et rupture du contrat",
              linkProps: {
                href: "/themes/fin-et-rupture-du-contrat",
              },
            },
            {
              text: "Retraite",
              linkProps: {
                href: "/themes/retraite",
              },
            },
            {
              text: "Particuliers employeurs",
              linkProps: {
                href: "/themes/particulier-employeur",
              },
            },
          ],
        },
        {
          text: "Conventions collectives",
          linkProps: {
            href: "/convention-collective",
          },
          isActive:
            currentPath === "/convention-collective" ||
            currentPath.startsWith("/convention-collective/"),
        },
      ]}
    />
  );
};
