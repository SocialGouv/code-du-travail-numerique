import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { ErrorBoundary } from "../common/ErrorBoundary";

const Layout = ({ children, hideSearch }) => {
  return (
    <>
      <Header hideSearch={hideSearch} />
      <ErrorBoundary message="Une erreur est survenue">
        <main id="main">{children}</main>
      </ErrorBoundary>
      <Footer />
    </>
  );
};

export { Layout };
