import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { FooterList } from "./FooterList";

export const FooterTop = () => {
  const sections = [
    {
      links: [
        { href: "/droit-du-travail", label: "Le droit du travail" },
        { href: "/glossaire", label: "Glossaire" },
        { href: "/a-propos", label: "À propos" },
        { href: "/stats", label: "Statistiques d'utilisation" },
        {
          href: "/integration",
          label: "Intégrer les outils du Code du travail numérique",
        },
      ],
      title: "Code du travail numérique",
    },
    {
      links: [
        {
          href: "/outils/simulateur-embauche",
          label: "Calcul du salaire brut/net",
        },
        {
          href: "/outils/indemnite-rupture-conventionnelle",
          label: "Calcul de l'indemnité de rupture conventionnelle",
        },
        {
          href: "/outils/convention-collective",
          label: "Trouver sa convention collective",
        },
      ],
      title: "Outils populaires",
    },
    {
      links: [
        {
          href: "/modeles-de-courriers/lettre-de-demission",
          label: "Lettre de démission",
        },
        {
          href: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie",
          label: "Rupture du contrat en période d'essai par le salarié",
        },
        {
          href: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
          label:
            "Convocation à un entretien préalable au licenciement pour motif personnel",
        },
      ],
      title: "Modèles populaires",
    },
    {
      links: [
        {
          href: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
          label: "Durée du préavis de démission",
        },
        {
          href: "/contribution/les-conges-pour-evenements-familiaux",
          label: "Congés pour événements familiaux",
        },
        {
          href: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
          label: "Maintien du salaire en cas d'arrêt maladie",
        },
      ],
      title: "Fiches pratiques populaires",
    },
    {
      links: [
        {
          href: "/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
          label: "Services de l'automobile",
        },
        {
          href: "/convention-collective/3248-metallurgie",
          label: "Métallurgie",
        },
        {
          href: "/convention-collective/573-commerces-de-gros",
          label: "Commerce de gros",
        },
      ],
      title: "Conventions collectives populaires",
    },
  ];

  return (
    <div className={fr.cx("fr-footer__top")}>
      <div className={fr.cx("fr-container")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          {sections.map((section, index) => (
            <FooterList
              key={index}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
