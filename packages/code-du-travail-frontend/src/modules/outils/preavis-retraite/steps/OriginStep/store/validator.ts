import { deepEqualObject } from "src/modules/utils/object";
import { OriginDepartStoreError, OriginDepartStoreInput } from "./types";

export const validateStep = (state: OriginDepartStoreInput) => {
  const errorState: OriginDepartStoreError = {
    errorOriginDepart: !state.originDepart
      ? "Vous devez répondre à cette question"
      : undefined,
  };
  return {
    isValid: deepEqualObject(errorState, {
      errorOriginDepart: undefined,
    }),
    errorState,
  };
};
