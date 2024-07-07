import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";

const Layout = ({ children, currentPage = "" }) => {
  return (
    <>
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </>
  );
};

export { Layout };
