import React, { useCallback } from "react";
import PropTypes from "prop-types";
import SummaryItem from "./SummaryItem";
import TocLink from "./toc/TocLink";
import TocListItem from "./toc/TocListItem";
import TocList from "./toc/TocList";

const SummaryTitle = ({ node, onToggleExpanded, tocbotEnabled }) => {
  const { data, expanded, type } = node;
  const { titre, id } = data;

  const clickHandler = useCallback(
    event => {
      event.preventDefault();
      onToggleExpanded(id, !expanded);
    },
    [id, expanded]
  );

  if (!node.children || node.children.length == 0) {
    return (
      <TocListItem type={type} id={id} level={0}>
        <TitleLink type={type} id={id}>
          {titre}
        </TitleLink>
      </TocListItem>
    );
  }
  return (
    <TocListItem type={type} id={id} level={0}>
      <TitleLink id={id} type={type} onClick={clickHandler}>
        {titre}&nbsp;{expanded ? "▲" : "▼"}
      </TitleLink>
      <TocList expanded={expanded}>
        {(expanded || tocbotEnabled) && // with tocbot, all DOM is displayed by default
          node.children.map(childNode => (
            <SummaryItem
              key={childNode.data.id}
              level={1}
              node={childNode}
              expanded={expanded}
            />
          ))}
      </TocList>
    </TocListItem>
  );
};

SummaryTitle.propTypes = {
  node: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      titre: PropTypes.string.isRequired
    }).isRequired,
    expanded: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.string
        })
      })
    )
  }),
  onToggleExpanded: PropTypes.func.isRequired,
  tocbotEnabled: PropTypes.bool
};

const TitleLink = ({ id, type, children, onClick }) => (
  <TocLink id={id} type={type} level={0} onClick={onClick}>
    {children}
  </TocLink>
);

export default SummaryTitle;
