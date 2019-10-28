import React from "react";
import PropTypes from "prop-types";

import { Field } from "react-final-form";
import { Label, RadioContainer } from "../../common/stepStyles";
import { required } from "../../common/validators";
import { Question } from "../../common/Question";
import { ErrorField } from "../../common/ErrorField";

export const CONTRACT_TYPE = {
  CDD: "CDD",
  CTT: "CTT"
};

function TypeContrat({ name }) {
  return (
    <>
      <Question as="p" required>
        Quel est votre type de contrat&nbsp;?
      </Question>
      <RadioContainer>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value={CONTRACT_TYPE.CDD}
            validate={required}
          />
          <span>Contrat à durée déterminée (CDD)</span>
        </Label>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value={CONTRACT_TYPE.CTT}
            validate={required}
          />
          <span>Contrat de travail temporaire (Contrat d’intérim)</span>
        </Label>
        <ErrorField name={name} />
      </RadioContainer>
    </>
  );
}

TypeContrat.propTypes = {
  name: PropTypes.string.isRequired
};

export { TypeContrat };
