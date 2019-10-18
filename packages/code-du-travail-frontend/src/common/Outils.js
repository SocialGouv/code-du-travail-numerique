import React from "react";
import Link from "next/link";

import { Container, Section, CardList, Tile } from "@socialgouv/react-ui";

import ConventionModal from "../conventions/Search/Modal";

export const outils = [
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
    title: "Simulateur de délais de préavis de démission",
    hrefTitle: "Démarrer une simulation de durée de préavis de démission",
    button: "Démarrer",
    text: "Connaître la durée du préavis de démission.",
    href: "/outils/[slug]",
    slug: "/outils/preavis-demission"
  },
  {
    title: "Modèles de courriers",
    hrefTitle: "Consulter tous les modèles de courriers",
    button: "Consulter",
    text:
      "Utilisez des modèles pré-remplis pour vos courriers liés au droit du travail",
    href: "/modeles-de-courriers"
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
    title: "Simulateur de prime de précarité",
    hrefTitle: "Démarrer une simulation de la prime de précarité",
    button: "Démarrer",
    text: "Simulez la prime de précarité d’un salarié.",
    href: "/outils/[slug]",
    slug: "/outils/indemnite-precarite"
  }
];

function Outils() {
  return (
    <Section variant="white">
      <Container>
        <CardList
          title="Boîte à outils"
          desc="Trouvez des réponses personnalisées selon votre situation"
          href="/outils"
        >
          {outils
            .map(({ button, title, href, slug, hrefTitle }) => (
              <Link href={href} as={slug} passHref key={slug || "modeles"}>
                <Tile button={button} title={hrefTitle}>
                  {title}
                </Tile>
              </Link>
            ))
            .concat([
              <ConventionModal key="convention-modal" />,
              <Tile key="next-tools">
                Bientôt d’autres outils disponibles...
              </Tile>
            ])}
        </CardList>
      </Container>
    </Section>
  );
}

export default React.memo(Outils);
