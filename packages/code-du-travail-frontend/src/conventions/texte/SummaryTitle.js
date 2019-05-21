import React from "react";
import PropTypes from "prop-types";
import SummaryItem from "./SummaryItem";
import { TocListItem, TocList, TocLink } from "./toc";

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
      <TocList expanded={expanded}>
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
  <TocLink id={id} onClick={onClick}>
    {children}
  </TocLink>
);

export default SummaryTitle;
