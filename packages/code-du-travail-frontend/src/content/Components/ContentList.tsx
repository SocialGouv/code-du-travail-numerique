import { BlockDisplayMode } from "../../../../code-du-travail-utils/build";
import { icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import { ListLink } from "../../search/SearchResults/Results";
import useWindowDimensions from "../../common/WindowDimension";

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
          <ListLink
            item={{
              ...item,
              icon: icons[item?.icon],
            }}
            key={`${key}-${ContentIndex}`}
            disableAnalytics
            centerTitle={displayMode === BlockDisplayMode.square}
          ></ListLink>
        ))}
      </ContentItemList>
    </>
  );
};

const ContentItemList = styled.div`
  display: grid;
  grid-template-columns: ${({ square }) =>
    square ? "repeat(2, 1fr)" : "repeat(1, 1fr)"};
  margin: ${theme.spacings.medium};
  column-gap: ${theme.spacings.large};
  row-gap: ${theme.spacings.large};

  & > div {
    ${({ square }) => square && "min-height: 341px;"};
    padding: ${theme.spacings.large} ${theme.spacings.medium};
    height: 100%;
  }

  p,
  a,
  button {
    width: 100%;
    text-align: ${({ square }) => (square ? "center" : "left")};
    justify-content: ${({ square }) => (square ? "center" : "left")};
  }
`;
