import { PreavisRetraiteStore } from "../types";
import { stateToPublicode } from "./helpers";
import { computeWarningType } from "./computeWarningType";

const computeNotice = (state: PreavisRetraiteStore): PreavisRetraiteStore => {
  const values = state.formValues;
  const publicodes = state.publicodes;
  const result = publicodes.setSituation(stateToPublicode(values));
  const legalResult = publicodes!.execute(
    "contrat salarié . préavis de retraite légale en jours"
  );
  let agreementResult = publicodes!.execute(
    "contrat salarié . préavis de retraite collective en jours"
  );
  const agreementMaximumResult = publicodes!.execute(
    "contrat salarié . préavis de retraite collective maximum en jours"
  );

  const type =
    values.origin?.isRetirementMandatory === "oui" ? "mise" : "départ";

  const warningType = computeWarningType({
    resultValueInDays: result.result.valueInDays,
    ccNumber: values.ccn?.selected?.num,
    type,
  });

  return {
    ...state,
    steps: {
      ...state.steps,
      result: {
        notice: {
          result: result.result,
          agreement: {
            result: agreementResult,
            maximum:
              agreementMaximumResult.valueInDays > 0
                ? agreementMaximumResult
                : null,
          },
          legal: legalResult,
          type,
          notifications: publicodes.getNotifications(),
        },
        detail: {
          references: publicodes.getReferences(),
          values,
          situation: publicodes.data.situation,
          minYearCount: state.steps.seniority.minYearCount,
        },
        warning: {
          type: warningType,
          hasNotice: result.result.valueInDays > 0,
        },
      },
    },
  };
};

export default computeNotice;
