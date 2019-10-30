import React from "react";
import { YesNoQuestion } from "../../common/YesNoQuestion";

function validate() {
  const errors = {};
  return errors;
}

function StepInformations({ form }) {
  const data = form.getState().values;
  return (
    <>
      <YesNoQuestion
        name="fauteGrave"
        label="S'agit-il d'un licenciement pour faute grave ou lourde ?"
      />
      {data.fauteGrave === false && (
        <>
          <YesNoQuestion
            name="travailleurHandicape"
            label="Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
          />
        </>
      )}
    </>
  );
}
StepInformations.validate = validate;
export { StepInformations };
