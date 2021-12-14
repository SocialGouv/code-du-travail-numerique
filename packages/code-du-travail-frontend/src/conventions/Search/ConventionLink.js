import { formatIdcc } from "@cdt/data";
import slugify from "@socialgouv/cdtn-slugify";
import { Button, Paragraph, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { matopush } from "../../piwik";

// following @cdt/data/indexing/cdtnDocuments.js slug rules
const getConventionSlug = (convention) =>
  slugify(`${convention.num}-${convention.shortTitle}`.substring(0, 80));

export const ConventionLink = ({
  convention,
  isFirst,
  onClick,
  small = false,
}) => {
  const { num, shortTitle, highlight } = convention;
  const router = useRouter();

  const clickHandler = () => {
    matopush(["trackEvent", "cc_select", router.asPath, shortTitle]);
    onClick && onClick(convention);
  };

  const commonProps = {
    isFirst,
    onClick: clickHandler,
    small,
  };

  return onClick ? (
    <StyledLink as={Button} variant="navLink" {...commonProps}>
      {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
      {highlight && (
        <Paragraph variant="altText">{highlight.searchInfo}</Paragraph>
      )}
    </StyledLink>
  ) : (
    <Link
      href={`/convention-collective/${getConventionSlug({
        num,
        shortTitle,
      })}`}
      passHref
    >
      <StyledLink {...commonProps}>
        {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
        {highlight && (
          <Paragraph variant="altText">{highlight.searchInfo}</Paragraph>
        )}
      </StyledLink>
    </Link>
  );
};

const { spacings } = theme;

const StyledLink = styled.a`
  display: block;
  padding: ${({ small }) => (small ? spacings.xsmall : spacings.base)} 0;
  ${({ isFirst }) => isFirst && "padding-top: 0;"}
  color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  text-align: left;
  text-decoration: none;
`;

const IDCC = styled.span`
  font-weight: normal;
`;
