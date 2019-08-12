import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui";
import { sortByIntOrdre } from "../../utils";

// Beware, this one is recursive !
const SidebarItem = ({ data }) => {
  const { title, surtitre, id, sections = [], articles = [] } = data;
  const [isExpanded, setExpanded] = useState(false);

  const contents = sections
    .concat(articles.filter(article => !!article.surtitre))
    .sort(sortByIntOrdre);

  if (!contents.length) {
    return (
      <Li>
        <Link href={`#${id}`}>{title || surtitre}</Link>
      </Li>
    );
  }

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
        {title || surtitre}&nbsp;{isExpanded ? "▲" : "▼"}
      </Link>
      {isExpanded && (
        <ol>
          {contents.map((section, index) => (
            <SidebarItem key={index} data={section} />
          ))}
        </ol>
      )}
    </Li>
  );
};

SidebarItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    surtitle: PropTypes.string,
    id: PropTypes.string.isRequired,
    sections: PropTypes.array,
    articles: PropTypes.array
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
