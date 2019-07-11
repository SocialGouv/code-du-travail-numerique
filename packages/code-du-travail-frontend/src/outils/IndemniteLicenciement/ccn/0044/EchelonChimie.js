import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";

import { coefficients } from "./coefficients";
import { required } from "../../../common/validators";
import { Label } from "../../../common/stepStyles";

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
      <p>
        Quel est votre échelon dans la convention collective ?<br />
        Vous pouvez le trouver sur votre bulletin de salaire
      </p>
      <Field name="echelon" validate={required}>
        {({ input }) => (
          <>
            <Label htmlFor="echelon">Sélectionnez un échelon</Label>
            <Select {...input} id="echelon">
              <option disabled value="" />
              {options}
            </Select>
          </>
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
EchelonChimie.propTypes = {
  name: PropTypes.string.isRequired
};
export { EchelonChimie };

const Select = styled.select`
  width: 100%;
`;
