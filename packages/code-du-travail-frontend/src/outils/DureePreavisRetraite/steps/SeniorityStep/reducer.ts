import {
  PreavisRetraiteAction,
  PreavisRetraiteFormState,
  PreavisRetraiteState,
} from "../../types";
import { CommonActionName } from "../../../Components/Simulator/types";

const seniorityReducer = (
  state: PreavisRetraiteState,
  action: PreavisRetraiteAction<PreavisRetraiteFormState>
): PreavisRetraiteState => {
  if (action.type === CommonActionName.onChange) {
    const values = action.payload.values;
    const yearCount =
      values.agreement?.selected?.num === 2264 &&
      values.origin?.isRetirementMandatory === "oui"
        ? 5
        : 2;
    return {
      ...state,
      seniority: {
        minYearCount: yearCount,
        showAccurateSeniority: values.seniority?.moreThanXYear === false,
      },
    };
  }
  return state;
};

export default seniorityReducer;
