import React from "react";
import styled, { css } from "styled-components";
import { theme } from "@socialgouv/react-ui";

import Header from "./Header";
import Footer from "./Footer";
import { ErrorBoundary } from "../common/ErrorBoundary";

const Layout = ({ children, currentPage }) => {
  return (
    <>
      <BackgroundLayer currentPage={currentPage} />
      <Header currentPage={currentPage} />
      <ErrorBoundary message="Une erreur est survenue">
        <main id="main">{children}</main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export { Layout };

const { breakpoints } = theme;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: ${({ currentPage }) => (currentPage === "home" ? "62rem" : "40rem")};
  overflow: hidden;
  background: ${({ currentPage, theme }) =>
    currentPage === "home"
      ? `linear-gradient(${theme.heroGradientStart}, ${theme.bgSecondary})`
      : theme.bgSecondary};
  &:after {
    position: absolute;
    bottom: -373px;
    left: -50%;
    z-index: -1;
    width: 200%;
    height: 40rem;
    background-color: ${({ theme }) => theme.white};
    border-radius: 100%;
    content: "";
  }
  @media (max-width: ${breakpoints.tablet}) {
    ${({ currentPage }) => {
      if (currentPage === "home") {
        return css`
          height: 104rem;
        `;
      }
    }}
  }
  @media (max-width: ${breakpoints.mobile}) {
    ${({ currentPage }) => {
      if (currentPage === "home") {
        return css`
          height: 86rem;
        `;
      }
    }}
  }
`;
