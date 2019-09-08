import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui-old";

// Beware, this one is recursive !
const SidebarItem = ({ node }) => {
  const {
    type,
    data: { title, id, surtitre },
    children = []
  } = node;
  const [isExpanded, setExpanded] = useState(false);
  if (type === "article") {
    if (!surtitre) {
      return null;
    }
    return (
      <Li>
        <Link href={`#${id}`}>{surtitre}</Link>
      </Li>
    );
  }
  const childNodes = children.filter(
    ({ type, data: { surtitre } }) =>
      type === "section" || (type === "article" && surtitre)
  );

  return (
    <Li>
      <Link
        href={`#${id}`}
        onClick={e => {
          // because of mobile version: we don't want the user to loose track
          // of the nav until he reaches the section he really wishes
          e.preventDefault();
          setExpanded(!isExpanded);
        }}
      >
        {title}&nbsp;
        {childNodes.length === 0 ? null : isExpanded ? "▲" : "▼"}
      </Link>
      {isExpanded && (
        <ol>
          {children.map(childNode => (
            <SidebarItem key={childNode.data.id} node={childNode} />
          ))}
        </ol>
      )}
    </Li>
  );
};

SidebarItem.propTypes = {
  node: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      surtitre: PropTypes.string
    }),
    children: PropTypes.array
  }).isRequired
};

export default SidebarItem;

const { fonts, spacing } = theme;

const Li = styled.li`
  font-size: ${fonts.sizeSmall};
`;

const Link = styled.a`
  display: block;
  padding: ${spacing.tiny} 0;
  text-decoration: none;
  &:hover {
    font-weight: bold;
  }
`;
