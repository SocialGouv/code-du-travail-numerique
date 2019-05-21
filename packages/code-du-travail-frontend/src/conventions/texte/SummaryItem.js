import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "@cdt/ui/";
import TocListItem from "./TocListItem";
import TocList from "./TocList";

const SummaryItem = ({ data, children, type, level }) => {
  const { titre, id } = data;
  return (
    <TocListItem level={level} type={type} id={id}>
      <TitleLink className="toc-link node-name--H3" href={`#${id}`}>
        {titre}
      </TitleLink>
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

const TitleLink = styled.a`
  font-size: 14px;
  line-height: 1;
  margin: 0;
  padding: 0 0 5px 0;
  color: ${theme.colors.darkGrey};
  &:visited {
    color: ${theme.colors.darkGrey};
  }
  font-weight: normal;
  &.is-active-link {
    color: #000;
  }
  color: #000,
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default SummaryItem;
