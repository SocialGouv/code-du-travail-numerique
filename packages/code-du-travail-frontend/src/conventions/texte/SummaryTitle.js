import React from "react";
import PropTypes from "prop-types";
import SummaryItem from "./SummaryItem";
import styled from "styled-components";

const SummaryTitle = ({ type, data, children, expanded, onToggleExpanded }) => {
  const { id, titre } = data;

  return (
    <Wrapper className="toc-list-item" title={`${type} ${id}`}>
      {children && children.length > 0 ? (
        <TitleLink
          id={id}
          onClick={e => {
            e.preventDefault();
            onToggleExpanded(id, !expanded);
          }}
        >
          {titre}&nbsp;{expanded ? "▲" : "▼"}
        </TitleLink>
      ) : (
        <TitleLink id={id}>{titre}</TitleLink>
      )}
      <SummarySection
        className={`toc-list is-collapsible ${expanded ? "" : "is-collapsed"}`}
      >
        {children.map((child, idx) => (
          <SummaryItem key={idx} level={0} {...child}>
            {child.children}
          </SummaryItem>
        ))}
      </SummarySection>
    </Wrapper>
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

const Title = styled.h4`
  font-size: 14px;
  &.is-active-li {
    font-weight: bold;
  }
`;

const TitleLink = ({ id, children, onClick }) => (
  <TitleLinkStyled className="toc-link" href={`#${id}`} onClick={onClick}>
    {children}
  </TitleLinkStyled>
);

const TitleLinkStyled = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  clear: both;
  font-size: 14px;
  &.is-active-li {
    font-weight: bold;
  }
`;

const SummarySection = styled.ol`
  &.is-collapsed {
    display: none;
  }
  & > .toc-list-item {
    // display all first level section links
    display: block;
  }
  // this should mitigate flickering
  transition: all 300ms ease-in-out;
`;

export default SummaryTitle;
