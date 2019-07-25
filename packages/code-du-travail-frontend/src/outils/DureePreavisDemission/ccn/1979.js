import React from "react";
import PropTypes from "prop-types";
import { Alert, Toast } from "@cdt/ui";

import { branches } from "../branches";
import { SectionTitle } from "../../common/stepStyles";
import { SelectQuestion } from "../../common/SelectQuestion";

export const EMPLOYEE = "employee";
export const MASTER = "master";
export const MANAGER = "manager";

const CATEGORIES = {
  [EMPLOYEE]: "employés",
  [MASTER]: "agents de Maîtrise",
  [MANAGER]: "cadres"
};

export const LESS_THAN_6_MONTH = "<6";
export const BETWEEN_6_AND_24_MONTH = "6<a<24";
export const MORE_THAN_24_MONTH = ">24";

const SENIORITY = {
  [LESS_THAN_6_MONTH]: "moins de 6 mois",
  [BETWEEN_6_AND_24_MONTH]: "entre 6 et 24 mois",
  [MORE_THAN_24_MONTH]: "supérieure à 24 mois"
};

export function Step1979() {
  return (
    <>
      <SectionTitle>Informations spécifiques</SectionTitle>
      <SelectQuestion
        name="category"
        label="Préciser votre catégorie professionnelle."
        options={CATEGORIES}
      />
      <SelectQuestion
        name="seniority"
        label="Préciser votre ancienneté dans l’entreprise."
        options={SENIORITY}
      />
    </>
  );
}

export function Result1979({ form }) {
  const values = form.getState().values;
  const preavis = computePreavis(values);
  const ccLabel = branches[values.branche];
  return (
    <>
      <p>
        En cas de démission, la <em>{ccLabel}</em> prévoit le respect d’un
        préavis d’une durée de <strong>{preavis}</strong> pour un{" "}
        {CATEGORIES[values.category]} avec une ancienneté{" "}
        {SENIORITY[values.seniority]}
      </p>
      <Alert>
        Le contrat de travail, un accord collectif d’entreprise ou un usage
        peuvent prévoir une durée de préavis plus courte. Vous pouvez également
        convenir d’une dispense par accord avec l’employeur.
      </Alert>
      <br />
      <Toast variant="warning">
        Attention, votre branche prévoit que la démission doit faire l’objet
        d’une lettre recommandé avec accusé de réception ou une remise en main
        propre contre décharge
      </Toast>
    </>
  );
}

Result1979.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export function computePreavis({ category, seniority }) {
  const duration = {
    [EMPLOYEE]: {
      [LESS_THAN_6_MONTH]: "8 jours",
      [BETWEEN_6_AND_24_MONTH]: "15 jours",
      [MORE_THAN_24_MONTH]: "1 mois"
    },
    [MASTER]: {
      [LESS_THAN_6_MONTH]: "15 jours",
      [BETWEEN_6_AND_24_MONTH]: "1 mois",
      [MORE_THAN_24_MONTH]: "1 mois"
    },
    [MANAGER]: {
      [LESS_THAN_6_MONTH]: "1 mois",
      [BETWEEN_6_AND_24_MONTH]: "3 mois",
      [MORE_THAN_24_MONTH]: "3 mois"
    }
  };
  return duration[category][seniority];
}

export default [
  {
    name: `branche_1979`,
    component: Step1979,
    label: "Informations spécifiques"
  },
  {
    name: `branche_1979_results`,
    component: Result1979,
    label: "Durée du préavis"
  }
];
