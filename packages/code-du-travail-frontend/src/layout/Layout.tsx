import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled, { css } from "styled-components";

import { ErrorBoundary } from "../common/ErrorBoundary";
import Footer from "./Footer";
import { Header, HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from "./Header";

const Layout = ({ children, currentPage = "" }) => {
  return (
    <BackgroundContainer>
      <BackgroundLayer currentPage={currentPage} />
      <Header currentPage={currentPage} />
      <ErrorBoundary message="Une erreur est survenue">
        <StyledMain id="content" tabIndex="-1">
          {children}
        </StyledMain>
      </ErrorBoundary>
      <Footer />
    </BackgroundContainer>
  );
};

export { Layout };

const { breakpoints, spacings } = theme;

const BackgroundContainer = styled.div`
  position: relative;
  padding-top: calc(${HEADER_HEIGHT});
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: calc(${MOBILE_HEADER_HEIGHT});
  }
  @media print {
    padding-top: 0;
  }
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 70rem;
  overflow: hidden;
  background: ${({ theme }) => `
    linear-gradient(
      ${theme.bgSecondary} 40rem,
      ${theme.white}
    );
  `};
  ${({ currentPage, theme }) =>
    currentPage === "home" &&
    css`
      height: 100rem;
      background: linear-gradient(
        ${theme.heroGradientStart} 40%,
        ${theme.bgSecondary} 80%,
        ${theme.white}
      );
      @media (max-width: ${breakpoints.desktop}) {
        height: 110rem;
      }
      @media (max-width: ${breakpoints.mobile}) {
        height: 80rem;
      }
    `};
  @media print {
    background: none;
  }
`;

const StyledMain = styled.main`
  position: relative;
  margin-top: 6rem;
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.large};
  }
`;
