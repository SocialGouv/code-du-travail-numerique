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
            currentPath.startsWith("/glossaire"),
          menuLinks: [
            {
              text: "Comprendre le droit du travail",
              linkProps: {
                href: "/droit-du-travail",
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
              text: "Embauche et contrat de travail",
              linkProps: {
                href: "/themes/embauche-et-contrat-de-travail",
              },
            },
            {
              text: "Salaire et Rémunération",
              linkProps: {
                href: "/themes/salaire-et-remuneration",
              },
            },
            {
              text: "Temps de travail",
              linkProps: {
                href: "/themes/temps-de-travail",
              },
            },
            {
              text: "Congés et repos",
              linkProps: {
                href: "/themes/conges-et-repos",
              },
            },
            {
              text: "Emploi et formation professionnelle",
              linkProps: {
                href: "/themes/emploi-et-formation-professionnelle",
              },
            },
            {
              text: "Santé, sécurité et conditions de travail",
              linkProps: {
                href: "/themes/sante-securite-et-conditions-de-travail",
              },
            },
            {
              text: "Représentation du personnel et négociation collective",
              linkProps: {
                href: "/themes/representation-du-personnel-et-negociation-collective",
              },
            },
            {
              text: "Départ de l'entreprise",
              linkProps: {
                href: "/themes/depart-de-lentreprise",
              },
            },
            {
              text: "Conflits au travail et contrôle de la réglementation",
              linkProps: {
                href: "/themes/conflits-au-travail-et-controle-de-la-reglementation",
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
