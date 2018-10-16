import React from "react";
import PropTypes from "prop-types";

import { Section, Tag } from ".";

import { Question, Like, Unlike } from "./icons";

const Tags = ({ tags, onTagClick }) => (
  <React.Fragment>
    {tags.map(tag => (
      <Tag
        key={tag}
        style={{ cursor: "pointer" }}
        onClick={() => onTagClick(tag)}
      >
        {tag}
      </Tag>
    ))}
  </React.Fragment>
);

const Article = ({
  title,
  tags,
  className,
  style,
  onTagClick,
  onValidate,
  onInvalidate,
  children
}) => (
  <Section light className={className} style={style}>
    <div className="article">
      <div className="article__icon">
        <Question fill="#aaa" />
      </div>
      <div className="article__header">
        <div className="article__title">{title}</div>
        <div className="article__tags">
          <Tags tags={tags} onTagClick={onTagClick} />
        </div>
      </div>
      <div className="article__widget_container" style={{}}>
        <Like
          onClick={onValidate}
          style={{
            marginRight: 10,
            width: 30,
            height: 30,
            verticalAlign: "top"
          }}
          title="Valider cette réponse"
          fill="#aaa"
        />
        <Unlike
          onClick={onInvalidate}
          style={{ marginTop: 10, width: 30, height: 30, verticalAlign: "top" }}
          title="Invalider cette réponse"
          fill="#aaa"
        />
      </div>
    </div>
    <div className="article__content">{children}</div>
  </Section>
);

Article.propTypes = {
  /** article title */
  title: PropTypes.string.isRequired,
  /** article content */
  children: PropTypes.element,
  /** list of tags */
  tags: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
  /** when user clicks some tag */
  onTagClick: PropTypes.func,
  /** when user validates the content */
  onValidate: PropTypes.func,
  /** when user invalidates the content */
  onInvalidate: PropTypes.func
};

Article.defaultProps = {
  tags: []
};

export default Article;
