import React, { useState } from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";

import { coefficients } from "./0044_coefficient";
import { required } from "../validators";

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
      <p>Quel est votre échelon dans la convention collective ?</p>
      <Field name="echelon" validate={required}>
        {({ input }) => (
          <Select {...input}>
            <option disabled value="">
              Sélectionnez un échelon
            </option>
            {options}
          </Select>
        )}
      </Field>

      <Field name={name} subscribe={{}}>
        {({ input }) => (
          <OnChange name="echelon">
            {coefficient => {
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

export { EchelonChimie };

const Select = styled.select`
  width: 100%;
`;
