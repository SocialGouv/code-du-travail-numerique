import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui/";
import TocLink from "./toc/TocLink";
import TocListItem from "./toc/TocListItem";
import TocList from "./toc/TocList";

const SummaryItem = ({ data, children, type, level, expanded }) => {
  const { titre, id } = data;
  return (
    <TocListItem level={level} type={type} id={id}>
      <TocLinkNested type={type} level={level} id={id}>
        {titre}
      </TocLinkNested>
      {children && (
        <TocList expanded={expanded}>
          {children.map(child => (
            <SummaryItem
              expanded={expanded}
              key={child.data.id}
              level={level + 1}
              {...child}
            >
              {child.children}
            </SummaryItem>
          ))}
        </TocList>
      )}
    </TocListItem>
  );
};

SummaryItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        children: PropTypes.array
      })
    })
  ),
  type: PropTypes.string,
  visible: PropTypes.bool,
  level: PropTypes.number.isRequired
};

const TocLinkNested = styled(TocLink)`
  color: ${theme.colors.black};
  &:visited {
    color: ${theme.colors.black};
  }
`;

export default SummaryItem;
