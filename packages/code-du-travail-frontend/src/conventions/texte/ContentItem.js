import React from "react";
import Article from "./Article";
import styled from "styled-components";

class ContentItem extends React.Component {
  onChangeItemVisibility(visible, idList = null) {
    const { data, onChangeArticleVisibility } = this.props;
    const { id } = data;
    const newIdList = idList ? [id, ...idList] : [id];
    onChangeArticleVisibility(visible, newIdList);
  }

  render() {
    const { data, children, type, level } = this.props;
    const { titre, id } = data;
    return (
      <div id={id}>
        <Title>{titre}</Title>
        {children &&
          children.map(child => (
            <ContentItem
              key={child.data.id}
              onChangeArticleVisibility={(visible, idList) =>
                this.onChangeItemVisibility(visible, idList)
              }
              level={level + 1}
              {...child}
            >
              {child.children}
            </ContentItem>
          ))}
        {type == "article" && (
          <Article
            onChangeVisibility={visible => this.onChangeItemVisibility(visible)}
            {...data}
          />
        )}
      </div>
    );
  }
}

const Title = styled.h3`
  font-size: 16px;
`;

export default ContentItem;
