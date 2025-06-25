import { StoreApi } from "zustand";
import produce from "immer";
import { MissingArgs } from "@socialgouv/modeles-social";
import * as Sentry from "@sentry/nextjs";

import { StoreSliceWrapperIndemnitePrecarite } from "../../store";
import { InformationsStoreData, InformationsStoreSlice } from "./types";
import { AgreementStoreSlice } from "../../Agreement/store";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep, isValidField } from "./validator";
import { ContractType } from "../../../types";
import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import { removeDuplicateObject } from "src/lib";

const initialState: InformationsStoreData = {
  input: {
    contractType: undefined,
    criteria: {},
    publicodesInformations: [],
    hasNoMissingQuestions: true,
    informationError: false,
  },
  error: {
    contractType: undefined,
    criteria: undefined,
    errorInformations: {},
    errorPublicodes: undefined,
    errorIneligibility: undefined,
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createInformationsStore: StoreSliceWrapperIndemnitePrecarite<
  InformationsStoreSlice,
  AgreementStoreSlice
> = (set, get) => ({
  informationsData: {
    ...initialState,
  },
  informationsFunction: {
    onContractTypeChange: (contractType: ContractType) => {
      applyGenericValidation(get, set, "contractType", contractType);
      // Reset des critères quand on change de type de contrat
      applyGenericValidation(get, set, "criteria", {});
    },
    onCriteriaChange: (criteria) => {
      applyGenericValidation(get, set, "criteria", criteria);
    },
    generatePublicodesQuestions: (): boolean => {
      const publicodes = get().agreementData.publicodes;
      const agreement = get().agreementData.input.agreement;
      const existingQuestions =
        get().informationsData.input.publicodesInformations;

      if (!publicodes) {
        return false;
      }

      if (!agreement) {
        return false;
      }

      // Si des questions existent déjà, ne pas les régénérer
      if (existingQuestions.length > 0) {
        return true;
      }

      try {
        // Situation de base pour l'indemnité de précarité
        const situation = {
          "contrat salarié . convention collective": `'IDCC${agreement.num}'`,
        };

        const result = publicodes.calculate(situation);

        let resultMissingArgs: MissingArgs[] = [];
        if (result.type === "missing-args") {
          resultMissingArgs = result.missingArgs;
        }

        const missingArgs = resultMissingArgs.filter(
          (item) => item.rawNode.cdtn
        );

        if (missingArgs.length > 0) {
          const firstMissingArg = missingArgs[0];
          const questions = [
            {
              order: 0,
              id: `question-${firstMissingArg.name}-0`,
              question: {
                name: firstMissingArg.name,
                rule: firstMissingArg.rawNode,
              },
              info: undefined,
            },
          ];

          set(
            produce((state: InformationsStoreSlice) => {
              state.informationsData.input.publicodesInformations = questions;
              state.informationsData.input.hasNoMissingQuestions = false;
            })
          );
          return true;
        }

        set(
          produce((state: InformationsStoreSlice) => {
            state.informationsData.input.publicodesInformations = [];
            state.informationsData.input.hasNoMissingQuestions = true;
            state.informationsData.error.errorInformations = {};
            state.informationsData.isStepValid = true;
          })
        );
        return true;
      } catch (e) {
        Sentry.captureException(e);
        set(
          produce((state: InformationsStoreSlice) => {
            state.informationsData.input.informationError = true;
          })
        );
        return false;
      }
    },
    onInformationsChange: (key, value, type) => {
      let newPublicodesInformationsForNextQuestions: PublicodesInformation[];
      let hasNoMissingQuestions = false;
      let informationError = false;
      const publicodesInformations =
        get().informationsData.input.publicodesInformations;
      const questionAnswered = publicodesInformations.find(
        (question) => question.question.rule.nom === key
      );
      if (!questionAnswered) {
        throw new Error(`Question ${key} is not found`);
      }
      const currentInformations: PublicodesInformation = {
        info: value,
        id: questionAnswered.id,
        order: questionAnswered.order,
        question: questionAnswered.question,
      };
      const newPublicodesInformations = [
        currentInformations,
        ...publicodesInformations.filter(
          (el) => el.order < questionAnswered.order
        ),
      ].sort((a, b) => a.order - b.order);

      if (isValidField(value, type) === undefined) {
        const publicodes = get().agreementData.publicodes!;
        const agreement = get().agreementData.input.agreement;
        const rules = informationToSituation(newPublicodesInformations);
        let missingArgs: MissingArgs[] = [];
        try {
          const situation = {
            "contrat salarié . convention collective": `'IDCC${agreement?.num}'`,
            ...rules,
          };
          const result = publicodes.calculate(situation);

          if (result.type === "missing-args") {
            missingArgs = result.missingArgs.filter(
              (item) => item.rawNode.cdtn
            );
          }
        } catch (e) {
          informationError = true;
          console.error(e);
        }
        const newQuestions =
          missingArgs.length > 0
            ? [
                {
                  question: {
                    name: missingArgs[0].name,
                    rule: missingArgs[0].rawNode,
                  },
                  order: questionAnswered.order + 1,
                  info: undefined,
                  id: `question-${missingArgs[0].name}-${questionAnswered.order + 1}`,
                },
              ]
            : [];
        if (missingArgs.length === 0) {
          newPublicodesInformationsForNextQuestions =
            newPublicodesInformations.filter(
              (el) => el.order <= questionAnswered.order
            );
        } else {
          newPublicodesInformationsForNextQuestions = removeDuplicateObject(
            [...newQuestions, ...newPublicodesInformations].sort(
              (a, b) => a.order - b.order
            ),
            "order"
          ) as PublicodesInformation[];
        }
        hasNoMissingQuestions = missingArgs.length === 0;
      } else {
        newPublicodesInformationsForNextQuestions = newPublicodesInformations;
      }
      applyGenericValidation(
        get,
        set,
        "publicodesInformations",
        newPublicodesInformationsForNextQuestions
      );
      applyGenericValidation(
        get,
        set,
        "hasNoMissingQuestions",
        hasNoMissingQuestions
      );
      applyGenericValidation(get, set, "informationError", informationError);
    },
    checkIneligibility: (): boolean => {
      const publicodes = get().agreementData.publicodes;
      const agreement = get().agreementData.input.agreement;
      const publicodesInformations =
        get().informationsData.input.publicodesInformations;

      if (!publicodes || !agreement) {
        return false;
      }

      try {
        const rules = informationToSituation(publicodesInformations);
        const situation = {
          "contrat salarié . convention collective": `'IDCC${agreement.num}'`,
          ...rules,
        };

        const result = publicodes.calculate(situation);

        if (result.type === "ineligibility") {
          return true;
        }

        return false;
      } catch (e) {
        console.error("Error checking ineligibility:", e);
        return false;
      }
    },
    shouldSkipStep: () => {
      const state = get();
      // Skip si pas de convention collective
      return !state.agreementData.input.agreement;
    },
    resetQuestions: () => {
      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.input.publicodesInformations = [];
          state.informationsData.input.hasNoMissingQuestions = true;
          state.informationsData.input.informationError = false;
          state.informationsData.error.errorInformations = {};
          state.informationsData.isStepValid = true;
        })
      );
    },
    onNextStep: (): ValidationResponse => {
      const state = get().informationsData.input;
      const agreement = get().agreementData.input.agreement;
      const { isValid, errorState } = validateStep(state, agreement);

      // Si aucune question n'a été générée (cas où il n'y a pas de missingArgs)
      if (
        state.publicodesInformations.length === 0 &&
        state.hasNoMissingQuestions
      ) {
        set(
          produce((state: InformationsStoreSlice) => {
            state.informationsData.hasBeenSubmit = false;
            state.informationsData.isStepValid = true;
            state.informationsData.input.hasNoMissingQuestions = true;
            state.informationsData.error = errorState;
          })
        );
        return ValidationResponse.Valid;
      }

      // Vérifier que toutes les questions actuelles ont une réponse
      const allCurrentQuestionsAnswered = state.publicodesInformations.every(
        (info) =>
          info.info !== undefined && info.info !== null && info.info !== ""
      );

      let hasMoreQuestions = false;
      if (allCurrentQuestionsAnswered && isValid) {
        try {
          const publicodes = get().agreementData.publicodes!;
          const agreement = get().agreementData.input.agreement;
          const rules = informationToSituation(state.publicodesInformations);
          const situation = {
            "contrat salarié . convention collective": `'IDCC${agreement?.num}'`,
            ...rules,
          };
          const result = publicodes.calculate(situation);

          if (result.type === "missing-args") {
            const missingArgs = result.missingArgs.filter(
              (item) => item.rawNode.cdtn
            );
            hasMoreQuestions = missingArgs.length > 0;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // Si toutes les questions sont répondues et qu'il n'y en a pas d'autres
      if (allCurrentQuestionsAnswered && !hasMoreQuestions && isValid) {
        set(
          produce((state: InformationsStoreSlice) => {
            state.informationsData.hasBeenSubmit = false;
            state.informationsData.isStepValid = true;
            state.informationsData.input.hasNoMissingQuestions = true;
            state.informationsData.error = errorState;
          })
        );
        return ValidationResponse.Valid;
      }

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = !isValid;
          state.informationsData.isStepValid = isValid;
          state.informationsData.error = errorState;
        })
      );

      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<InformationsStoreSlice & AgreementStoreSlice>["getState"],
  set: StoreApi<InformationsStoreSlice & AgreementStoreSlice>["setState"],
  paramName: any,
  value: any
) => {
  if (get().informationsData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.informationsData.input[paramName] = value;
    });
    const agreement = get().agreementData?.input?.agreement;
    const { isValid, errorState } = validateStep(
      nextState.informationsData.input,
      agreement
    );
    set(
      produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
        state.informationsData.error = errorState;
        state.informationsData.isStepValid = isValid;
        state.informationsData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: InformationsStoreSlice & AgreementStoreSlice) => {
        state.informationsData.input[paramName] = value;
      })
    );
  }
};

// Vérifier si une convention collective a des dispositions conventionnelles
function hasConventionalProvision(idcc: number): boolean {
  // Cette logique sera migrée depuis l'ancien système
  // Pour l'instant, retourner true par défaut
  return true;
}

export default createInformationsStore;
