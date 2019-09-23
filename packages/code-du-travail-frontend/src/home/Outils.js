import React from "react";
import Link from "next/link";
import styled from "styled-components";

import {
  Container,
  Grid,
  Category,
  GridCell,
  Section,
  theme
} from "@cdt/ui-old";
import ConventionModal from "../conventions/Search/Modal";

export const outils = [
  {
    icon: "/static/assets/icons/point-of-service_web.svg",
    title: "Simulateur d'indemnités de licenciements",
    hrefTitle: "Démarrer une simulation ",
    text:
      "Simulez simplement le montant d'une indemnité de licenciement en fonction de votre situation",
    href: "/outils/[slug]",
    slug: "/outils/indemnite-licenciement"
  },
  {
    icon: "/static/assets/icons/message_web.svg",
    title: "Modèles de courriers",
    hrefTitle: "Voir tous les modèles de courriers",
    text:
      "Utilisez des modèles pré-remplis pour vos courriers liés au droit du travail",
    href: "/modeles-de-courriers"
  },
  {
    icon: "/static/assets/icons/salary_web.svg",
    title: "Simulateur d'embauche",
    hrefTitle: "Voir tous les modèles de courriers",
    text: "Estimez le salaire lors d'une embauche : total employeur, brut, net",
    href: "/outils/[slug]",
    slug: "/outils/simulateur-embauche"
  },
  {
    icon: "/static/assets/icons/coins.svg",
    title: "Prime de précarité",
    hrefTitle: "Calculez la prime de précarité",
    text: "Simulez la prime de précarité d’un salarié.",
    href: "/outils/[slug]",
    slug: "/outils/indemnite-precarite"
  }
];

const Outils = ({ title }) => (
  <Section variant="white">
    <Container>
      <Title>{title}</Title>
      <Grid>
        {outils.map(({ title, text, icon, href, slug, hrefTitle }) => (
          <GridCell key={slug || href}>
            <Link href={href} as={slug} passHref>
              <Tile title={hrefTitle}>
                <Category title={title} text={text} icon={icon} />
              </Tile>
            </Link>
          </GridCell>
        ))}
        <GridCell>
          <ConventionModal />
        </GridCell>
        <GridCell>
          <Tile>
            <Category
              title="Prochainement"
              text="Bientôt d'autres outils disponibles..."
              icon="/static/assets/icons/time.svg"
            />
          </Tile>
        </GridCell>
      </Grid>
    </Container>
  </Section>
);

Outils.defaultProps = {
  title: "Découvrez nos outils"
};

export default React.memo(Outils);

const { box, spacing, colors } = theme;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${spacing.large};
`;

const Tile = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;
  border-radius: ${box.borderRadius};
  & > * {
    transition: all 0.2s ease;
  }
  :focus > *,
  :active > *,
  :hover > * {
    transform: scale(1.1);
    border: 1px solid ${colors.focus};
    box-shadow: 0 0 2px 2px ${colors.focusShadow};
  }
`;
