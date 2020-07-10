import { InputRadio } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React from "react";
import { Field } from "react-final-form";

import { ErrorField } from "../../common/ErrorField";
import { Question } from "../../common/Question";
import { RadioContainer } from "../../common/stepStyles";
import { required } from "../../common/validators";

function TypeContrat({ name }) {
  return (
    <>
      <Question as="p" required>
        Quel est le type du contrat de travail&nbsp;?
      </Question>
      <RadioContainer>
        <Field
          type="radio"
          name={name}
          value="cdd"
          id="cdd"
          validate={required}
        >
          {(props) => (
            <InputRadio
              id={`${name}-cdd`}
              label="Contrat à durée determiné (CDD) ou contrat d’intérim"
              {...props.input}
            />
          )}
        </Field>
        <Field
          type="radio"
          name={name}
          value="cdi"
          id="cdi"
          validate={required}
        >
          {(props) => (
            <InputRadio
              id={`${name}-cdi`}
              label="Contrat à durée indeterminé (CDI)"
              {...props.input}
            />
          )}
        </Field>
        <ErrorField name={name} />
      </RadioContainer>
    </>
  );
}

TypeContrat.propTypes = {
  name: PropTypes.string.isRequired,
};

export { TypeContrat };
