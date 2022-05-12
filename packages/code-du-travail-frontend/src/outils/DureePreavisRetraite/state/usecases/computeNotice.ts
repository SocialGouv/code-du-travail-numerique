import { PreavisRetraiteStore } from "../types";
import { stateToPublicode } from "./helpers";

const computeNotice = (state: PreavisRetraiteStore): PreavisRetraiteStore => {
  const values = state.formValues;
  const publicodes = state.publicodes;
  const result = publicodes.setSituation(stateToPublicode(values));
  const legalResult = publicodes.execute(
    "contrat salarié . préavis de retraite légale en jours"
  );
  let agreementResult = publicodes.execute(
    "contrat salarié . préavis de retraite collective en jours"
  );
  const agreementMaximumResult = publicodes.execute(
    "contrat salarié . préavis de retraite collective maximum en jours"
  );

  return {
    ...state,
    steps: {
      ...state.steps,
      result: {
        notice: {
          result: result.result,
          agreement: {
            result: agreementResult,
            maximum: agreementMaximumResult,
          },
          legal: legalResult,
          type:
            values.origin?.isRetirementMandatory === "oui" ? "mise" : "départ",
          notifications: publicodes.getNotifications(),
        },
        detail: {
          references: publicodes.getReferences(),
          values,
          situation: publicodes.data.situation,
          minYearCount: state.steps.seniority.minYearCount,
        },
      },
    },
  };
};

export default computeNotice;
