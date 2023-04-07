import { heuresRechercheEmploiData as data } from "@socialgouv/modeles-social";
import { useEffect } from "react";

import { SelectQuestion } from "../../common/SelectQuestion";
import {
  formatOption,
  getSituationsFor,
  orderCriteria,
} from "../../common/situations.utils";
import { SectionTitle } from "../../common/stepStyles";

const { questions, situations: allSituations } = data;

const question = questions.find((q) => q.name === "type de rupture");

function StepTypeRupture({ form }) {
  const { values } = form.getState();
  const { ccn } = values;

  const idcc = ccn?.selected ? ccn.selected.num : 0;

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
        data-test-id="typeRupture"
        label={question?.question ?? ""}
        options={nextQuestionOptions}
      />
    </>
  );
}

export { StepTypeRupture };
