import React from "react";
import { Field } from "react-final-form";
import { Toast } from "@socialgouv/react-ui";

import { YesNoQuestion } from "../../common/YesNoQuestion";

function validate(values) {
  const errors = {};
  if (values.cttFormation === true) {
    errors.cttFormation =
      "Ce type de contrat ne permet pas au salarié d’avoir droit à une prime de précarité.";
  }
  if (values.ruptureContratFauteGrave === true) {
    errors.ruptureContratFauteGrave =
      "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l’initiative du salarié, pour faute grave du salarié ou en cas de force majeure, le salarié n’a pas le droit à une prime de précarité.";
  }
  if (values.propositionCDIFinContrat === true) {
    errors.propositionCDIFinContrat =
      "Le salarié en contrat de travail temporaire (contrat d’intérim) qui est immédiatement embauché en CDI au sein de l’entreprise dans laquelle il effectuait sa mission n’a pas le droit à une prime de précarité.";
  }
  if (values.refusSouplesse === true) {
    errors.refusSouplesse =
      "Le salarié en contrat d’intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat n’a pas le droit à une prime de précarité.";
  }
  return errors;
}

function StepCTT() {
  return (
    <>
      <YesNoQuestion
        label="S’agit-il d’un contrat de mission-formation&nbsp;?"
        name="cttFormation"
        data-testid="cttFormation"
      />
      <Field name="cttFormation">
        {({ input }) =>
          input.value === false ? (
            <Toast variant="info">
              Attention&nbsp;: s’il s’agit d’un contrat de travail temporaire
              saisonnier ou d’usage, un accord d’entreprise ou d’établissement
              peut dispenser l’entreprise de travail temporaire (l’entreprise
              d’intérim) de verser la prime de précarité.
            </Toast>
          ) : null
        }
      </Field>
      <YesNoQuestion
        data-testid="ruptureContratFauteGrave"
        name="ruptureContratFauteGrave"
        label="Le contrat d'intérim a-t-il été rompu avant la fin prévue pour une des raisons suivantes&nbsp;: la propre initiative du salarié, la faute grave du salarié, cas de force majeure&nsbp;?"
      />
      <YesNoQuestion
        data-testid="propositionCDIFinContrat"
        name="propositionCDIFinContrat"
        label="À la fin du contrat d'intérim, le salarié a-t-il été immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission&nbsp;?"
      />
      <YesNoQuestion
        data-testid="refusSouplesse"
        name="refusSouplesse"
        label="Le salarié a-t-il refusé la mise en œuvre de la souplesse prévue dans le contrat d’intérim&nbsp;?"
      />
    </>
  );
}

StepCTT.validate = validate;

export { StepCTT };
