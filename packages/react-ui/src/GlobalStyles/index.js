import React from "react";

import Buttons from "./components/Buttons.js";
import Figures from "./components/Figures.js";
import Headings from "./components/Headings.js";
import Links from "./components/Links.js";
import Lists from "./components/Lists.js";
import Paragraphs from "./components/Paragraphs.js";
import Reset from "./components/Reset.js";
import Root from "./components/Root.js";

export const GlobalStyles = () => (
  <>
    <Buttons />
    <Figures />
    <Headings />
    <Links />
    <Lists />
    <Paragraphs />
    <Reset />
    <Root />
  </>
);
