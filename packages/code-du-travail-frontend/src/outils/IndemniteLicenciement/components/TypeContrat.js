import React from "react";
import PropTypes from "prop-types";

import { Field } from "react-final-form";
import {
  Label,
  RadioContainer,
  QuestionParagraphe
} from "../../common/stepStyles";
import { required } from "../../common/validators";
import { ErrorField } from "./ErrorField";

function TypeContrat({ name }) {
  return (
    <>
      <QuestionParagraphe>
        Quel est votre type de contrat&nbsp;?
      </QuestionParagraphe>
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
      </RadioContainer>
      <ErrorField name={name} />
    </>
  );
}

TypeContrat.propTypes = {
  name: PropTypes.string.isRequired
};

export { TypeContrat };
