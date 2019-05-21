import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui/";
import TocListItem from "./TocListItem";
import TocList from "./TocList";
import TocLink from "./TocLink";

const SummaryItem = ({ data, children, type, level }) => {
  const { titre, id } = data;
  return (
    <TocListItem level={level} type={type} id={id}>
      <TocLinkNested id={id}>{titre}</TocLinkNested>
      {children && (
        <TocList>
          {children.map(child => (
            <SummaryItem key={child.data.id} level={level + 1} {...child}>
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
