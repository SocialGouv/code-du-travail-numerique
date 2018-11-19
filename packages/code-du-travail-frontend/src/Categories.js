import React from "react";
import { Link } from "../routes";

import { Container, Categories } from "@cdt/ui";

import themes from "../../code-du-travail-data/dataset/themes-front.json";

const Category = ({
  title,
  text,
  slug,
  small = false,
  icon = "/static/assets/icons/chat.svg"
}) => (
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

class _Categories extends React.Component {
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
          <Categories>
            {themes.map(theme => (
              <Category
                key={theme.slug + theme.title}
                small={!isRoot}
                {...theme}
              />
            ))}
          </Categories>
          <br />
          <br />
        </Container>
      )) ||
      null
    );
  }
}

_Categories.defaultProps = {
  themes,
  isRoot: true,
  title: "Retrouvez nos réponses thématiques"
};

export default _Categories;
