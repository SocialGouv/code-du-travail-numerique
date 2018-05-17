import React from "react";

import { THEMES_L22531, THEMES_L22532 } from "./data/L2253";
import suppletives from "./data/suppletives";

import Article from "./Article";

const getAllThemes = themes =>
  Array.from(
    new Set(
      Object.keys(themes).reduce((uniques, c) => [...uniques, ...themes[c]], [])
    )
  );

const isInL22531 = id => getAllThemes(THEMES_L22531).indexOf(id) > -1;

const isInL22532 = id => getAllThemes(THEMES_L22532).indexOf(id) > -1;

const DispositionsSuppletives = ({ theme }) => {
  const dispos = suppletives[theme.id];
  if (dispos) {
    return (
      <div>
        <br />
        <b>Dispositions supplétives associées</b>
        <br />
        {dispos.map(article => <Article key={article} id={article} />)}
      </div>
    );
  }
  return <div />;
};

// retourne un texte pour un thème donné
const getArticulation = ({ theme }) => {
  if (isInL22531(theme.id)) {
    // article entre dans le champ du L.2253-1
    return `
    Consultez votre convention collective de branche: ses dispositions sur ce thème s'appliquent pour votre question.
Vérifiez aussi votre accord d'entreprise : S'il prévoit sur ce sujet des " garanties au moins équivalentes" , ces clauses s'appliquent dans votre cas.

    `;
  } else if (isInL22532(theme.id)) {
    // article entre dans le champ du L.2253-2
    return `
            Consultez votre accord d'entreprise dont les clauses à ce sujet s’appliquent à votre situation.
<b>Attention</b>, sur ce thème la convention collective de branche peut décider qu'elle prime sur l'accord d'entreprise. Si c’est le cas :
-	Votre accord d'entreprise a été signé avant la convention collective de branche ? Les clauses de votre accord d’entreprise s’appliquent même si elles sont moins favorables que celles de la convention collective de branche.
-	Votre accord d'entreprise a été signé après la convention collective de branche Les clauses de votre accord d’entreprise s’appliquent si elles offrent des "garanties au moins équivalentes" sur ce sujet. Sinon, il faut vous référer aux clauses de la convention collective de branche. 
`;
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
  <div>
    <div dangerouslySetInnerHTML={{ __html: getArticulation({ theme }) }} />
    <DispositionsSuppletives theme={theme} />
  </div>
);

export default Articulation;
