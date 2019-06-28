import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

import { required } from "../../validators";
import { Label, SectionTitle } from "../../components/styledComponents";

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
      <SectionTitle>
        Quel est votre catégorie dans la convention collective ?
      </SectionTitle>
      <p>Vous pouvez le trouver sur votre bulletin de salaire</p>
      <Field name={name} validate={required}>
        {({ input }) => (
          <>
            <Label htmlFor={`input-${name}`}>Sélectionnez une catégorie</Label>
            <select {...input} id={`input-${name}`}>
              <option disabled value="" />
              {Object.entries(Categories).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
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
