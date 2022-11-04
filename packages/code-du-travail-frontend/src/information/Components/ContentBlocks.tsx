import { ListLink } from "../../search/SearchResults/Results";
import ImageWrapper from "../../common/ImageWrapper";
import References from "../../common/References";
import { BlockDisplayMode, Content } from "cdtn-types";
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
  references = [],
  blocks,
}: Omit<Content, "title">) => {
  const { width } = useWindowDimensions();

  return (
    <>
      {blocks.map(
        (
          {
            type,
            imgUrl = "",
            altText = "",
            fileUrl = "",
            html = "",
            blockDisplayMode,
            size,
            title,
            contents,
          },
          index: number
        ) => {
          const reactContent: any = processToHtml(html);
          let comp;
          if (width < theme.breakpoints.intDesktop) {
            blockDisplayMode = BlockDisplayMode.line;
          }

          switch (type) {
            case "graphic":
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
                    <Wrapper variant="dark">{reactContent}</Wrapper>
                  </MoreContent>
                </>
              );
              break;
            case "content":
              let contentBlock;
              switch (blockDisplayMode) {
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
            case "markdown":
            default:
              comp = <React.Fragment key={name}>{reactContent}</React.Fragment>;
              break;
          }
          return <ContentBlockWrapper key={index}>{comp}</ContentBlockWrapper>;
        }
      )}
      {references.map(
        ({ label, links }) =>
          links.length > 0 && (
            <StyledReferences
              label={label}
              accordionDisplay={1}
              references={links.map((reference, index) => ({
                ...reference,
                id: reference.id || `${name}-${index}`,
              }))}
            />
          )
      )}
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

const StyledReferences = styled(References)`
  margin-top: ${spacings.xmedium};
`;

const ListLinkContainer = styled.div`
  margin: 12px 0;
  height: 100%;
  padding: 0 12px;
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
    width: 284px;
    height: 341px;
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
