import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../routes";
import { getRouteBySource, getLabelBySource } from "../sources";
import ArticleIcon from "../icons/ArticleIcon";
import styled from "styled-components";

export function BigLink({ icon, query, data }) {
  const { slug, title, source, path = "" } = data._source;
  const route = getRouteBySource(source);
  return (
    <Link route={route} params={{ q: query, search: "0", slug: slug }}>
      <a className="btn-large">
        <Icon as={icon} />
        <div>
          <Title>{title}</Title>
          {path && path.substr(1).replace(/\//g, " » ")}
          <br />
          <Source>source: {getLabelBySource(source)}</Source>
        </div>
      </a>
    </Link>
  );
}

BigLink.defaultProps = {
  icon: ArticleIcon,
  query: "",
  data: {
    _source: {
      slug: "source/article-slug",
      title: "article title",
      source: "source",
      path: "/path/to/document"
    }
  }
};
BigLink.propTypes = {
  icon: PropTypes.func,
  query: PropTypes.string,
  data: PropTypes.shape({
    _source: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  })
};

const Icon = styled.svg`
  width: 2em;
  margin-right: 1em;
`;
const Title = styled.strong`
  display: block;
  text-decoration: none;
`;

const Source = styled.span`
  font-weight: 700;
  color: #8393a7;
`;
