import React from "react";
import PropTypes from "prop-types";
import { Link } from "../../routes";
import { getRouteBySource, getLabelBySource } from "../sources";
import ArticleIcon from "../icons/ArticleIcon";
import styled from "styled-components";
import { LargeLink } from "@cdt/ui";

export function BigLink({ icon, query, data }) {
  const { slug, title, source, path } = data._source;
  const route = getRouteBySource(source);
  return (
    <Link route={route} params={{ q: query, search: 0, slug: slug }}>
      <LargeLink href={`/${route}/${slug}?q=${query}`} title={title}>
        <Icon as={icon} />
        <div>
          <Title>{title}</Title>
          {path.substr(1).replace(/\//g, " » ")}
          <br />
          <Source>source: {getLabelBySource(source)}</Source>
        </div>
      </LargeLink>
    </Link>
  );
}

BigLink.defaultProps = {
  icon: ArticleIcon
};
BigLink.propTypes = {
  icon: PropTypes.func
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
