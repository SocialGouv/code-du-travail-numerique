import { ListLink } from "../../search/SearchResults/Results";
import ImageWrapper from "../../common/ImageWrapper";
import { BlockDisplayMode, Content, ContentType } from "cdtn-types";
import {
  Button,
  icons,
  MoreContent,
  Wrapper,
  theme,
} from "@socialgouv/cdtn-ui";
import { processToHtml } from "../../information";
import { toUrl } from "../../lib";
import React from "react";
import styled from "styled-components";
import useWindowDimensions from "../../common/WindowDimension";

export const ContentBlocks = ({
  name,
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
            const { imgUrl, altText, fileUrl, html: htmlGraphic, size } = block;
            comp = (
              <>
                <ImageWrapper src={toUrl(imgUrl)} altText={altText} />
                <DownloadWrapper>
                  <Button
                    as="a"
                    className="no-after"
                    href={toUrl(fileUrl)}
                    narrow
                    variant="navLink"
                    download
                  >
                    Télécharger l‘infographie (pdf - {size})
                    <Download />
                  </Button>
                </DownloadWrapper>
                <MoreContent noLeftPadding title="Voir en détail">
                  <Wrapper variant="dark">{processToHtml(htmlGraphic)}</Wrapper>
                </MoreContent>
              </>
            );
            break;
          case ContentType.content:
            const { blockDisplayMode, contents, title } = block;
            let contentBlock;
            switch (forceBlockDisplayMode || blockDisplayMode) {
              case BlockDisplayMode.square:
                contentBlock = (
                  <ListLinkSquareTile>
                    {contents?.map((item, ContentIndex) => (
                      <div key={`${index}-${ContentIndex}`}>
                        <ListLinkContainer>
                          <ListLink
                            item={{
                              ...item,
                              icon: icons[item?.icon],
                            }}
                            centerTitle
                          ></ListLink>
                        </ListLinkContainer>
                      </div>
                    ))}
                  </ListLinkSquareTile>
                );
                break;
              case BlockDisplayMode.line:
              default:
                contentBlock = (
                  <div>
                    {contents?.map((item, ContentIndex) => (
                      <div key={`${index}-${ContentIndex}`}>
                        <ListLinkContainer>
                          <ListLink
                            item={{
                              ...item,
                              icon: undefined,
                            }}
                          ></ListLink>
                        </ListLinkContainer>
                      </div>
                    ))}
                  </div>
                );
                break;
            }
            comp = (
              <>
                {title && <BlockContentTitle>{title}</BlockContentTitle>}
                {contentBlock}
              </>
            );
            break;
          case ContentType.markdown:
            const { html: htmlMarkdown } = block;
            comp = (
              <React.Fragment key={name}>
                {processToHtml(htmlMarkdown) as any}
              </React.Fragment>
            );
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

const { spacings } = theme;

const DownloadWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Download = styled(icons.Download)`
  width: 2.2rem;
  margin-left: ${spacings.xsmall};
`;

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

const ListLinkSquareTile = styled.div`
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
`;

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
