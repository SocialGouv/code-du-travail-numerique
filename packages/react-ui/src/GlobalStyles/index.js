import React from "react";

import Headings from "./components/Headings";
import Links from "./components/Links";
import Lists from "./components/Lists";
import Paragraphs from "./components/Paragraphs";
import Reset from "./components/Reset";
import Root from "./components/Root";

export const GlobalStyles = () => (
  <>
    <Headings />
    <Links />
    <Lists />
    <Paragraphs />
    <Reset />
    <Root />
  </>
);
