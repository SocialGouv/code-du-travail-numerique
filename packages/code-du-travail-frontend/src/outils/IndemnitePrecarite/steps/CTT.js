import React from "react";
import { Field } from "react-final-form";
import { Toast } from "@socialgouv/react-ui";

import { YesNoQuestion } from "../../IndemniteLicenciement/components/YesNoQuestion";

function validate(values) {
  const errors = {};
  if (values.cttFormation === true) {
    errors.cttFormation =
      "Votre type de contrat ne vous permet pas d’avoir droit à une prime de précarité.";
  }
  if (values.ruptureContratFauteGrave === true) {
    errors.ruptureContratFauteGrave =
      "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l’initiative du salarié, pour faute grave ou en cas de force majeure, le salarié n’a pas le droit à une prime de précarité.";
  }
  if (values.propositionCDIFinContrat === true) {
    errors.propositionCDIFinContrat =
      "Le salarié en contrat de travail temporaire (contrat d'intérim) qui est immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission n’a pas le droit à une prime de précarité.";
  }
  if (values.refusSouplesse === true) {
    errors.refusSouplesse =
      "Le salarié en contrat d'intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat n’a pas le droit à une prime de précarité.";
  }
  return errors;
}

function StepCTT() {
  return (
    <>
      <YesNoQuestion
        label="Avez vous un contrat de mission-formation&nbsp;?"
        name="cttFormation"
        data-testid="cttFormation"
      />
      <Field name="cttFormation">
        {({ input }) =>
          input.value === false ? (
            <Toast variant="info">
              Attention : si vous avez un contrat de travail temporaire
              saisonnier ou d’usage, un accord d’entreprise ou d’établissement
              peut dispenser votre entreprise de travail temporaire
              (l’entreprise d’intérim) de vous verser une prime de précarité.
            </Toast>
          ) : null
        }
      </Field>
      <YesNoQuestion
        data-testid="ruptureContratFauteGrave"
        name="ruptureContratFauteGrave"
        label="Votre contrat d'intérim a-t-il été rompu avant la fin prévue pour une des raisons suivantes : votre propre initiative, votre faute grave ou en cas de force majeure&nbsp;?"
      />
      <YesNoQuestion
        data-testid="propositionCDIFinContrat"
        name="propositionCDIFinContrat"
        label="À la fin de votre contrat d'intérim, avez-vous été immédiatement embauché en CDI au sein de l'entreprise dans laquelle vous effectuiez votre mission&nbsp;?"
      />
      <YesNoQuestion
        data-testid="refusSouplesse"
        name="refusSouplesse"
        label="Avez-vous refusé la mise en œuvre de la souplesse prévue dans votre contrat d’intérim&nbsp;?"
      />
    </>
  );
}

StepCTT.validate = validate;

export { StepCTT };
