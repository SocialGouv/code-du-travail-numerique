import React from "react";
import PropTypes from "prop-types";

import Section from "./Section";
import Tag from "./Tag";

import { Question, Like, Unlike } from "./icons";
import IconButton from "./IconButton";

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

Tags.propTypes = {
  tags: PropTypes.array,
  onTagClick: PropTypes.func
};

const Article = ({
  title,
  tags,
  className,
  style,
  sourceType,
  date,
  icon: Icon = Question,
  onTagClick,
  onValidate,
  onInvalidate,
  children
}) => {
  return (
    <Section light className={className} style={style}>
      <div className="article">
        <div className="article__icon">
          <Icon />
        </div>
        <div className="article__header">
          <h1 className="article__title">{title}</h1>
          <div>
            {sourceType && (
              <span className="article__document-type">{sourceType}</span>
            )}
            {date && (
              <span className="article__date">
                Mis à jour le&nbsp;:{" "}
                <span className="article__date-value">{date}</span>
              </span>
            )}
          </div>
          <div className="article__tags">
            <Tags tags={tags} onTagClick={onTagClick} />
          </div>
        </div>
        <div className="article__widget_container">
          <IconButton onClick={onValidate} title="Valider cette réponse">
            <Like style={{ paddingBottom: ".5rem" }} />
          </IconButton>
          <IconButton onClick={onInvalidate} title="Invalider cette réponse">
            <Unlike style={{ paddingTop: ".5rem" }} />
          </IconButton>
        </div>
      </div>
      {children && <div className="article__content">{children}</div>}
    </Section>
  );
};

Article.propTypes = {
  /** article title */
  title: PropTypes.string.isRequired,
  /** article content */
  children: PropTypes.node,
  date: PropTypes.string,
  sourceType: PropTypes.string,
  icon: PropTypes.func,
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
