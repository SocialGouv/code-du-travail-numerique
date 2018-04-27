import React from "react";
import styled from "styled-components";

import { THEMES_L22531, THEMES_L22532 } from "./data/L2253";

const getAllThemes = themes =>
  Array.from(new Set(Object.keys(themes).reduce((uniques, c) => [...uniques, ...themes[c]], [])));

const isInL22531 = id => getAllThemes(THEMES_L22531).indexOf(id) > -1;

const isInL22532 = id => getAllThemes(THEMES_L22532).indexOf(id) > -1;

// retourne un texte pour un thème donné
const getArticulation = ({ theme }) => {
  if (isInL22531(theme.id)) {
    // article entre dans le champ du L.2253-1
    return `
      Si l'accord d'entreprise dispose de garanties <b>au moins</b> équivalentes, elles prévalent sur celles de l'accord de branche
    `;
  } else if (isInL22532(theme.id)) {
    // article entre dans le champ du L.2253-2
    return `
      Si l'accord de branche vérouille le thème, et si l'accord d'entreprise a été signé posterieurement à la date d'entrée en vigueur de l'accord de branche, et dispose de garanties au moins équivalentes, elles prévalent sur celles de l'accord de branche
      <br><br>
      Sinon, l'accord d'entreprise s'applique, même s'il est moins favorable.
      <br><br>
      Et si l'accord d'entreprise a été signé posterieurement à la date d'entrée en vigueur de l'accord de branche, et dispose de garanties au moins équivalentes, elles prévalent sur celles de l'accord de branche.`;
  } else {
    // autres cas
    return `
      Si l'accord d'entreprise couvre le theme, AE > AB
      <br><br>
      Si ni AE ni AB, le code du travail s'applique (dispositions supplétives lorsque le code les prévoit)
      `;
  }
};

const Articulation = ({ theme }) => (
  <div dangerouslySetInnerHTML={{ __html: getArticulation({ theme }) }} />
);

export default Articulation;
