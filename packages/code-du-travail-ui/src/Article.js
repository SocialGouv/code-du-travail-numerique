import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { ThumbsUp, ThumbsDown, MessageSquare } from "react-feather";
import { Section, Tag } from ".";

const RateContainer = styled.div`
  flex: 0 0 130px;
  border: 1px solid silver;
  padding: 10px;
  border-radius: 3px;
  background: #eee;
  text-align: center;
  svg {
    vertical-align: middle;
    stroke: #aaa;
    cursor: pointer;
  }
  svg:hover {
    stroke: white;
  }
`;

const ArticleRate = ({ onValidate, onInvalidate }) => (
  <RateContainer>
    <ThumbsUp
      onClick={onValidate}
      size="36"
      style={{ marginRight: 20 }}
      title="Valider cette réponse"
    />
    <ThumbsDown
      onClick={onInvalidate}
      size="36"
      title="Invalider cette réponse"
    />
  </RateContainer>
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
  <Section light>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100% + 40px)",
        alignItems: "flex-start",
        marginTop: 20
      }}
    >
      <div style={{ flex: "0 0 100px", textAlign: "center" }}>
        <MessageSquare color="#aaa" size="45" style={{ marginTop: 10 }} />
      </div>
      <div style={{ flex: "1 0 auto", flexShrink: 1, paddingRight: 20 }}>
        <h2 style={{ fontSize: "2.5rem", lineHeight: "3rem" }}>{title}</h2>
        <div style={{ marginLeft: -10 }}>
          {tags.map(tag => (
            <Tag
              key={tag}
              style={{ cursor: "pointer" }}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <ArticleRate onValidate={onValidate} onInvalidate={onInvalidate} />
    </div>

    <div style={{ margin: "20px 130px 20px 100px", textAlign: "justify" }}>
      {children}
    </div>
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
