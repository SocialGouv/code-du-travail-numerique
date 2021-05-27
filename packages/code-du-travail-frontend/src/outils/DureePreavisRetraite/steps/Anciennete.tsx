import React, { useEffect } from "react";

import { TextQuestion } from "../../common/TextQuestion";
import { WizardStepProps } from "../../common/type/WizardType";
import { isPositiveNumber } from "../../common/validators";
import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituation } from "../../publicodes/Utils";

function AncienneteStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

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
