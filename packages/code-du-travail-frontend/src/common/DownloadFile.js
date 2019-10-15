import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { LargeLink, theme } from "@socialgouv/react-ui";

const DownloadFile = ({ title, type, file }) => {
  const [, extension] = file.split(/\.([a-z]{2,4})$/);
  return (
    <LargeLink title="Télécharger le courrier type" href={file}>
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

const { colors } = theme;

const DownloadLabel = styled.div`
  color: ${colors.darkText};
  font-weight: bold;
`;

const DownloadType = styled.span`
  font-size: var(--font-size-xsmall);
`;

const DownloadExtension = styled.span`
  color: var(--color-grey);
  font-size: var(--font-size-xsmall);
  text-transform: uppercase;
`;
