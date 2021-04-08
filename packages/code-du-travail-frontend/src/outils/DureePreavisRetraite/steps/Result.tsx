import React from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";

function ResultStep() {
  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        départ à la retraite est estimée à&nbsp;<Highlight>X</Highlight> mois.
      </p>
    </>
  );
}

export { ResultStep };
