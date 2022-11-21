import { toUrl } from "../../lib";
import { processToHtml } from "../htmlProcess.service";
import ImageWrapper from "../../common/ImageWrapper";

import {
  icons,
  theme,
  Button,
  MoreContent,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import styled from "styled-components";

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
        <Wrapper variant="dark">{processToHtml(htmlGraphic)}</Wrapper>
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
