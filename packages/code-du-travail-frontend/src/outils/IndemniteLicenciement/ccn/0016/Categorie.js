import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import { Select } from "@socialgouv/react-ui";

import { required } from "../../../common/validators";
import { Label, SectionTitle } from "../../../common/stepStyles";

export const OUVRIER = "ouvrier";
export const TAM = "tam";
export const CADRE = "cadre";

export const Categories = {
  [OUVRIER]: "Ouvriers et employés",
  [TAM]: "Techniciens et agents de maîtrise (TAM)",
  [CADRE]: "Cadre"
};

function Categorie({ name }) {
  return (
    <>
      <SectionTitle>Quelle est la catégorie du salarié&nbsp;?</SectionTitle>
      <p>Cette information se trouve sur le bulletin de salaire.</p>
      <Field name={name} validate={required}>
        {({ input }) => (
          <>
            <Label htmlFor={`input-${name}`}>Sélectionnez une catégorie</Label>
            <Select {...input} id={`input-${name}`}>
              <option disabled value="" />
              {Object.entries(Categories).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </>
        )}
      </Field>
    </>
  );
}

Categorie.propTypes = {
  name: PropTypes.string.isRequired
};

export { Categorie };
