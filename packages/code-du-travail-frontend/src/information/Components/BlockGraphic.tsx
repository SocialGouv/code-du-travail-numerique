import { toUrl } from "../../lib";
import ImageWrapper from "../../common/ImageWrapper";

import {
  Button,
  icons,
  MoreContent,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import DisplayContentContribution from "../../contributions/DisplayContentContribution";

export const BlockGraphic = ({ block }) => {
  const { imgUrl, altText, fileUrl, html: htmlGraphic, size } = block;
  return (
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
        <Wrapper variant="dark">
          <DisplayContentContribution content={htmlGraphic} titleLevel={3} />
        </Wrapper>
      </MoreContent>
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
