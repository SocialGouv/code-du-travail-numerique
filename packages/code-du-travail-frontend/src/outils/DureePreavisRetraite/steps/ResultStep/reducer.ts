import {
  PreavisRetraiteAction,
  PreavisRetraiteFormState,
  PreavisRetraiteState,
} from "../../types";
import {
  PublicodesContextType,
  PublicodesPreavisRetraiteResult,
} from "../../../publicodes";
import { CommonActionName } from "../../../Components/Simulator/types";
import { stateToPublicode } from "../../stateToPublicodes";

const resultReducer = (
  state: PreavisRetraiteState,
  action: PreavisRetraiteAction<PreavisRetraiteFormState>,
  publicodesContext: PublicodesContextType<PublicodesPreavisRetraiteResult>
): PreavisRetraiteState => {
  if (action.type === CommonActionName.changeStep) {
    const values = action.payload.values;
    publicodesContext.setSituation(stateToPublicode(values));
    const notifications = publicodesContext.getNotifications();
    const agreementMaximumResult = publicodesContext.execute(
      "contrat salarié . préavis de retraite collective maximum en jours"
    );
    return {
      ...state,
      result: {
        notice: {
          publicodesResult: publicodesContext.result,
          type:
            values.origin?.isRetirementMandatory === "oui" ? "mise" : "départ",
          agreementMaximumResult,
          notifications,
        },
      },
    };
  }
  return state;
};

export default resultReducer;
