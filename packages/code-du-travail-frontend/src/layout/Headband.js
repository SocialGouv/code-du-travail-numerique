import { theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "./Header";

export const HEADBAND_HEIGHT = "5rem";

export const Headband = ({ href, ...props }) => {
  const { asPath } = useRouter();
  if (asPath.includes(href)) {
    return null;
  }
  return (
    <Link href={href || ""} passHref legacyBehavior>
      <StyledLink {...props} />
    </Link>
  );
};

const { box, breakpoints, spacings } = theme;

const StyledLink = styled.a`
  position: absolute;
  top: ${HEADER_HEIGHT};
  z-index: 2;
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${HEADBAND_HEIGHT};
  padding: ${spacings.small};
  color: ${({ theme }) => (theme.noColors ? theme.white : theme.title)};
  text-align: center;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: ${({ theme }) => (theme.noColors ? theme.white : theme.title)};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) =>
      theme.noColors ? theme.white : theme.title};
  }
  background-color: ${({ color, theme }) =>
    theme.noColors ? theme.primary : color};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  @media (max-width: ${breakpoints.mobile}) {
    top: ${MOBILE_HEADER_HEIGHT};
  }
  @media print {
    display: none;
  }
`;
