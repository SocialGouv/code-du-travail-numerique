import React from "react";
import styled from "styled-components";
import { Heading, theme } from "@socialgouv/react-ui";
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
      <StyledHeading noMargin={!summary}>{title}</StyledHeading>
      {summary && <Summary>{summary}</Summary>}
    </>
  );
};

const { colors, fonts } = theme;

const P = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.altText};
  font-size: ${fonts.sizes.small};
`;

const StyledHeading = styled(Heading)`
  ${({ noMargin }) => noMargin && `margin: 0;`}
`;

const Summary = styled.p`
  margin: 0;
  color: ${colors.paragraph};
`;
