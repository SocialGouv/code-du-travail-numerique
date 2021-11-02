import React, { useEffect } from "react";
import styled from "styled-components";

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
        label={
          <>
            Le salarié a-t-il plus de 2 ans d&apos;ancienneté dans
            l&apos;entreprise <Small>(à partir de 2 ans + 1 jour)</Small>&nbsp;?
          </>
        }
        name="seniorityGreaterThanTwoYears"
        tooltip={{
          content: (
            <p>
              L&apos;ancienneté du salarié est habituellement mentionnée sur
              le&nbsp;
              <strong>bulletin de salaire</strong>.
            </p>
          ),
        }}
        onChange={() => {
          form.change("contrat salarié - ancienneté", undefined);
        }}
      />
      {form.getState().values.seniorityGreaterThanTwoYears === false && (
        <TextQuestion
          name="contrat salarié - ancienneté"
          label="Quelle est l'ancienneté du salarié dans l’entreprise en mois&nbsp;?"
          inputType="number"
          validate={isPositiveNumber}
          validateOnChange
          placeholder="0"
        />
      )}
    </>
  );
}

const Small = styled.small`
  font-size: 1.3rem;
`;

export { AncienneteStep };
