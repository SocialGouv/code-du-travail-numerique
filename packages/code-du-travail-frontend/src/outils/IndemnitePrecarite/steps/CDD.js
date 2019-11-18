import React from "react";
import { Field } from "react-final-form";
import { YesNoQuestion } from "../../common/YesNoQuestion";

function validate(values) {
  const errors = {};
  if (values.finContratPeriodeDessai === true) {
    errors.finContratPeriodeDessai =
      "Lorsque le CDD a été rompu pendant la période d’essai, le salarié en CDD n’a pas le droit à une prime de précarité.";
  }
  if (values.propositionCDIFindeContrat === true) {
    errors.propositionCDIFindeContrat =
      "Le salarié en CDD qui est immédiatement embauché dans l’entreprise en CDI, sans interruption, sur un même poste ou sur un poste différent, n’a pas le droit à une prime de précarité.";
  }
  if (values.refusCDIFindeContrat === true) {
    errors.refusCDIFindeContrat =
      "Le salarié en CDD qui refuse un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente, n’a pas le droit à une prime de précarité.";
  }
  if (values.interruptionFauteGrave === true) {
    errors.interruptionFauteGrave =
      "Lorsque le CDD est rompu de manière anticipée à l’initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure, le salarié en CDD n’a pas le droit à une prime de précarité.";
  }
  if (values.refusRenouvellementAuto === true) {
    errors.refusRenouvellementAuto =
      "Le salarié en CDD qui refuse le renouvellement de son CDD alors que son contrat prévoyait son renouvellement automatique n’a pas le droit à une prime de précarité.";
  }
  return errors;
}

function StepCDD() {
  return (
    <>
      <YesNoQuestion
        data-testid="finContratPeriodeDessai"
        name="finContratPeriodeDessai"
        label="Le CDD a-t-il été rompu pendant votre période d’essai&nbsp;?"
      />
      <YesNoQuestion
        data-testid="propositionCDIFindeContrat"
        name="propositionCDIFindeContrat"
        label="À la fin du CDD, la salarié a-t-il été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent&nbsp;?"
      />
      <Field name="propositionCDIFindeContrat">
        {({ input }) => {
          return input.value === false ? (
            <YesNoQuestion
              data-testid="refusCDIFindeContrat"
              name="refusCDIFindeContrat"
              label="À la fin du CDD, le salarié a-t-il refusé un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente&nbsp;?"
            />
          ) : null;
        }}
      </Field>
      <YesNoQuestion
        data-testid="interruptionFauteGrave"
        name="interruptionFauteGrave"
        label="Le CDD a-t-il été rompu avant la fin prévue pour une des raisons suivantes&nbsp;: la propre initiative du salarié, la faute grave ou faute lourde du salarié, cas de force majeure&nbsp;?"
      />
      <YesNoQuestion
        data-testid="refusRenouvellementAuto"
        name="refusRenouvellementAuto"
        label="Le salarié a-t-il refusé de renouveler le CDD alors que le CDD comportait une clause de renouvellement automatique&nbsp;?"
      />
    </>
  );
}
StepCDD.validate = validate;
export { StepCDD };
