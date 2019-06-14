import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui/";
import TocLink from "./toc/TocLink";
import TocListItem from "./toc/TocListItem";
import TocList from "./toc/TocList";

const SummaryItem = ({ node, level, expanded }) => {
  const { data, type } = node;
  const { titre, id } = data;
  return (
    <TocListItem level={level} type={type} id={id}>
      <TocLinkNested type={type} level={level} id={id}>
        {titre}
      </TocLinkNested>
      {node.children && (
        <TocList expanded={expanded}>
          {node.children.map(childNode => (
            <SummaryItem
              key={childNode.data.id}
              level={level + 1}
              node={childNode}
              expanded={expanded}
            />
          ))}
        </TocList>
      )}
    </TocListItem>
  );
};

SummaryItem.propTypes = {
  node: PropTypes.shape({
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      titre: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.string
        })
      })
    ),
    type: PropTypes.string
  }),
  expanded: PropTypes.bool,
  level: PropTypes.number.isRequired
};

const TocLinkNested = styled(TocLink)`
  color: ${theme.colors.black};
  &:visited {
    color: ${theme.colors.black};
  }
`;

export default SummaryItem;
