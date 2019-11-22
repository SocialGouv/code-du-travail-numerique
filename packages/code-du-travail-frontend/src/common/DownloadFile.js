import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LargeLink, theme } from "@socialgouv/react-ui";

const DownloadFile = ({ title, type, file }) => {
  const [, extension] = file.split(/\.([a-z]{2,4})$/);
  return (
    <LargeLink variant="dark" title="Télécharger le courrier type" href={file}>
      <DownloadLabel>
        <span>{title}</span>
        <br />
        <DownloadType>{type}</DownloadType>
        {extension && <DownloadExtension> - {extension}</DownloadExtension>}
      </DownloadLabel>
    </LargeLink>
  );
};

DownloadFile.propTypes = {
  file: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export { DownloadFile };

const { colors, fonts } = theme;

const DownloadLabel = styled.div`
  color: ${colors.paragraph};
  font-weight: bold;
`;

const DownloadType = styled.span`
  font-size: ${fonts.sizes.tiny};
`;

const DownloadExtension = styled.span`
  color: ${colors.altText};
  font-size: ${fonts.sizes.tiny};
  text-transform: uppercase;
`;
