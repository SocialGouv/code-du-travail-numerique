import React from "react";
import { Link } from "../../routes";
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

const outils = [
  {
    icon: "/static/assets/icons/point-of-service_web.svg",
    title: "Calculateur d'indemnités de licenciements",
    hrefTitle: "Démarrer une simulation ",
    text:
      "Calculez simplement le montant d'une indemnité de licenciement en fonction de votre situation",
    routeName: "outils",
    slug: "indemnite-licenciement"
  },
  {
    icon: "/static/assets/icons/message_web.svg",
    title: "Modèles de courriers",
    hrefTitle: "Voir tous les modèles de courriers",
    text:
      "Utilisez des modèles pré-remplis pour vos courriers liés au droit du travail",
    routeName: "modeles"
  },
  {
    icon: "/static/assets/icons/salary_web.svg",
    title: "Simulateur d'embauche",
    hrefTitle: "Voir tous les modèles de courriers",
    text: "Estimez le salaire lors d'une embauche : total employeur, brut, net",
    routeName: "outils",
    slug: "simulateur-embauche"
  },
  {
    icon: "/static/assets/icons/coins.svg",
    title: "Prime de précarité",
    hrefTitle: "Calculez la prime de précarité",
    text: "Simulez la prime de précarité d’un salarié.",
    routeName: "outils",
    slug: "indemnite-precarite"
  }
];

export default class Outils extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {
    title: "Découvrez nos outils"
  };

  render() {
    const { title } = this.props;
    return (
      <Section variant="white">
        <Container>
          <Title>{title}</Title>
          <Grid>
            {outils.map(
              ({ title, text, icon, routeName = "index", slug, hrefTitle }) => (
                <GridCell key={`${routeName}/${slug}`}>
                  <Link
                    route={routeName}
                    params={slug ? { slug } : {}}
                    passHref
                  >
                    <Tile title={hrefTitle}>
                      <Category title={title} text={text} icon={icon} />
                    </Tile>
                  </Link>
                </GridCell>
              )
            )}
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
  }
}

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
