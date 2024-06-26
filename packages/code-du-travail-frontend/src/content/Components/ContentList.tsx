import { Grid, icons } from "@socialgouv/cdtn-ui";
import { EditorialContentBlockDisplayMode } from "@socialgouv/cdtn-types";

import React from "react";
import { ListLink } from "../../search/SearchResults/Results";
import styled from "styled-components";

export const ContentList = ({ block, uniquKey }) => {
  const { blockDisplayMode, contents } = block;
  return (
    <>
      <ContentItemList
        columns={
          blockDisplayMode === EditorialContentBlockDisplayMode.square ? 2 : 1
        }
        square={blockDisplayMode === EditorialContentBlockDisplayMode.square}
      >
        {contents?.map((item, ContentIndex) => (
          <ListLink
            item={{
              ...item,
              icon: icons[item?.icon],
            }}
            key={`${uniquKey}-${ContentIndex}`}
            disableAnalytics
            centerTitle={
              blockDisplayMode === EditorialContentBlockDisplayMode.square
            }
          ></ListLink>
        ))}
      </ContentItemList>
    </>
  );
};

const ContentItemList = styled(Grid)`
  p {
    width: 100%;
    text-align: ${({ square }) => (square ? "center" : "left")};
    justify-content: ${({ square }) => (square ? "center" : "left")};
  }
`;
