import {
  PreavisRetraiteAction,
  PreavisRetraiteFormState,
  PreavisRetraiteState,
} from "../../types";
import {
  mapToPublicodesSituationForPreavisDeRetraite,
  PublicodesContextType,
  PublicodesPreavisRetraiteResult,
} from "../../../publicodes";
import { CommonActionName } from "../../../Components/Simulator/types";

const originReducer = (
  state: PreavisRetraiteState,
  action: PreavisRetraiteAction<PreavisRetraiteFormState>
): PreavisRetraiteState => {
  if (action.type === CommonActionName.onChange) {
    const values = action.payload.values;
    return {
      ...state,
      origin: {
        showWarning: values.origin?.isRetirementMandatory
          ? values.origin.isRetirementMandatory === "oui"
          : false,
      },
    };
  }
  return state;
};

export default originReducer;
