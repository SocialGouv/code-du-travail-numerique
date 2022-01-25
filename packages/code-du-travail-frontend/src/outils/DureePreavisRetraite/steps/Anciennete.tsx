import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { trackHelpQuestionRetraite } from "../../../lib/matomo";
import { TextQuestion } from "../../common/TextQuestion";
import { MatomoPreavisRetraiteTrackTitle } from "../../common/type/matomo";
import { WizardStepProps } from "../../common/type/WizardType";
import { isPositiveNumber } from "../../common/validators";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { SeniorityMaximum } from "./constants";

function AncienneteStep({ form }: WizardStepProps): JSX.Element {
  const [question, setQuestion] = useState<JSX.Element>(
    <>
      Le salarié a-t-il plus de 2 ans d&apos;ancienneté dans l&apos;entreprise{" "}
      <Small>(à partir de 2 ans + 1 jour)</Small>
      &nbsp;?
    </>
  );
  const [seniorityLabel, setSeniorityLabel] = useState(
    "Quelle est l'ancienneté du salarié dans l’entreprise en mois ?"
  );

  useEffect(() => {
    if (
      form.getState().values.ccn?.num === 2264 &&
      form.getState().values["contrat salarié - mise à la retraite"] === "oui"
    ) {
      setQuestion(
        <>
          Le salarié a-t-il plus de 5 ans d&apos;ancienneté dans
          l&apos;entreprise <Small>(5 ans + 1 jour)</Small>
          &nbsp;?
        </>
      );
      form.change("seniorityValue", SeniorityMaximum.GREATER_THAN_5_YEARS);
    } else {
      setQuestion(
        <>
          Le salarié a-t-il plus de 2 ans d&apos;ancienneté dans
          l&apos;entreprise <Small>(2 ans + 1 jour)</Small>
          &nbsp;?
        </>
      );
      form.change("seniorityValue", SeniorityMaximum.GREATER_THAN_2_YEARS);
    }
  }, []);

  return (
    <>
      <YesNoQuestion
        label={question}
        name="seniorityMaximum"
        tooltip={{
          content: (
            <p>
              L&apos;ancienneté du salarié est habituellement mentionnée sur
              le&nbsp;<strong>bulletin de salaire</strong>.
            </p>
          ),
          trackableFn: (visibility: boolean) => {
            if (visibility) {
              trackHelpQuestionRetraite(
                MatomoPreavisRetraiteTrackTitle.ANCIENNETE
              );
            }
          },
        }}
        onChange={() => {
          form.change("contrat salarié - ancienneté", undefined);
        }}
      />
      {!form.getState().values.seniorityMaximum && (
        <TextQuestion
          name="contrat salarié - ancienneté"
          label={seniorityLabel}
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
