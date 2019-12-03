import React from "react";
import Link from "next/link";

import { Container, Section, CardList, Tile } from "@socialgouv/react-ui";

export const outils = [
  {
    title: "Modèles de courriers",
    hrefTitle: "Consulter tous les modèles de courriers",
    button: "Consulter",
    text:
      "Utilisez des modèles pré-remplis pour vos courriers liés au droit du travail",
    href: "/modeles-de-courriers"
  },
  {
    title: "Conventions collectives",
    hrefTitle: "Recherchez votre convention collective",
    button: "Consulter",
    text:
      "Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC.",
    href: "/convention-collective/recherche"
  },
  {
    title: "Simulateur d'embauche",
    hrefTitle: "Démarrer une simulation de salaire lors d'une embauche",
    button: "Démarrer",
    text: "Estimez le salaire lors d'une embauche : total employeur, brut, net",
    href: "/outils/[slug]",
    slug: "/outils/simulateur-embauche"
  },
  {
    title: "Simulateur de durée de préavis de démission",
    hrefTitle: "Démarrer une simulation de durée de préavis de démission",
    button: "Démarrer",
    text: "Connaître la durée du préavis de démission.",
    href: "/outils/[slug]",
    slug: "/outils/preavis-demission"
  },
  {
    title: "Simulateur d'indemnités de licenciements",
    hrefTitle: "Démarrer une simulation d'indemnités de licenciements",
    button: "Démarrer",
    text:
      "Simulez simplement le montant d'une indemnité de licenciement en fonction de votre situation",
    href: "/outils/[slug]",
    slug: "/outils/indemnite-licenciement"
  },
  {
    title: "Simulateur de durée de préavis de licenciement",
    hrefTitle: "Démarrer une simulation de durée de préavis de licenciement",
    button: "Démarrer",
    text:
      "Estimez simplement la durée du préavis dans le cadre d'un licenciement",
    href: "/outils/[slug]",
    slug: "/outils/preavis-licenciement"
  },
  {
    title: "Simulation de l'indemnité de précarité",
    hrefTitle: "Démarrer une simulation de l'indemnnité de précarité",
    button: "Démarrer",
    text: "Simulez l'indemnité de précarité d’un salarié.",
    href: "/outils/[slug]",
    slug: "/outils/indemnite-precarite"
  }
];

function Outils() {
  return (
    <Section>
      <Container>
        <CardList
          title="Boîte à outils"
          desc="Trouvez des réponses personnalisées selon votre situation"
          href="/outils"
        >
          {outils
            .map(({ text, title, href, slug }) => (
              <Link href={href} as={slug} passHref key={slug || "modeles"}>
                <Tile custom title={title}>
                  {text}
                </Tile>
              </Link>
            ))
            .concat(
              <Tile
                title="Bientôt d’autres outils disponibles..."
                key="next-tools"
              ></Tile>
            )}
        </CardList>
      </Container>
    </Section>
  );
}

export default React.memo(Outils);
