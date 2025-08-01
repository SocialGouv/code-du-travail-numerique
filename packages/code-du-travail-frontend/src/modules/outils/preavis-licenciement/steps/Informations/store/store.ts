import { StoreApi } from "zustand";
import produce from "immer";
import { isValidField, validateStep } from "./validator";
import { InformationsStoreData, InformationsStoreSlice } from "./types";
import { MissingArgs } from "@socialgouv/modeles-social";
import * as Sentry from "@sentry/nextjs";
import { StoreSliceWrapperPreavisLicenciement } from "../../store";
import { AgreementStoreSlice } from "../../Agreement/store";
import { StatusStoreSlice } from "../../Status/store";
import { mapToPublicodesSituationForCalculationPreavisLicenciement } from "src/modules/outils/common/publicodes";
import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import { removeDuplicateObject } from "src/lib";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";

const initialState: InformationsStoreData = {
  input: {
    publicodesInformations: [],
    hasNoMissingQuestions: false,
    informationError: false,
  },
  error: {
    errorInformations: {},
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createInformationsStore: StoreSliceWrapperPreavisLicenciement<
  InformationsStoreSlice,
  AgreementStoreSlice & StatusStoreSlice
> = (set, get) => ({
  informationsData: {
    ...initialState,
  },
  informationsFunction: {
    generatePublicodesQuestions: (): boolean => {
      const publicodes = get().agreementData.publicodes;
      const agreement = get().agreementData.input.agreement;
      const seniority = get().statusData.input.seniority ?? "'Moins de 6 mois'";
      const isHandicappedWorker = !!get().statusData.input.disabledWorker;
      const existingQuestions =
        get().informationsData.input.publicodesInformations;

      if (!publicodes) {
        return false;
      }

      if (!agreement) {
        return false;
      }

      if (existingQuestions.length > 0) {
        return true;
      }

      try {
        const situation =
          mapToPublicodesSituationForCalculationPreavisLicenciement(
            seniority,
            isHandicappedWorker,
            agreement?.num,
            undefined
          );

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
            state.informationsData.isStepValid = true; // Marquer l'étape comme valide s'il n'y a pas de questions
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
        const seniority =
          get().statusData.input.seniority ?? "'Moins de 6 mois'";
        const isHandicappedWorker = !!get().statusData.input.disabledWorker;
        let missingArgs: MissingArgs[] = [];
        try {
          const result = publicodes.calculate(
            mapToPublicodesSituationForCalculationPreavisLicenciement(
              seniority,
              isHandicappedWorker,
              agreement?.num,
              rules
            )
          );

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
    onNextStep: (): ValidationResponse => {
      const state = get().informationsData.input;
      const statusState = get().statusData.input;
      const { isValid, errorState } = validateStep(state, statusState);

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
          const seniority =
            get().statusData.input.seniority ?? "'Moins de 6 mois'";
          const isHandicappedWorker = !!get().statusData.input.disabledWorker;
          const rules = informationToSituation(state.publicodesInformations);
          const result = publicodes.calculate(
            mapToPublicodesSituationForCalculationPreavisLicenciement(
              seniority,
              isHandicappedWorker,
              agreement?.num,
              rules
            )
          );

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

      const canProceed =
        isValid && allCurrentQuestionsAnswered && !hasMoreQuestions;

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = isValid ? false : true;
          state.informationsData.isStepValid = canProceed;
          state.informationsData.input.hasNoMissingQuestions =
            !hasMoreQuestions;
          state.informationsData.error = errorState;
        })
      );

      return canProceed
        ? ValidationResponse.Valid
        : ValidationResponse.NotValid;
    },
    resetQuestions: () => {
      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.input.publicodesInformations = [];
          state.informationsData.input.hasNoMissingQuestions = true;
          state.informationsData.error.errorInformations = {};
          state.informationsData.input.informationError = false;
        })
      );
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<InformationsStoreSlice & StatusStoreSlice>["getState"],
  set: StoreApi<InformationsStoreSlice & StatusStoreSlice>["setState"],
  paramName: string,
  value: any
) => {
  if (get().informationsData.hasBeenSubmit) {
    const statusState = get().statusData.input;
    const nextState = produce(get(), (draft) => {
      draft.informationsData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.informationsData.input,
      statusState
    );
    set(
      produce((state: InformationsStoreSlice) => {
        state.informationsData.error = errorState;
        state.informationsData.isStepValid = isValid;
        state.informationsData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: InformationsStoreSlice) => {
        state.informationsData.input[paramName] = value;
      })
    );
  }
};

export default createInformationsStore;
