import React from "react";

import { THEMES_L22531, THEMES_L22532 } from "./data/L2253";

const getAllThemes = themes =>
  Array.from(
    new Set(
      Object.keys(themes).reduce((uniques, c) => [...uniques, ...themes[c]], [])
    )
  );

const isInL22531 = id => getAllThemes(THEMES_L22531).indexOf(id) > -1;

const isInL22532 = id => getAllThemes(THEMES_L22532).indexOf(id) > -1;

// retourne un texte pour un thème donné
const getArticulation = ({ theme }) => {
  if (isInL22531(theme.id)) {
    // article entre dans le champ du L.2253-1
    return `
    Consultez votre <b>convention collective</b>: sur ce thème, ses dipositions quand elles existent s'appliquent pour votre question.<p></p>
    Vérifiez aussi votre <b>accord d'entreprise</b> : S'il contient sur ce sujet des <i>"dispositions au moins équivalentes"</i> sur ce thème: les clauses sur ce thème de l'accord d'netreprise s'appliquent dans votre cas sur les autres textes.
    `;
  } else if (isInL22532(theme.id)) {
    // article entre dans le champ du L.2253-2
    return `
            Consultez votre convention collective <u>et</u> votre accord d'entreprise:
      Votre <b>accord d'entreprise</b> devrait normallement vous permettre de répondre à cette question.
      <b>Attention</b>, sur ce thème la convention collective peut décider qu'elle prime sur l'accord d'entreprise.
      Votre accord d'entreprise prévoit des "garanties au moins équivalentes"? S'il est plus récent que la date d'effet de la conveiton collective: les dispositions qu'il prévoit s'appliquent!
      Silence de la convention collective? Votre accord d'entreprise s'applique même s'il est moins favorabale.
      <br><br>
      Sinon, l'accord d'entreprise s'applique, même s'il est moins favorable.
      <br><br>
      Et si l'accord d'entreprise a été signé posterieurement à la date d'entrée en vigueur de l'accord de branche, et dispose de garanties au moins équivalentes, elles prévalent sur celles de l'accord de branche.`;
  } else {
    // autres cas
    return `
      Consultez votre convention ou accord d'<b>entreprise</b> . <p></p>

      <u>Il n'y a pas de clause sur ce thème au niveau de l'accord d'entreprise?</u><p></p>
      - Consultez votre <b>convention collective</b> ou l'accord à portée plus large: Ils peuvent comporter des clauses sur ce thèmes qui vous sont opposables. <p></p>
      <u>Il n'y a aucune clause sur ce thème : tant dans l'accord d'entreprise, que dans la Convention collective ou l'accord à portée plus large ?</u><p></p>
          - Ce sont les dispositions (dites supplétives) du code du travail, qui s'appliquent par défaut.
      `;
  }
};

const Articulation = ({ theme }) => (
  <div dangerouslySetInnerHTML={{ __html: getArticulation({ theme }) }} />
);

export default Articulation;
