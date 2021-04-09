import React from "react";

import { TextQuestion } from "../../common/TextQuestion";
import { isPositiveNumber } from "../../common/validators";

function AncienneteStep() {
  return (
    <>
      <TextQuestion
        name="contrat salarié - ancienneté"
        label="Quelle est votre ancienneté dans l’entreprise en mois&nbsp;?"
        inputType="number"
        validate={isPositiveNumber}
        placeholder="0"
      />
    </>
  );
}

export { AncienneteStep };
