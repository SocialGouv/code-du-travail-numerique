"use client";

import { usePathname, useRouter } from "next/navigation";
import { HeaderDsfr } from "./HeaderDsfr";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onSearchSubmit = (query: string) => {
    if (query.trim()) router.push(`/recherche?query=${encodeURIComponent(query)}`);
  };

  const navigation = [
    {
      text: "Code du travail",
      linkProps: { href: "/code-du-travail" },
      isActive: pathname?.startsWith("/code-du-travail"),
      links: [
        { text: "Quoi de neuf sur le code du travail ?", linkProps: { href: "/code-du-travail/quoi-de-neuf" } },
        { text: "Comprendre le droit du travail", linkProps: { href: "/code-du-travail/comprendre-le-droit" } },
        { text: "Nos infographies", linkProps: { href: "/code-du-travail/infographies" } },
        { text: "Glossaire", linkProps: { href: "/code-du-travail/glossaire" } },
      ],
    },
    {
      text: "Simulateurs",
      linkProps: { href: "/simulateurs" },
      isActive: pathname?.startsWith("/simulateurs"),
      links: [
        { text: "Voir tous les simulateurs", linkProps: { href: "/outils" } },
        { text: "Indemnité de rupture conventionnelle", linkProps: { href: "/outils/indemnite-rupture-conventionnelle" } },
        { text: "Indemnité de licenciement", linkProps: { href: "/outils/indemnite-licenciement" } },
        { text: "Indemnité de précarité", linkProps: { href: "/outils/indemnite-precarite" } },
        { text: "Salaire brut/net", linkProps: { href: "/outils/simulateur-embauche" } },
        { text: "Préavis de démission", linkProps: { href: "/outils/preavis-demission" } },
      ],
    },
    {
      text: "Modèles",
      linkProps: { href: "/modeles-de-documents" },
      isActive: pathname?.startsWith("/modeles-de-documents"),
      links: [
        { text: "Voir tous les modèles par thème", linkProps: { href: "/modeles-de-courriers" } },
        { text: "Lettre de démission", linkProps: { href: "/modeles-de-documents/lettre-demission" } },
        { text: "Attestation de travail", linkProps: { href: "/modeles-de-documents/attestation-travail" } },
        { text: "Rupture du contrat en période d'essai par le salarié", linkProps: { href: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie" } },
      ],
    },
    {
      text: "Fiches pratiques",
      linkProps: { href: "/fiches-pratiques" },
      isActive: pathname?.startsWith("/fiches-pratiques"),
      links: [
        { text: "Congés pour événements familiaux", linkProps: { href: "/contribution/les-conges-pour-evenements-familiaux" } },
        { text: "Maintien du salaire en cas d'arrêt maladie", linkProps: { href: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire" } },
        { text: "Indemnités de départ à la retraite", linkProps: { href: "/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite" } },
      ],
    },
    {
      text: "Par thème",
      linkProps: { href: "/themes" },
      isActive: pathname?.startsWith("/themes"),
      links: [
        { text: "Embauche et contrat de travail", linkProps: { href: "/themes/embauche-et-contrat-de-travail" } },
        { text: "Salaire et Rémunération", linkProps: { href: "/themes/salaire-et-remuneration" } },
        { text: "Temps de travail", linkProps: { href: "/themes/temps-de-travail" } },
        { text: "Congés et repos", linkProps: { href: "/themes/conges-et-repos" } },
        { text: "Emploi et formation professionnelle", linkProps: { href: "/themes/emploi-et-formation-professionnelle" } },
        { text: "Santé, sécurité et conditions de travail", linkProps: { href: "/themes/sante-securite-et-conditions-de-travail" } },
        { text: "Représentation du personnel et négociation collective", linkProps: { href: "/themes/representation-du-personnel-et-negociation-collective" } },
        { text: "Départ de l’entreprise", linkProps: { href: "/themes/depart-de-lentreprise" } },
        { text: "Conflits au travail et contrôle de la réglementation", linkProps: { href: "/themes/conflits-au-travail-et-controle-de-la-reglementation" } },
      ],
    },
    {
      text: "Conventions collectives",
      linkProps: { href: "/conventions-collectives" },
      isActive: pathname?.startsWith("/conventions-collectives"),
      links: [
        { text: "BTP", linkProps: { href: "/conventions-collectives/btp" } },
        { text: "Commerce", linkProps: { href: "/conventions-collectives/commerce" } },
      ],
    },
  ];

  return <HeaderDsfr navigation={navigation} onSearchSubmit={onSearchSubmit} />;
};
