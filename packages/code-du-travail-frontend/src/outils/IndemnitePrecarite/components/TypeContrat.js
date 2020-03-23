import React from "react";
import PropTypes from "prop-types";
import { InputRadio } from "@socialgouv/react-ui";

import { Field } from "react-final-form";
import { required } from "../../common/validators";
import { Question } from "../../common/Question";
import { ErrorField } from "../../common/ErrorField";

export const CONTRACT_TYPE = {
  CDD: "CDD",
  CTT: "CTT",
};

function TypeContrat({ name }) {
  return (
    <>
      <Question as="p" required>
        Quel est le type du contrat de travail&nbsp;?
      </Question>
      <Field
        type="radio"
        name={name}
        value={CONTRACT_TYPE.CDD}
        id={CONTRACT_TYPE.CDD}
        validate={required}
      >
        {(props) => (
          <InputRadio
            id={`${name}-cdd`}
            label="Contrat à durée déterminée (CDD)"
            {...props.input}
          />
        )}
      </Field>
      <Field
        type="radio"
        name={name}
        value={CONTRACT_TYPE.CTT}
        id={CONTRACT_TYPE.CTT}
        validate={required}
      >
        {(props) => (
          <InputRadio
            id={`${name}-ci`}
            label="Contrat de travail temporaire (Contrat d’intérim)"
            {...props.input}
          />
        )}
      </Field>
      <ErrorField name={name} />
    </>
  );
}

TypeContrat.propTypes = {
  name: PropTypes.string.isRequired,
};

export { TypeContrat };
