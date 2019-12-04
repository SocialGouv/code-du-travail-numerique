import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tile, theme } from "@socialgouv/react-ui";

const DownloadFile = ({ title, type, file }) => {
  const [, extension] = file.split(/\.([a-z]{2,4})$/);
  return (
    <Tile className="no-after" wide title={title} href={file}>
      <DownloadType>{type}</DownloadType>
      {extension && <DownloadExtension> - {extension}</DownloadExtension>}
    </Tile>
  );
};

DownloadFile.propTypes = {
  file: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export { DownloadFile };

const { colors, fonts } = theme;

const DownloadType = styled.span`
  font-size: ${fonts.sizes.tiny};
`;

const DownloadExtension = styled.span`
  color: ${colors.altText};
  font-size: ${fonts.sizes.tiny};
  text-transform: uppercase;
`;
