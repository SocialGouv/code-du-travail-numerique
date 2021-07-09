import React, { useEffect } from "react";

import { TextQuestion } from "../../common/TextQuestion";
import { WizardStepProps } from "../../common/type/WizardType";
import { isPositiveNumber } from "../../common/validators";
import { YesNoQuestion } from "../../common/YesNoQuestion";
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
      <YesNoQuestion
        label="Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans exclu)&nbsp;?"
        name="seniorityGreaterThanTwoYears"
        onChange={() => undefined}
      />
      {form.getState().values.seniorityGreaterThanTwoYears === false && (
        <TextQuestion
          name="contrat salarié - ancienneté"
          label="Quelle est l'ancienneté du salarié dans l’entreprise en mois&nbsp;?"
          inputType="number"
          validate={isPositiveNumber}
          placeholder="0"
        />
      )}
    </>
  );
}

export { AncienneteStep };
