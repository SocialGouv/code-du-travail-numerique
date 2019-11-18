import React from "react";
import PropTypes from "prop-types";

import { Field } from "react-final-form";
import { Label, RadioContainer } from "../../common/stepStyles";
import { required } from "../../common/validators";
import { ErrorField } from "../../common/ErrorField";
import { Question } from "../../common/Question";

function TypeContrat({ name }) {
  return (
    <>
      <Question as="p" required>
        Quel est le type de contrat&nbsp;?
      </Question>
      <RadioContainer>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value="cdd"
            validate={required}
          />
          <span>Contrat à durée determiné (CDD) ou contrat d’intérim</span>
        </Label>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value="cdi"
            validate={required}
          />
          <span>Contrat à durée indeterminé (CDI)</span>
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
