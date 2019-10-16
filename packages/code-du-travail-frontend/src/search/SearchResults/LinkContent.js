import React from "react";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";
import { SOURCES } from "@cdt/sources";

const Theme = ({ breadcrumbs = [], source, isSearch }) => {
  if (isSearch && source !== SOURCES.THEMES && breadcrumbs.length) {
    const breadcrumb = breadcrumbs[breadcrumbs.length - 1];
    return <P>{breadcrumb.title}</P>;
  }
  return null;
};

export const LinkContent = props => {
  const { description = "", title } = props;
  const summary =
    description.length > 160
      ? description.slice(0, description.indexOf(" ", 160)) + "…"
      : description;
  return (
    <>
      <Theme {...props} />
      <H3 noMargin={!summary}>{title}</H3>
      {summary && <Summary>{summary}</Summary>}
    </>
  );
};

const { colors, fonts } = theme;

const P = styled.p`
  margin: 0;
  font-size: ${fonts.sizeSmall};
  color: ${({ theme }) => theme.darkText};
`;

const H3 = styled.h3`
  ${({ noMargin }) => (noMargin ? `margin: 0;` : `margin-top: 0;`)}
  font-size: ${fonts.sizeH5};
  font-weight: bold;
`;

const Summary = styled.p`
  margin: 0;
  color: ${colors.darkText};
`;
