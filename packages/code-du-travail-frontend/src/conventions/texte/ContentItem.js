import React from "react";
import PropTypes from "prop-types";
import Article from "./Article";
import { ContentTitle } from "./ContentTitle";

const ContentItem = ({ data, children, type, level }) => {
  const { titre, id } = data;
  return (
    <div>
      <ContentTitle level={level} type={type} id={id} titre={titre} />
      {children &&
        children.map(child => (
          <ContentItem key={child.data.id} level={level + 1} {...child}>
            {child.children}
          </ContentItem>
        ))}
      {type == "article" && <Article {...data} />}
    </div>
  );
};

ContentItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        id: PropTypes.string.isRequired
      }),
      children: PropTypes.array
    })
  )
};

export default ContentItem;
