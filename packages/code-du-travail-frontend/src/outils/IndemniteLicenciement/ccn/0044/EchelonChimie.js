import { Select } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";

import { Question } from "../../../common/Question";
import { Label } from "../../../common/stepStyles";
import { required } from "../../../common/validators";
import { coefficients } from "./coefficients";

const groupeLabelByCoeff = coefficients.reduce(
  (state, { coefficient, groupe, label }) => {
    if (!state.has(coefficient)) {
      state.set(coefficient, { groupe, labels: [label] });
    } else {
      state.get(coefficient).labels.push(label);
    }
    return state;
  },
  new Map()
);

const options = [...groupeLabelByCoeff].map(([coefficient, { groupe }]) => {
  return (
    <option key={`${groupe}-${coefficient}`} value={coefficient}>
      {coefficient}
    </option>
  );
});

function EchelonChimie({ name }) {
  const [labels, setLabels] = useState();
  return (
    <>
      <Question>
        Quel est l’échelon du salarié&nbsp;?
        <br />
        Cette information se trouve sur le bulletin de salaire.
      </Question>
      <Field name="echelon" validate={required}>
        {({ input }) => (
          <>
            <Label htmlFor="echelon">Sélectionnez un échelon</Label>
            <StyledSelect {...input} id="echelon">
              <option disabled value="" />
              {options}
            </StyledSelect>
          </>
        )}
      </Field>

      <Field name={name}>
        {({ input }) => (
          <OnChange name="echelon">
            {(coefficient) => {
              if (coefficient) {
                const { groupe, labels } = groupeLabelByCoeff.get(coefficient);
                setLabels(labels);
                input.onChange(groupe);
              } else {
                setLabels(null);
              }
            }}
          </OnChange>
        )}
      </Field>

      {labels && (
        <ul>
          {labels.map((label, index) => (
            <li key={`label-${index}`}>{label}</li>
          ))}
        </ul>
      )}
    </>
  );
}
EchelonChimie.propTypes = {
  name: PropTypes.string.isRequired,
};
export { EchelonChimie };

const StyledSelect = styled(Select)`
  width: 100%;
`;
