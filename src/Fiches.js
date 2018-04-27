import React from "react";
import { ExternalLink } from "react-feather";
//import styled from "styled-components";

import fichesDgt from "./data/fiches";

const isTheme = themeId => entry =>
  entry.themes && entry.themes.indexOf(themeId) > -1;

export const hasFiche = theme => fichesDgt.find(isTheme(theme.id));

const FicheDgt = ({ source, title, href }) => (
  <li key={href}>
    {source} : &nbsp;
    <a href={href}>
      {title}
      <ExternalLink style={{ marginLeft: 5, verticalAlign: "top" }} size="12" />
    </a>
  </li>
);

const FichesDGT = ({ theme }) => {
  const fiches = fichesDgt.filter(
    fiche => fiche.themes && fiche.themes.indexOf(theme.id) > -1
  );
  return <div>{fiches.map(FicheDgt)}</div>;
};

export default FichesDGT;
