import { ListLink } from "../../search/SearchResults/Results";
import { icons } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export const ContentItem = ({ item, centerTitle, key }) => {
  return (
    <div key={key}>
      <ListLinkContainer>
        <ListLink
          item={{
            ...item,
            icon: icons[item?.icon],
          }}
          centerTitle={centerTitle}
          disableAnalytics
        ></ListLink>
      </ListLinkContainer>
    </div>
  );
};

const ListLinkContainer = styled.div`
  margin: 12px 0;
  height: 100%;
  padding: 0 20px;
  a {
    height: 100%;
    padding: 32px 20px;
    div {
      max-width: 100%;
    }
  }
`;
