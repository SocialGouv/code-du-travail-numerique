import { BlockDisplayMode, Content, ContentType } from "cdtn-types";
import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import useWindowDimensions from "../../common/WindowDimension";
import { BlockMarkdown } from "./BlockMarkdown";
import { BlockGraphic } from "./BlockGraphic";
import { ContentList } from "../../content";

export const BlockList = ({
  blocks,
}: Omit<Content, "title" | "references">) => {
  let forceBlockDisplayMode;
  const { width } = useWindowDimensions();
  if (width < theme.breakpoints.intDesktop) {
    forceBlockDisplayMode = BlockDisplayMode.line;
  }

  return (
    <>
      {blocks.map((block, index: number) => {
        let comp;

        switch (block.type) {
          case ContentType.graphic:
            comp = <BlockGraphic block={block}></BlockGraphic>;
            break;
          case ContentType.content:
            const { title } = block;
            comp = (
              <>
                {title && <BlockContentTitle>{title}</BlockContentTitle>}
                <ContentList block={block} key={index}></ContentList>
              </>
            );
            break;
          case ContentType.markdown:
            comp = <BlockMarkdown block={block}></BlockMarkdown>;
            break;
        }
        return (
          <div key={index}>
            {index > 0 && (
              <StyledSeparator data-testid="block-separator"></StyledSeparator>
            )}
            <ContentBlockWrapper>{comp}</ContentBlockWrapper>
          </div>
        );
      })}
    </>
  );
};

const BlockContentTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #4d73b8;
`;

const ContentBlockWrapper = styled.div`
  padding-bottom: 12px;
`;

const StyledSeparator = styled.div`
  margin: 24px 0;
  border-top: 1px solid #bbcadf;
`;
