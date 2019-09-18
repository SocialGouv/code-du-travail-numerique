import React from "react";
import styled from "styled-components";
import { theme } from "@cdt/ui-old";
import { getLabelBySource } from "@cdt/sources";

export const LinkContent = ({ author, description = "", source, title }) => {
  const summary =
    description.length > 160
      ? description.slice(0, description.indexOf(" ", 160)) + "…"
      : description;
  return (
    <>
      <Source>
        <span>{`${getLabelBySource(source)}${
          author ? ` - ${author}` : ""
        }`}</span>
      </Source>
      <H3>{title}</H3>
      {summary && <Summary>{summary}</Summary>}
    </>
  );
};

const { colors, fonts } = theme;

const Source = styled.p`
  margin: 0;
  font-size: ${fonts.sizeSmall};
`;

const H3 = styled.h3`
  margin-top: 0;
  font-size: ${fonts.sizeH5};
  font-weight: bold;
`;

const Summary = styled.p`
  margin: 0;
  color: ${colors.darkText};
`;
