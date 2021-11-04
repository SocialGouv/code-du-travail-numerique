import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { TextQuestion } from "../../common/TextQuestion";
import { WizardStepProps } from "../../common/type/WizardType";
import { isPositiveNumber } from "../../common/validators";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituation } from "../../publicodes/Utils";
import { SeniorityMaximum } from "./constants";

function AncienneteStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();
  const [question, setQuestion] = useState<JSX.Element>(
    <>
      Le salarié a-t-il plus de 2 ans d&apos;ancienneté dans l&apos;entreprise{" "}
      <Small>(à partir de 2 ans + 1 jour)</Small>
      &nbsp;?
    </>
  );

  useEffect(() => {
    if (
      form.getState().values.ccn.num === 2264 &&
      form.getState().values["contrat salarié - mise à la retraite"] === "oui"
    ) {
      setQuestion(
        <>
          Le salarié a-t-il plus de 5 ans d&apos;ancienneté dans
          l&apos;entreprise <Small>(à partir de 5 ans + 1 jour)</Small>
          &nbsp;?
        </>
      );
      form.change("seniorityValue", SeniorityMaximum.GREATER_THAN_5_YEARS);
    } else {
      setQuestion(
        <>
          Le salarié a-t-il plus de 2 ans d&apos;ancienneté dans
          l&apos;entreprise <Small>(à partir de 2 ans + 1 jour)</Small>
          &nbsp;?
        </>
      );
      form.change("seniorityValue", SeniorityMaximum.GREATER_THAN_2_YEARS);
    }
  }, []);

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
  }, [form]);

  return (
    <>
      <YesNoQuestion
        label={question}
        name="seniorityMaximum"
        tooltip={{
          content: (
            <p>
              L&apos;ancienneté du salarié est habituellement mentionnée sur
              le&nbsp;
              <b>bulletin de salaire</b>.
            </p>
          ),
          help: "",
        }}
        onChange={() => {
          form.change("contrat salarié - ancienneté", undefined);
        }}
      />
      {form.getState().values.seniorityMaximum === false && (
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
