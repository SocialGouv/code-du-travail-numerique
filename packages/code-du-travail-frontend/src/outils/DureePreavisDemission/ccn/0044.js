import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@cdt/ui";

import { branches } from "../branches";
import { SectionTitle } from "../../common/stepStyles";
import { SelectQuestion } from "../../common/SelectQuestion";

export const LESS_THAN_160 = "<160";
export const BETWEEN_160_190 = "160-190";
export const BETWEEN_190_275 = "190-175";
export const GREATER_THAN_275 = ">175";

const COEFFICIENTS = {
  [LESS_THAN_160]: "inférieur à 160",
  [BETWEEN_160_190]: "entre 160 et 190",
  [BETWEEN_190_275]: "entre 190 et 275",
  [GREATER_THAN_275]: "supérieur à 275"
};

export function Step0044() {
  return (
    <>
      <SectionTitle>Informations spécifiques</SectionTitle>

      <SelectQuestion
        name="coefficient"
        label="Précisez votre niveau ou coefficient hiérarchique."
        options={COEFFICIENTS}
      />
      <Alert>
        Si vous ne connaissez pas votre coefficient hiérarchique, munissez-vous
        Alert votre dernier bulletin de salaire, où ce dernier doit
        obligatoirement figurer. Cette information se trouve souvent dans
        l’en-tête.
      </Alert>
    </>
  );
}

Step0044.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export function Result0044({ form }) {
  const values = form.getState().values;
  const preavis = computePreavis(values);
  const ccLabel = branches[values.branche];
  return (
    <>
      <p>
        En cas de démission, la <em>{ccLabel}</em> prévoit le respect d’un
        préavis d’une durée de <strong>{preavis}</strong> pour un employé avec
        un coéfficient <em>{COEFFICIENTS[values.coefficient]}</em>
      </p>
      <Alert>
        Le contrat de travail, un accord collectif d’entreprise ou un usage
        peuvent prévoir une durée de préavis plus courte. Vous pouvez également
        convenir d’une dispense par accord avec l’employeur.
      </Alert>
    </>
  );
}

Result0044.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export default [
  {
    name: `branche_0044`,
    component: Step0044,
    label: "Informations spécifiques"
  },
  {
    name: `branche_0044_results`,
    component: Result0044,
    label: "Durée du préavis"
  }
];

export function computePreavis({ coefficient }) {
  switch (coefficient) {
    case BETWEEN_160_190:
      return "1 mois";
    case BETWEEN_190_275:
      return "2 mois";
    case GREATER_THAN_275:
      return "3 mois";
    default:
      // LESS_THAN_160:
      return "15 jours";
  }
}
