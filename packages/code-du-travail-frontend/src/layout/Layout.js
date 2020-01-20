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
        <Main>{children}</Main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export { Layout };

const { breakpoints } = theme;

const Main = styled.main`
  /* we don't want to focus explicitely main
  it's only use to reset the focus position */
  outline: none;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 40rem;
  overflow: hidden;
  background: ${({ theme }) => theme.bgSecondary};
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
  ${({ currentPage, theme }) =>
    currentPage === "home" &&
    css`
      height: 60rem;
      background: linear-gradient(
        ${theme.heroGradientStart},
        ${theme.bgSecondary}
      );
      @media (max-width: ${breakpoints.desktop}) {
        height: 68rem;
      }
      @media (max-width: ${breakpoints.mobile}) {
        height: 83rem;
      }
    `}
`;
