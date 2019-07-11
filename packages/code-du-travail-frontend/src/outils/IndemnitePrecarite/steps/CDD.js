import React from "react";
import { YesNoQuestion } from "../../IndemniteLicenciement/components/YesNoQuestion";

function validate(values) {
  const errors = {};
  if (values.finContratPeriodeDessai === true) {
    errors.finContratPeriodeDessai =
      "Lorsque le CDD a été rompu pendant la période d’essai, le salarié en CDD n’a pas le droit à une indemnité de précarité.";
  }
  if (values.propositionCDIFindeContrat === false) {
    errors.propositionCDIFindeContrat =
      "Le salarié en CDD qui est immédiatement embauché dans l’entreprise en CDI, sans interruption, sur un même poste ou sur un poste différent, n’a pas le droit à une indemnité de précarité.";
  }
  if (values.refusCDIFindeContrat === true) {
    errors.refusCDIFindeContrat =
      "Le salarié en CDD qui refuse un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente, n’a pas le droit à une indemnité de précarité.";
  }
  if (values.interruptionFauteGrave === true) {
    errors.interruptionFauteGrave =
      "Lorsque le CDD est rompu de manière anticipée à l’initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure, le salarié en CDD n’a pas le droit à une indemnité de précarité.";
  }
  if (values.refusRenouvellementAuto === true) {
    errors.refusRenouvellementAuto =
      "Le salarié en CDD qui refuse le renouvellement de son CDD alors qu’était prévu dans son contrat prévoyait son renouvellement automatique n’a pas le droit à une indemnité de précarité. ";
  }
  return errors;
}

function StepCDD() {
  return (
    <>
      <YesNoQuestion
        data-testid="finContratPeriodeDessai"
        name="finContratPeriodeDessai"
        label="Votre CDD a-t-il été rompu pendant votre période d’essai ?"
      />
      <YesNoQuestion
        data-testid="propositionCDIFindeContrat"
        name="propositionCDIFindeContrat"
        label="À la fin de votre CDD, avez-vous été immédiatement embauché en CDI, sans interruption, sur un même poste ou sur un poste différent ?"
      />
      <YesNoQuestion
        data-testid="refusCDIFindeContrat"
        name="refusCDIFindeContrat"
        label="À la fin de votre CDD, avez-vous refusé un CDI pour occuper le même emploi ou un emploi similaire dans l’entreprise avec une rémunération au moins équivalente ?"
      />
      <YesNoQuestion
        data-testid="interruptionFauteGrave"
        name="interruptionFauteGrave"
        label="Votre CDD a-t-il été rompu avant la fin prévue pour une des raisons suivantes : votre propre initiative, votre faute grave ou faute lourde, en cas de force majeure ?"
      />
      <YesNoQuestion
        data-testid="refusRenouvellementAuto"
        name="refusRenouvellementAuto"
        label="Avez-vous refusé de renouveler votre CDD alors que votre CDD comportait une clause de renouvellement automatique ?"
      />
    </>
  );
}
StepCDD.validate = validate;
export { StepCDD };
