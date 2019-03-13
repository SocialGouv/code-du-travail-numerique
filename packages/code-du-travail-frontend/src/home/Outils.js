import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../routes";
import styled from "styled-components";

import { Container, Categories } from "@cdt/ui";
import ConventionModal from "./ConventionModal";

const outils = [
  {
    icon: "/static/assets/icons/point-of-service_web.svg",
    title: "calculateur d'indemnités de licenciements",
    hrefTitle: "Démarrer une simulation ",
    text:
      "Calculez simplement le montant d'une indemnité de licenciement en fonction de votre situation",
    slug: "/outils/indemnite-licenciement"
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
      <section className="section-white">
        <Container>
          <Title>{title}</Title>
          <Wrapper>
            {outils.map(({ title, text, icon, slug, hrefTitle }) => (
              <OutilCard key={slug}>
                <Link href={slug}>
                  <a title={hrefTitle}>
                    <Outil title={title} text={text} icon={icon} />
                  </a>
                </Link>
              </OutilCard>
            ))}
            <ConventionModal />
          </Wrapper>
        </Container>
      </section>
    );
  }
}

const Title = styled.h2`
  margin-bottom: 40px;
  text-align: center;
`;
const Wrapper = styled(Categories)`
  justify-content: center;
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

export const Outil = ({ title, text, icon }) => (
  <React.Fragment>
    <figure>
      <img src={icon} alt="" />
    </figure>
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
