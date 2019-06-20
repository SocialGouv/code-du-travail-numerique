import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";

const PageLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export { PageLayout };
