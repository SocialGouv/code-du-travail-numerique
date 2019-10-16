import React from "react";

function StepIntro() {
  return (
    <>
      <p>
        Ce simulateur est un outil qui permet d’estimer le montant de
        l’indemnité de fin de contrat ou de fin de mission (dite “prime de
        précarité”) d’un salarié en CDD ou en contrat d’intérim.
      </p>
      <p>
        Vous pourrez simuler simplement le montant de la prime de précarité
        définie par le Code du travail avec la prise en compte des
        particularités présentes dans certaines branches d’activité.
      </p>
      <p>
        Cette simulation nécessite environ 5 minutes. Afin de pouvoir remplir
        les renseignements demandés, munissez-vous des informations relatives à
        votre contrat de travail (CDD ou contrat de travail temporaire (contrat
        d’intérim), derniers bulletins de salaire, …).
      </p>
      <p>Pour commencer la simulation, cliquez sur « Suivant ».</p>
    </>
  );
}

export { StepIntro };
