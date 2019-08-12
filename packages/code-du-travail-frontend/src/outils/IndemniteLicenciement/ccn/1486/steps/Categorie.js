import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { SectionTitle, Label } from "../../../../common/stepStyles";
import { required } from "../../../../common/validators";
import { stepAnciennete, stepSalaire } from "../index";

export const CATEGORIE_KEY = "brancheCategorie";

const CATEGORIES = {
  ETAM: "Employé, Technicien, Agent de Maîtrise",
  IC: "Ingénieur Cadre",
  CENI: "Chargé d'enquête non intermittent",
  CEI: "Chargé d'enquête intermittent"
};

export const Categorie = ({ dispatch }) => (
  <>
    <SectionTitle>Catégorie professionnelle</SectionTitle>
    <p>
      Quelle est votre catégorie d’après la convention collective ?<br />
      Vous pouvez la trouver sur votre bulletin de paie.
    </p>
    <Field name={CATEGORIE_KEY} validate={required}>
      {({ input }) => (
        <>
          <Label htmlFor="categorie">
            Sélectionnez une catégorie professionnelle
          </Label>
          <select {...input} id="categorie">
            <option disabled value="">
              Sélectionner
            </option>
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </>
      )}
    </Field>
    <OnChange name={CATEGORIE_KEY}>
      {currentCategorie => {
        if (currentCategorie === "CEI") {
          dispatch({ type: "remove_step", payload: stepSalaire.name });
        } else {
          dispatch({
            type: "add_step",
            payload: { insertAfter: stepAnciennete.name, step: stepSalaire }
          });
        }
      }}
    </OnChange>
  </>
);
