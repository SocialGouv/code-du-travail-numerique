import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { ErrorBoundary } from "../common/ErrorBoundary";

const Layout = ({ children, hasSearch = true }) => {
  return (
    <ErrorBoundary>
      <Header hasSearch={hasSearch} />
      <main id="main">{children}</main>
      <Footer />
    </ErrorBoundary>
  );
};

export { Layout };
