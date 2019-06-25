import React from "react";
import { Link } from "../../routes";
import styled from "styled-components";

import {
  Container,
  Grid,
  Category,
  GridCell,
  Section,
  theme,
  Wrapper
} from "@cdt/ui";

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
    icon: "/static/assets/icons/book_web.svg",
    title: "Conventions collectives",
    hrefTitle: "Trouvez simplement la convention collective dont vous dépendez",
    text: "Trouvez simplement la convention collective dont vous dépendez",
    routeName: "liste-conventions",
    slug: "liste-conventions-collectives"
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
          <Wrapper>
            <Title>{title}</Title>
            <Grid>
              {outils.map(
                ({
                  title,
                  text,
                  icon,
                  routeName = "index",
                  slug,
                  hrefTitle
                }) => (
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
            </Grid>
          </Wrapper>
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
