import React from "react";
import data from "@cdt/data...simulateurs/heures-recherche-emploi.data.json";

import { SelectQuestion } from "../../common/SelectQuestion";
import { SectionTitle } from "../../common/stepStyles";
import {
  getSituationsFor,
  formatOption,
  orderCriteria,
} from "../../common/situations.utils";

const { questions, situations: allSituations } = data;

export const RUPTURE_QUESTION_ID = "typeRupture";
const { question: QUESTION_LABEL } = questions.find(
  (q) => q.name === "type de rupture"
);

function StepTypeRupture({ form }) {
  const { values } = form.getState();
  const { ccn } = values;
  values.criteria = {};
  const idcc = ccn ? ccn.num : 0;

  const initialSituations = getSituationsFor(allSituations, { idcc });

  const dupValues = initialSituations.map(({ typeRupture }) => typeRupture);
  const nextQuestionOptions = [...new Set(dupValues)]
    .filter(Boolean)
    .sort(orderCriteria)
    .map(formatOption);

  return (
    <>
      <SectionTitle>Type de rupture du contrat de travail</SectionTitle>

      <SelectQuestion
        name="typeRupture"
        label={QUESTION_LABEL}
        options={nextQuestionOptions}
      />
    </>
  );
}

export { StepTypeRupture };
