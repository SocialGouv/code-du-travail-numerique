import React from "react";
import PropTypes from "prop-types";
import SummaryItem from "./SummaryItem";
import styled from "styled-components";
import TocListItem from "./TocListItem";
import TocList from "./TocList";

const SummaryTitle = ({ type, data, children, expanded, onToggleExpanded }) => {
  const { id, titre } = data;

  if (!children || children.length == 0) {
    return (
      <TocListItem type={type} id={id} level={0}>
        <TitleLink id={id}>{titre}</TitleLink>
      </TocListItem>
    );
  }
  return (
    <TocListItem type={type} id={id} level={0}>
      <TitleLink
        id={id}
        onClick={e => {
          e.preventDefault();
          onToggleExpanded(id, !expanded);
        }}
      >
        {titre}&nbsp;{expanded ? "▲" : "▼"}
      </TitleLink>
      <TocList>
        {children.map((child, idx) => (
          <SummaryItem key={idx} level={0} {...child}>
            {child.children}
          </SummaryItem>
        ))}
      </TocList>
    </TocListItem>
  );
};

SummaryTitle.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.array
    })
  ),
  expanded: PropTypes.bool,
  onToggleExpanded: PropTypes.func.isRequired
};

const TitleLink = ({ id, children, onClick }) => (
  <TitleLinkStyled
    className="toc-link node-name--H3"
    href={`#${id}`}
    onClick={onClick}
  >
    {children}
  </TitleLinkStyled>
);

const TitleLinkStyled = styled.a`
  font-size: 14px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default SummaryTitle;
