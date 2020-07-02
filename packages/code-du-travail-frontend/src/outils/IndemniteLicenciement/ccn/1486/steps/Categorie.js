import { Select } from "@socialgouv/react-ui";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { Label, SectionTitle } from "../../../../common/stepStyles";
import { required } from "../../../../common/validators";
import { stepAnciennete, stepSalaire } from "../index";

export const CATEGORIE_KEY = "brancheCategorie";

const CATEGORIES = {
  CEI: "Chargé d'enquête intermittent",
  CENI: "Chargé d'enquête non intermittent",
  ETAM: "Employé, Technicien, Agent de Maîtrise",
  IC: "Ingénieur Cadre",
};

export const Categorie = ({ dispatch }) => (
  <>
    <SectionTitle>Catégorie professionnelle</SectionTitle>
    <p>
      Quelle est la catégorie du salarié&nbsp;?
      <br />
      Cette information se trouve sur le bulletin de salaire.
    </p>
    <Field name={CATEGORIE_KEY} validate={required}>
      {({ input }) => (
        <>
          <Label htmlFor="categorie">
            Sélectionnez une catégorie professionnelle
          </Label>
          <Select {...input} id="categorie">
            <option disabled value="">
              Sélectionner
            </option>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </Select>
        </>
      )}
    </Field>
    <OnChange name={CATEGORIE_KEY}>
      {(currentCategorie) => {
        if (currentCategorie === "CEI") {
          dispatch({ payload: stepSalaire.name, type: "remove_step" });
        } else {
          dispatch({
            payload: { insertAfter: stepAnciennete.name, step: stepSalaire },
            type: "add_step",
          });
        }
      }}
    </OnChange>
  </>
);
