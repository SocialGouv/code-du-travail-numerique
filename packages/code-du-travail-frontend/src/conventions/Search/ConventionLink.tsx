import { formatIdcc } from "@socialgouv/modeles-social";
import { Button, Paragraph, theme } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Agreement } from "./api/type";

type Props = {
  convention: Agreement;
  isFirst?: boolean;
  onClick?: (agreement: Agreement) => void;
  small?: boolean;
};

export const ConventionLink = ({
  convention,
  isFirst,
  onClick,
  small = false,
}: Props): JSX.Element => {
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
      {highlight && highlight.searchInfo && (
        <Paragraph variant="altText" noMargin>
          {highlight.searchInfo}
        </Paragraph>
      )}
    </StyledLink>
  ) : (
    <Link
      href={`/convention-collective/${convention.slug}`}
      passHref
      legacyBehavior
    >
      <StyledLink {...commonProps}>
        {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
        {highlight && highlight.searchInfo && (
          <Paragraph variant="altText" noMargin>
            {highlight.searchInfo}
          </Paragraph>
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
