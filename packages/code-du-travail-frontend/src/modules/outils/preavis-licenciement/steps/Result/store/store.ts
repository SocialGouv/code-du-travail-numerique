import { ResultStoreSlice } from "./types";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";

const initialState = {
  input: {
    result: undefined,
    calculatedData: undefined,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
  publicodes: {},
};

const createResultStore: StoreSliceWrapperPreavisLicenciement<
  ResultStoreSlice
> = (set, get) => ({
  resultData: { ...initialState },
  resultFunction: {
    calculateResult: () => {
      // Logic to calculate the result based on all previous steps
      const mockResult = {
        duration: "1 mois",
        amount: "2 500 €",
        details: [
          "Durée du préavis basée sur l'ancienneté du salarié",
          "Calcul selon les dispositions du Code du travail",
          "Prise en compte de la convention collective applicable",
        ],
        references: [
          "Article L1234-1 du Code du travail",
          "Article L1237-1 du Code du travail",
        ],
      };

      set((state) => ({
        ...state,
        resultData: {
          ...state.resultData,
          input: {
            ...state.resultData.input,
            result: mockResult,
            calculatedData: mockResult,
          },
        },
      }));
    },
    resetStep: () => {
      set((state) => ({
        ...state,
        resultData: {
          ...state.resultData,
          input: {
            result: undefined,
            calculatedData: undefined,
          },
          error: {},
          hasBeenSubmit: false,
          isStepValid: true,
        },
      }));
    },
  },
});

export { createResultStore };
