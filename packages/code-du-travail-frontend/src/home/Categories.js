import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../routes";

import {
  Container,
  Categories as CategoriesWrapper,
  Category as CategoryItem
} from "@cdt/ui";

import themes from "@cdt/data/dataset/themes-front.json";

export default class Categories extends React.Component {
  static propTypes = {
    themes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        slug: PropTypes.arrayOf(PropTypes.string).isRequired,
        icon: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ),
    isRoot: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    themes,
    isRoot: true,
    title: "Retrouvez nos réponses thématiques"
  };

  render() {
    const { title, themes, isRoot } = this.props;
    return (
      (themes.length && (
        <section>
          <Container>
            {title && (
              <h2
                style={{ marginTop: 20, marginBottom: 40, textAlign: "center" }}
              >
                {title}
              </h2>
            )}
            <CategoriesWrapper>
              {themes.map(({ slug, title, text, icon }) => (
                <CategoryItem key={slug + title} small={!isRoot}>
                  <Link route="theme" params={{ slug: slug || "/" }}>
                    <a title={title}>
                      <Category title={title} text={text} icon={icon} />
                    </a>
                  </Link>
                </CategoryItem>
              ))}
            </CategoriesWrapper>
          </Container>
        </section>
      )) ||
      null
    );
  }
}

const Category = ({ title, text, icon }) => (
  <React.Fragment>
    <figure>
      <img src={icon} alt={title} />
    </figure>
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </React.Fragment>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string
};
Category.defaultProps = {
  icon: "/static/assets/icons/chat.svg"
};
