import {
  CommonInformationsStoreError,
  CommonInformationsStoreInput,
} from "./types";

export const validateStep = (state: CommonInformationsStoreInput) => {
  const informations = state.informations;
  let res = {
    isValid: true,
    errorState: {} as CommonInformationsStoreError,
  };
  Object.values(informations).forEach((value, index) => {
    if (value === "" || value === undefined) {
      res = {
        isValid: false,
        errorState: {
          errorInformations: {
            ...res.errorState.errorInformations,
            [Object.keys(informations)[index]]: "Veuillez remplir ce champ",
          },
        },
      };
    }
  });
  return res;
};
