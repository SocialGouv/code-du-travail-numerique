import { StoreApi } from "zustand";
import produce from "immer";
import { validateStep } from "./validator";

import {
  CommonInformationsStoreData,
  CommonInformationsStoreSlice,
  PublicodesInformation,
} from "./types";
import { StoreSlice } from "../../../types";
import {
  IndemniteLicenciementPublicodes,
  MissingArgs,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForIndemniteLicenciementConventionnel } from "../../../publicodes";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { removeDuplicateObject } from "../../../../lib";
import { informationToSituation } from "../utils";

const initialState: CommonInformationsStoreData = {
  input: {
    publicodesInformations: [],
    isStepHidden: true,
    isStepSalaryHidden: false,
    hasNoMissingQuestions: false,
  },
  error: {
    errorInformations: {},
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createCommonInformationsStore: StoreSlice<
  CommonInformationsStoreSlice,
  CommonAgreementStoreSlice
> = (set, get, publicodesRules) => ({
  informationsData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  informationsFunction: {
    generatePublicodesQuestions: () => {
      const publicodes = get().informationsData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }
      const agreement = get().agreementData.input.agreement;
      if (agreement) {
        const missingArgs = publicodes
          .setSituation(
            mapToPublicodesSituationForIndemniteLicenciementConventionnel(
              agreement.num
            ),
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          )
          .missingArgs.filter((item) => item.rawNode.cdtn);
        if (missingArgs.length > 0) {
          const question = missingArgs.map((arg) => ({
            name: arg.name,
            rule: arg.rawNode,
          }))[0];
          set(
            produce((state: CommonInformationsStoreSlice) => {
              state.informationsData.input.publicodesInformations = [
                {
                  order: 0,
                  id: Math.random().toString(36).substring(2, 15),
                  question,
                  info: undefined,
                },
              ];
              state.informationsData.input.isStepHidden = false;
            })
          );
          return;
        }
      }
      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.input = initialState.input;
        })
      );
    },
    onInformationsChange: (key, value) => {
      const publicodes = get().informationsData.publicodes!;
      const agreement = get().agreementData.input.agreement!;
      const publicodesInformations = get().informationsData.input
        .publicodesInformations;
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
      const rules = informationToSituation(newPublicodesInformations);
      let missingArgs: MissingArgs[] = [];
      let blockingNotification: string | undefined = undefined;
      try {
        missingArgs = publicodes
          .setSituation(
            mapToPublicodesSituationForIndemniteLicenciementConventionnel(
              agreement.num,
              rules
            ),
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          )
          .missingArgs.filter((item) => item.rawNode.cdtn);
        const notifBloquante = publicodes.getNotificationsBloquantes();
        if (notifBloquante.length > 0) {
          blockingNotification = notifBloquante[0].description;
        }
      } catch (e) {
        console.error(e);
      }
      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.input.blockingNotification = blockingNotification;
        })
      );
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
      let newPublicodesInformationsForNextQuestions: PublicodesInformation[];
      if (missingArgs.length === 0) {
        newPublicodesInformationsForNextQuestions = newPublicodesInformations.filter(
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
        missingArgs.length === 0
      );
    },
    onSetStepHidden: () => {
      try {
        const publicodes = get().informationsData.publicodes!;
        const publicodesInformations = get().informationsData.input
          .publicodesInformations;
        const agreement = get().agreementData.input.agreement!;
        const rules = informationToSituation(publicodesInformations);
        const isStepSalaryHidden = publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnel(
            agreement.num,
            rules
          ),
          "contrat salarié . indemnité de licenciement . étape salaire désactivée"
        ).result.value as boolean;
        set(
          produce((state: CommonInformationsStoreSlice) => {
            state.informationsData.input.isStepSalaryHidden = isStepSalaryHidden;
          })
        );
      } catch (e) {
        console.error(e);
      }
    },
    onValidateStep: () => {
      const { isValid, errorState } = validateStep(
        get().informationsData.input
      );
      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = isValid ? false : true;
          state.informationsData.isStepValid =
            isValid && get().informationsData.input.hasNoMissingQuestions;
          state.informationsData.error = errorState;
        })
      );
      get().informationsFunction.onSetStepHidden();
      return isValid;
    },
    onEligibilityCheckCommonInfo: () => {
      const state = get().informationsData.input;
      const errorEligibility = state.blockingNotification;

      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.error.errorEligibility = errorEligibility;
        })
      );
      return !errorEligibility;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<CommonInformationsStoreSlice>["getState"],
  set: StoreApi<CommonInformationsStoreSlice>["setState"],
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
      produce((state: CommonInformationsStoreSlice) => {
        state.informationsData.error = errorState;
        state.informationsData.isStepValid = isValid;
        state.informationsData.input[paramName] = value;
      })
    );
  } else {
    set(
      produce((state: CommonInformationsStoreSlice) => {
        state.informationsData.input[paramName] = value;
      })
    );
  }
};

export default createCommonInformationsStore;
