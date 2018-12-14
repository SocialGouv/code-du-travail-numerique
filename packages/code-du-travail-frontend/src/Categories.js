import React from "react";
import PropTypes from "prop-types";
import { Link } from "../routes";

import { Container, Categories as CategoriesWrapper } from "@cdt/ui";

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
        <Container>
          {title && (
            <h2
              style={{ marginTop: 20, marginBottom: 40, textAlign: "center" }}
            >
              {title}
            </h2>
          )}
          <CategoriesWrapper>
            {themes.map(theme => (
              <Category
                key={theme.slug + theme.title}
                small={!isRoot}
                {...theme}
              />
            ))}
          </CategoriesWrapper>
          <br />
          <br />
        </Container>
      )) ||
      null
    );
  }
}

const Category = ({ title, text, slug, small, icon }) => (
  <li
    className={`categories__list-item ${(small &&
      "categories__list-item--small") ||
      ""}`}
  >
    <Link route="theme" params={{ slug: slug || "/" }}>
      <a title={title}>
        <figure>
          <img src={icon} alt={title} />
        </figure>
        <div className="categories__list-item-content">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </a>
    </Link>
  </li>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  small: PropTypes.bool,
  icon: PropTypes.string
};
Category.defaultProps = {
  small: false,
  icon: "/static/assets/icons/chat.svg"
};
