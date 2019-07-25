import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@cdt/ui";

import { branches } from "../branches";
import { Condition } from "../../common/Condition";
import { SectionTitle } from "../../common/stepStyles";
import { SelectQuestion } from "../../common/SelectQuestion";

export const WORKER = "ouvrier";
export const ETAM = "etam";
export const MANAGER = "manager";

const CATEGORIES = {
  [WORKER]: "ouvriers et employés",
  [ETAM]: "ETAM",
  [MANAGER]: "cadre"
};

export const LESS_THAN_6_MONTH = "<6";
export const BETWEEN_6_AND_24_MONTH = "6<a<24";
export const MORE_THAN_24_MONTH = ">24";

const SENIORITY = {
  [LESS_THAN_6_MONTH]: "moins de 6 mois",
  [BETWEEN_6_AND_24_MONTH]: "entre 6 et 24 mois",
  [MORE_THAN_24_MONTH]: "supérieure à 24 mois"
};

export function Step0843() {
  return (
    <>
      <SectionTitle>Informations spécifiques</SectionTitle>
      <SelectQuestion
        name="category"
        label="Préciser votre catégorie professionnelle."
        options={CATEGORIES}
      />
      <Condition when="category" is={value => value && value !== MANAGER}>
        <SelectQuestion
          name="seniority"
          label="Préciser votre ancienneté dans l’entreprise."
          options={SENIORITY}
        />
      </Condition>
    </>
  );
}

export function Result0843({ form }) {
  const values = form.getState().values;
  const preavis = computePreavis(values);
  const ccLabel = branches[values.branche];
  return (
    <>
      <p>
        En cas de démission, la <em>{ccLabel}</em> prévoit le respect d’un
        préavis d’une durée de <strong>{preavis}</strong> pour un{" "}
        {CATEGORIES[values.category]}
      </p>
      <Alert>
        Le contrat de travail, un accord collectif d’entreprise ou un usage
        peuvent prévoir une durée de préavis plus courte. Vous pouvez également
        convenir d’une dispense par accord avec l’employeur.
      </Alert>
    </>
  );
}

Result0843.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export function computePreavis({ category, seniority }) {
  if (category === MANAGER) return "2 mois";

  switch (seniority) {
    case BETWEEN_6_AND_24_MONTH:
    case MORE_THAN_24_MONTH:
      return "2 semaines";
    default:
      //LESS_THAN_6_MONTH:
      return "1 semaine";
  }
}

export default [
  {
    name: `branche_0843`,
    component: Step0843,
    label: "Informations spécifiques"
  },
  {
    name: `branche_0843_results`,
    component: Result0843,
    label: "Durée du préavis"
  }
];
