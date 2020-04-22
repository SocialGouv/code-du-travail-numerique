import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AlertCircle } from "react-feather";
import { IconStripe, theme } from "@socialgouv/react-ui";
import styled from "styled-components";

import { HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "./Header";

export const Headband = ({ currentPage }) => {
  const { asPath } = useRouter();
  if (
    asPath.includes(
      "dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"
    )
  ) {
    return null;
  }
  return (
    <Link
      href="/dossiers/[slug]"
      as="/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus"
      passHref
    >
      <StyledLink currentPage={currentPage}>
        <IconStripe icon={AlertCircle} small centered>
          Coronavirus (Covid-19) : notre dossier dédié
        </IconStripe>
      </StyledLink>
    </Link>
  );
};

const { box, breakpoints, spacings } = theme;

const StyledLink = styled.a`
  position: sticky;
  top: ${({ currentPage }) => (currentPage === "home" ? "0" : HEADER_HEIGHT)};
  z-index: 2;
  display: flex;
  justify-content: center;
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
  background-color: ${({ theme }) =>
    theme.noColors ? theme.primary : "#ffe980"};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  @media (max-width: ${breakpoints.mobile}) {
    top: ${({ currentPage }) =>
      currentPage === "home" ? "0" : MOBILE_HEADER_HEIGHT};
  }
  @media print {
    display: none;
  }
`;
