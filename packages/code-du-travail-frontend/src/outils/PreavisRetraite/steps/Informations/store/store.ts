import { StoreApi } from "zustand";
import produce from "immer";
import { isValidField, validateStep } from "./validator";
import { InformationsStoreData, InformationsStoreSlice } from "./types";
import { MissingArgs } from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationPreavisRetraite } from "../../../../publicodes";
import { removeDuplicateObject } from "../../../../../lib";
import { informationToSituation } from "../../../../Components/Informations/utils";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import * as Sentry from "@sentry/nextjs";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import { PublicodesInformation } from "../../../../CommonIndemniteDepart/steps/Informations/store";
import { AgreementStoreSlice } from "../../Agreement/store";
import { OriginDepartStoreSlice } from "../../OriginStep/store";

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

const createCommonInformationsStore: StoreSliceWrapperPreavisRetraite<
  InformationsStoreSlice,
  AgreementStoreSlice & OriginDepartStoreSlice
> = (set, get) => ({
  informationsData: {
    ...initialState,
  },
  informationsFunction: {
    generatePublicodesQuestions: (): boolean => {
      const publicodes = get().agreementData.publicodes;
      const agreement = get().agreementData.input.agreement;
      const originDepart = get().originDepartData.input.originDepart!;
      try {
        const result = publicodes.setSituation(
          mapToPublicodesSituationForCalculationPreavisRetraite(
            originDepart,
            agreement?.num,
            undefined
          )
        );
        let resultMissingArgs: MissingArgs[] = result.missingArgs;
        const missingArgs = resultMissingArgs.filter(
          (item) => item.rawNode.cdtn
        );
        if (missingArgs.length > 0) {
          const question = missingArgs.map((arg) => ({
            name: arg.name,
            rule: arg.rawNode,
          }))[0];
          set(
            produce((state: InformationsStoreSlice) => {
              state.informationsData.input.publicodesInformations = [
                {
                  order: 0,
                  id: Math.random().toString(36).substring(2, 15),
                  question,
                  info: undefined,
                },
              ];
            })
          );
          return true;
        }
        set(
          produce((state: InformationsStoreSlice) => {
            state.informationsData.input = initialState.input;
            state.informationsData.error = initialState.error;
          })
        );
        return true;
      } catch (e) {
        console.error(e);
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
        const originDepart = get().originDepartData.input.originDepart!;
        let missingArgs: MissingArgs[] = [];
        try {
          const result = publicodes.setSituation(
            mapToPublicodesSituationForCalculationPreavisRetraite(
              originDepart,
              agreement?.num,
              undefined,
              rules
            )
          );
          let resultMissingArgs: MissingArgs[] = result.missingArgs;
          missingArgs = resultMissingArgs.filter((item) => item.rawNode.cdtn);
        } catch (e) {
          informationError = true;
          console.error(e);
        }
        const newQuestions = missingArgs
          .sort((a, b) => b.indice - a.indice)
          .map((arg, index) => ({
            question: {
              name: arg.name,
              rule: arg.rawNode,
            },
            order: questionAnswered.order + index + 1,
            info: undefined,
            id: Math.random().toString(36).substring(2, 15),
          }))[0];
        if (missingArgs.length === 0) {
          newPublicodesInformationsForNextQuestions =
            newPublicodesInformations.filter(
              (el) => el.order <= questionAnswered.order
            );
        } else {
          newPublicodesInformationsForNextQuestions = removeDuplicateObject(
            [newQuestions, ...newPublicodesInformations].sort(
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
    onNextStep: () => {
      const state = get().informationsData.input;
      const { isValid, errorState } = validateStep(state);

      set(
        produce((state: InformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = isValid ? false : true;
          state.informationsData.isStepValid =
            isValid && get().informationsData.input.hasNoMissingQuestions;
          state.informationsData.error = errorState;
        })
      );
      return isValid ? ValidationResponse.Valid : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<InformationsStoreSlice>["getState"],
  set: StoreApi<InformationsStoreSlice>["setState"],
  paramName: string,
  value: any
) => {
  if (get().informationsData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.informationsData.input[paramName] = value;
    });
    const { isValid, errorState } = validateStep(
      nextState.informationsData.input
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

export default createCommonInformationsStore;
