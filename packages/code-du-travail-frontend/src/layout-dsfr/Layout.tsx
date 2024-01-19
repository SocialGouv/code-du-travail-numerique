import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const cdtnStyleEnabled = true;

const Layout = ({ children, currentPage = "" }) => {

  const style = {
    background: "linear-gradient(180deg, rgba(194,196,246,1) 0%, rgba(245,245,254,1) 1%, rgba(255,255,255,1) 33%)",
    marginTop: -15,
    paddingTop: 12,
  }
  return (
    <>
      <Header />
      <main id="contenu" style={cdtnStyleEnabled ? style : undefined}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
