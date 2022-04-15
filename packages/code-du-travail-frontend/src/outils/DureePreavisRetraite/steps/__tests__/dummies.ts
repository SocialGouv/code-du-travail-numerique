import { PreavisRetraiteFormState, PreavisRetraiteState } from "../../types";
import { initialState } from "../../stepReducer";
import {
  PublicodesContextType,
  PublicodesConvertedUnit,
  PublicodesPreavisRetraiteResult,
} from "../../../publicodes";

export const stateDummy: PreavisRetraiteState = {
  ...initialState,
};

export const publicodesDummy: PublicodesContextType<PublicodesPreavisRetraiteResult> =
  {
    setSituation: () => {},
    missingArgs: [],
    execute: () => ({
      unit: PublicodesConvertedUnit.MONTH,
      value: 1,
      valueInDays: 30,
    }),
    getNotifications: () => [],
    getReferences: () => [],
    result: {
      unit: PublicodesConvertedUnit.MONTH,
      value: 1,
      valueInDays: 30,
    },
    situation: [],
  };

export const formValuesDummy: PreavisRetraiteFormState = {};
