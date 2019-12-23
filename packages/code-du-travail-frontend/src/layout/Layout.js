<<<<<<< HEAD
import React from "react";
import styled, { css } from "styled-components";
import { theme } from "@socialgouv/react-ui";
||||||| constructed merge base
import React from "react";
import styled from "styled-components";
=======
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ScreenReaderOnly } from "@socialgouv/react-ui";
>>>>>>> wip: live region a11y

import Header from "./Header";
import Footer from "./Footer";
import { ErrorBoundary } from "../common/ErrorBoundary";

const Layout = ({ title, children, currentPage }) => {
  const mainRef = React.createRef();

  const router = useRouter();
  const [ariaTitle, setAriaTitle] = useState();
  useEffect(() => {
    const routeChangeComplete = () => {
      mainRef.current.focus();
      setAriaTitle(ariaTitle);
    };

    router.events.on("routeChangeComplete", routeChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", routeChangeComplete);
    };
  }, [router.events, setAriaTitle, ariaTitle, mainRef]);

  return (
    <>
      <BackgroundLayer currentPage={currentPage} />
      <Header currentPage={currentPage} />
      <ErrorBoundary message="Une erreur est survenue">
        <Main id="main" ref={mainRef} tabIndex="-1">
          {children}
        </Main>
      </ErrorBoundary>
      <ScreenReaderOnly aria-live="polite" role="status">
        {ariaTitle}
      </ScreenReaderOnly>
      <Footer />
    </>
  );
};

export { Layout };

<<<<<<< HEAD
const { breakpoints } = theme;

||||||| constructed merge base
=======
const Main = styled.main`
  /* we don't want to focus explicitely main
  it's only use to reset the focus position */
  outline: none;
`;

>>>>>>> wip: live region a11y
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
