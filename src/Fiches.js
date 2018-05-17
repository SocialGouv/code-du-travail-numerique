import React from "react";
import { ExternalLink } from "react-feather";
//import styled from "styled-components";

import fichesDgt from "./data/fiches";

const hasCommonItem = (arr1, arr2) => arr1.some(r => arr2.includes(r));

const isTheme = theme => entry =>
  (entry.themes && entry.themes.indexOf(theme.id) > -1) ||
  (entry.articles &&
    theme.articles &&
    hasCommonItem(entry.articles, theme.articles));

export const hasFiche = theme => fichesDgt.find(isTheme(theme));

const FicheDgt = ({ source, title, href }) => (
  <li key={href}>
    {source} : &nbsp;
    <a href={href} target="_blank">
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
