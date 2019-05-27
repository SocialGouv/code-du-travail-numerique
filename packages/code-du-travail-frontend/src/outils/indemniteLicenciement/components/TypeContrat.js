import React from "react";
import { Field } from "react-final-form";
import { ErrorField } from "./ErrorField";
import { Label, RadioContainer, QuestionLabel } from "../stepStyles";
import { required } from "../validators";

function TypeContrat() {
  return (
    <>
      <QuestionLabel>Quel est votre type de contrat&nbsp;?</QuestionLabel>
      <RadioContainer>
        <Label>
          <Field
            component="input"
            type="radio"
            name="contrat"
            value="cdd"
            validate={required}
          />
          <span>Contrat à durée determiné (CDD) ou contrat d’intérim</span>
        </Label>
        <Label>
          <Field
            component="input"
            type="radio"
            name="contrat"
            value="ctt"
            validate={required}
          />
          <span>Contrat de travail temporaire (intérimaire)</span>
        </Label>
        <Label>
          <Field
            component="input"
            type="radio"
            name="contrat"
            value="cdi"
            validate={required}
          />
          <span>Contrat à durée indeterminé (CDI)</span>
        </Label>
      </RadioContainer>
      <ErrorField name="contrat" />
    </>
  );
}

export { TypeContrat };
