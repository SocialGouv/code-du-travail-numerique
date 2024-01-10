import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children, currentPage = "" }) => {
  return (
    <>
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
