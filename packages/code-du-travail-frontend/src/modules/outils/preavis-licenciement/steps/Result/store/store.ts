import { create } from "zustand";
import { ResultStoreSlice } from "./types";

export const createResultStore = () =>
  create<ResultStoreSlice>((set, get) => ({
    resultData: {
      input: {
        result: undefined,
        calculatedData: undefined,
      },
      error: {},
      hasBeenSubmit: false,
      isStepValid: true,
      publicodes: {},
    },
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
  }));
