import produce from "immer";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { StoreSliceWrapperPreavisDemission } from "../../store";
import { InformationsStoreData, InformationsStoreSlice } from "./types";
import { RuleType } from "@socialgouv/modeles-social";

const initialState: InformationsStoreData = {
  input: {
    publicodesInformations: [],
    hasNoMissingQuestions: true,
    informationError: false,
    seniority: undefined,
  },
  error: {
    errorInformations: {},
    errorSeniority: undefined,
  },
  hasBeenSubmit: false,
  isStepValid: false,
};

const createInformationsStore: StoreSliceWrapperPreavisDemission<
  InformationsStoreSlice
> = (set, get) => ({
  informationsData: { ...initialState },
  informationsFunction: {
    onInformationsChange: (
      questionKey: string,
      value: string,
      type: RuleType | undefined
    ) => {
      // Pour le préavis de démission, nous n'avons généralement pas d'informations supplémentaires
      // Cette fonction est maintenue pour la compatibilité
    },
    generatePublicodesQuestions: (): boolean => {
      // Pour le préavis de démission, pas de questions supplémentaires nécessaires
      return true;
    },
    onSeniorityChange: (seniority: string) => {
      set(
        produce((state: InformationsStoreSlice) => {
          const seniorityNumber = parseInt(seniority);

          // Validation de l'ancienneté
          if (isNaN(seniorityNumber) || seniorityNumber < 0) {
            state.informationsData.error.errorSeniority =
              "L'ancienneté doit être un nombre positif";
            state.informationsData.isStepValid = false;
          } else if (seniorityNumber > 600) {
            // 50 ans * 12 mois
            state.informationsData.error.errorSeniority =
              "L'ancienneté ne peut pas dépasser 50 ans";
            state.informationsData.isStepValid = false;
          } else {
            state.informationsData.error.errorSeniority = undefined;
            state.informationsData.input.seniority = seniority;
            state.informationsData.isStepValid = seniorityNumber > 0;
          }
        })
      );
    },
    onNextStep: (): ValidationResponse => {
      const currentState = get();
      const seniority = currentState.informationsData.input.seniority;

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = true;

          if (!seniority || parseInt(seniority) <= 0) {
            state.informationsData.error.errorSeniority =
              "Veuillez saisir votre ancienneté";
            state.informationsData.isStepValid = false;
          } else {
            state.informationsData.isStepValid = true;
          }
        })
      );

      return currentState.informationsData.isStepValid
        ? ValidationResponse.Valid
        : ValidationResponse.Valid;
    },
  },
});

export default createInformationsStore;
