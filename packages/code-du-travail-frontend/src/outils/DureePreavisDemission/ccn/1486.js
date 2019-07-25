import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@cdt/ui";
import styled from "styled-components";

import { branches } from "../branches";
import { Condition } from "../../common/Condition";
import { SectionTitle } from "../../common/stepStyles";
import { SelectQuestion } from "../../common/SelectQuestion";

export const ETAM = "etam";
export const MANAGER = "manager";
export const INTERMITENT_INVESTIGATOR = "investigator";

const CATEGORIES = {
  [ETAM]: "etam",
  [MANAGER]: "cadres",
  [INTERMITENT_INVESTIGATOR]: "chargés d’enquête intermittent"
};

export const BETWEEN_200_355 = "200_355";
export const BETWEEN_400_500 = "400-500";

const COEFFICIENTS = {
  [BETWEEN_200_355]: "entre 200 et 355",
  [BETWEEN_400_500]: "entre 400 et 500"
};

export const LESS_THAN_24_MONTH = "<24";
export const MORE_THAN_24_MONTH = ">24";

const SENIORITY = {
  [LESS_THAN_24_MONTH]: "moins de 24 mois",
  [MORE_THAN_24_MONTH]: "supérieure à 24 mois"
};

export function Step1486() {
  return (
    <>
      <SectionTitle>Informations spécifiques</SectionTitle>
      <SelectQuestion
        name="category"
        label="Préciser votre catégorie professionnelle."
        options={CATEGORIES}
      />
      <Condition when="category" is={ETAM}>
        <SelectQuestion
          name="coefficient"
          label="Préciser votre coefficient hiérarchique."
          options={COEFFICIENTS}
        />
        <Alert>
          si vous ne connaissez pas votre coefficient hiérarchique,
          munissez-vous de votre dernier bulletin de salaire, où ce dernier doit
          obligatoirement figurer. Cette information se trouve souvent dans
          l’en-tête.
        </Alert>
        <Condition when="coefficient" is={BETWEEN_200_355}>
          <SelectQuestion
            name="seniority"
            label="Préciser votre ancienneté."
            options={SENIORITY}
          />
          <ItalicP>
            L’ancienneté comprend la durée totale de présence en entreprise,
            contrats de travail successifs compris. Les contrats successifs
            rompus par une démission ou en cas de faute grave ou lourde ne sont
            pas comptabilisés
          </ItalicP>
        </Condition>
      </Condition>
    </>
  );
}

export function Result1486({ form }) {
  const values = form.getState().values;
  const preavis = computePreavis(values);
  const ccLabel = branches[values.branche];
  return (
    <>
      <p>
        En cas de démission, la <em>{ccLabel}</em> prévoit le respect d’un
        préavis d’une durée de <strong>{preavis}</strong> pour un{" "}
        {CATEGORIES[values.category]}
        {values.category === ETAM && (
          <>
            {" "}
            avec une coefficient {COEFFICIENTS[values.coefficient]}
            {values.coefficient === BETWEEN_200_355 && (
              <> et une ancienneté de {SENIORITY[values.seniority]}</>
            )}
          </>
        )}
      </p>
      <Alert>
        Le contrat de travail, un accord collectif d’entreprise ou un usage
        peuvent prévoir une durée de préavis plus courte. Vous pouvez également
        convenir d’une dispense par accord avec l’employeur.
      </Alert>
    </>
  );
}

Result1486.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export function computePreavis({ category, coefficient, seniority }) {
  switch (category) {
    case MANAGER:
      return "3 mois";
    case INTERMITENT_INVESTIGATOR:
      return "1 mois";
    default: {
      // ETAM
      if (coefficient === BETWEEN_200_355 && seniority === LESS_THAN_24_MONTH) {
        return "1 mois";
      }
      return "2 mois";
    }
  }
}

export default [
  {
    name: `branche_1486`,
    component: Step1486,
    label: "Informations spécifiques"
  },
  {
    name: `branche_1486_results`,
    component: Result1486,
    label: "Durée du préavis"
  }
];

const ItalicP = styled.p`
  font-style: italic;
`;
