import { ListLink } from "../../search/SearchResults/Results";
import { BlockDisplayMode } from "cdtn-types";
import { icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import useWindowDimensions from "../../common/WindowDimension";
import { getContentById } from "../content.service";
import { ContentItem } from "./ContentItem";

export const ContentList = ({ block, key }) => {
  let forceBlockDisplayMode;
  const { width } = useWindowDimensions();
  if (width < theme.breakpoints.intDesktop) {
    forceBlockDisplayMode = BlockDisplayMode.line;
  }
  const { blockDisplayMode, contents } = block;
  const displayMode = forceBlockDisplayMode || blockDisplayMode;
  return (
    <>
      <ContentItemList square={displayMode === BlockDisplayMode.square}>
        {contents?.map((item, ContentIndex) => (
          <ContentItem
            key={`${key}-${ContentIndex}`}
            item={item}
            centerTitle={displayMode === BlockDisplayMode.square}
          ></ContentItem>
        ))}
      </ContentItemList>
    </>
  );
};

const ContentItemList = styled.div`
  ${({ square }) =>
    square &&
    `
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      & > div {
        min-height: 341px;
        margin: 12px auto;
      }
      p,
      button {
        width: 100%;
        text-align: center;
      }
  `}
`;
