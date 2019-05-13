import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../routes";
import styled from "styled-components";

import { Container, Categories, Section, theme, Wrapper } from "@cdt/ui";
import ConventionModal from "./ConventionModal";

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
            <Categories>
              {outils.map(
                ({
                  title,
                  text,
                  icon,
                  routeName = "index",
                  slug,
                  hrefTitle
                }) => (
                  <OutilCard
                    key={`${routeName}/${slug}`}
                    data-route={routeName}
                  >
                    <Link route={routeName} params={slug ? { slug } : {}}>
                      <a title={hrefTitle}>
                        <Outil title={title} text={text} icon={icon} />
                      </a>
                    </Link>
                  </OutilCard>
                )
              )}
              <ConventionModal />
            </Categories>
          </Wrapper>
        </Container>
      </Section>
    );
  }
}

const { spacing } = theme;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${spacing.large};
`;

export const OutilCard = ({ small, ...props }) => (
  <li
    className={`categories__list-item ${(small &&
      "categories__list-item--small") ||
      ""}`}
    {...props}
  />
);
OutilCard.defaultProps = {
  small: false,
  icon: "/static/assets/icons/chat.svg"
};
const CardIcon = styled.img`
  width: 2.5rem;
  margin: 0 auto;
`;
export const Outil = ({ title, text, icon }) => (
  <React.Fragment>
    <CardIcon src={icon} alt="" />
    <h3>{title}</h3>
    <p>{text}</p>
  </React.Fragment>
);

Outil.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.string,
  small: PropTypes.bool,
  icon: PropTypes.string
};
