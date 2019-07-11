import React from "react";
import PropTypes from "prop-types";

import { Field } from "react-final-form";
import {
  Label,
  RadioContainer,
  QuestionParagraphe
} from "../../common/stepStyles";
import { required } from "../../common/validators";

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
          <span>Contrat à durée déterminée (CDD)</span>
        </Label>
        <Label>
          <Field
            component="input"
            type="radio"
            name={name}
            value="ctt"
            validate={required}
          />
          <span>Contrat de travail temporaire (Contrat d’intérim)</span>
        </Label>
      </RadioContainer>
    </>
  );
}

TypeContrat.propTypes = {
  name: PropTypes.string.isRequired
};

export { TypeContrat };
