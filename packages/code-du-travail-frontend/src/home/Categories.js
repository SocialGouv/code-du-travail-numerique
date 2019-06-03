import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "../../routes";

import {
  Container,
  Categories as CategoriesWrapper,
  Category as CategoryItem,
  Section,
  theme,
  Wrapper
} from "@cdt/ui";

const iconsMap = {
  1: "hiring-1.svg",
  2: "coins.svg",
  3: "time.svg",
  4: "certificate.svg",
  5: "shield.svg",
  6: "handshake.svg",
  7: "file-3.svg",
  8: "book_web.svg"
};

export default class Categories extends React.Component {
  static propTypes = {
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      }).isRequired
    ),
    isRoot: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    isRoot: true,
    title: "Retrouvez nos réponses thématiques"
  };

  render() {
    const { title, themes, isRoot } = this.props;
    return (
      (themes.length && (
        <Section>
          <Container>
            <Wrapper>
              <Title>{title}</Title>
              <CategoriesWrapper>
                {themes.map(({ id, slug, label }) => (
                  <CategoryItem key={slug + label} small={!isRoot}>
                    <Link route="themes" params={{ slug: slug || "/" }}>
                      <a title={label}>
                        <Category
                          title={label}
                          icon={iconsMap[id] || undefined}
                        />
                      </a>
                    </Link>
                  </CategoryItem>
                ))}
              </CategoriesWrapper>
            </Wrapper>
          </Container>
        </Section>
      )) ||
      null
    );
  }
}

const Category = ({ title, icon }) => (
  <React.Fragment>
    <figure>
      <img src={`/static/assets/icons/${icon}`} alt={title} />
    </figure>
    <div>
      <h3>{title}</h3>
    </div>
  </React.Fragment>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Category.defaultProps = {
  icon: "profiles.svg"
};

const { spacing } = theme;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${spacing.large};
`;
