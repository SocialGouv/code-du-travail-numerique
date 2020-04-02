import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatIdcc } from "@cdt/data";
import slugify from "@cdt/data/slugify";
import { Button, theme } from "@socialgouv/react-ui";

import { matopush } from "../../piwik";

// following data/populate.js slug rules
const getConventionSlug = (convention) =>
  slugify(`${convention.num}-${convention.shortTitle}`.substring(0, 80));

export const ConventionLink = ({ convention, isFirst, onClick, small }) => {
  const { num, shortTitle } = convention;
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
    </StyledLink>
  ) : (
      <Link
        as={`/convention-collective/${getConventionSlug({
          num,
          shortTitle,
        })}`}
        href="/convention-collective/[slug]"
        passHref
      >
        <StyledLink {...commonProps}>
          {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
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
