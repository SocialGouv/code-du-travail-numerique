import { StoreApi } from "zustand";
import produce from "immer";
import { isValidField, validateStep } from "./validator";

import {
  CommonInformationsStoreData,
  CommonInformationsStoreSlice,
  PublicodesInformation,
} from "./types";
import { StoreSlice } from "../../../types";
import {
  CatPro3239,
  MissingArgs,
  PublicodesSimulator,
} from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForIndemniteLicenciementConventionnel } from "../../../publicodes";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { removeDuplicateObject } from "../../../../lib";
import { informationToSituation } from "../utils";
import { ValidationResponse } from "../../../Components/SimulatorLayout";
import { ContratTravailStoreSlice } from "../../../IndemniteLicenciement/steps/ContratTravail/store";
import * as Sentry from "@sentry/nextjs";

const initialState: CommonInformationsStoreData = {
  input: {
    publicodesInformations: [],
    isStepHidden: true,
    isStepSalaryHidden: false,
    hasNoMissingQuestions: false,
    informationError: false,
  },
  error: {
    errorInformations: {},
  },
  hasBeenSubmit: false,
  isStepValid: true,
};

const createCommonInformationsStore: StoreSlice<
  CommonInformationsStoreSlice,
  CommonAgreementStoreSlice<PublicodesSimulator> & ContratTravailStoreSlice
> = (set, get) => ({
  informationsData: {
    ...initialState,
  },
  informationsFunction: {
    generatePublicodesQuestions: (): boolean => {
      const publicodes = get().agreementData.publicodes;
      const agreement = get().agreementData.input.agreement;
      const isAgreementSupportedIndemniteLicenciement =
        get().agreementData.input.isAgreementSupportedIndemniteLicenciement;
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      try {
        if (agreement && isAgreementSupportedIndemniteLicenciement) {
          const result = publicodes.setSituation(
            mapToPublicodesSituationForIndemniteLicenciementConventionnel(
              agreement.num,
              isLicenciementInaptitude,
              false
            ),
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          const missingArgs = result.missingArgs.filter(
            (item) => item.rawNode.cdtn
          );
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
            return true;
          }
        }
        set(
          produce((state: CommonInformationsStoreSlice) => {
            state.informationsData.input = initialState.input;
            state.informationsData.error = initialState.error;
          })
        );
        return true;
      } catch (e) {
        console.error(e);
        Sentry.captureException(e);
        set(
          produce((state: CommonInformationsStoreSlice) => {
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
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      const contractType = get().contratTravailData.input.typeContratTravail;
      const isDismissalSeriousMisconduct =
        get().contratTravailData.input.licenciementFauteGrave;
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
        const agreement = get().agreementData.input.agreement!;
        const rules = informationToSituation(newPublicodesInformations);
        let missingArgs: MissingArgs[] = [];
        let blockingNotification: any = undefined;
        try {
          const result = publicodes.setSituation(
            mapToPublicodesSituationForIndemniteLicenciementConventionnel(
              agreement.num,
              isLicenciementInaptitude,
              false,
              rules
            ),
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          console.log("result", result);
          missingArgs = result.missingArgs.filter((item) => item.rawNode.cdtn);
          const notifBloquante = publicodes.getNotificationsBloquantes();
          if (notifBloquante.length > 0) {
            blockingNotification = notifBloquante[0].description;
          }
        } catch (e) {
          informationError = true;
          console.error(e);
        }
        set(
          produce((state: CommonInformationsStoreSlice) => {
            state.informationsData.input.blockingNotification =
              blockingNotification;
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
    onSetStepHidden: () => {
      const publicodesInformations =
        get().informationsData.input.publicodesInformations;
      const agreement = get().agreementData.input.agreement!;
      let isStepHidden = false;
      if (
        (agreement &&
          agreement.num === 3239 &&
          publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle"
          )?.info === `'${CatPro3239.assistantMaternel}'` &&
          publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement"
          )?.info === `'Non'`) ||
        (agreement.num === 1404 &&
          publicodesInformations.find(
            (v) =>
              v.question.rule.nom ===
              "contrat salarié . convention collective . sedima . question cdi opération"
          )?.info === `'Oui'`)
      ) {
        isStepHidden = true;
      }
      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.input.isStepSalaryHidden = isStepHidden;
        })
      );
    },
    onNextStep: () => {
      const state = get().informationsData.input;
      const currentError = get().informationsData.error;
      const { isValid, errorState } = validateStep(state);
      let errorEligibility;

      if (isValid) {
        errorEligibility = state.blockingNotification;
      }

      set(
        produce((state: CommonInformationsStoreSlice) => {
          state.informationsData.hasBeenSubmit = isValid ? false : true;
          state.informationsData.isStepValid =
            isValid && get().informationsData.input.hasNoMissingQuestions;
          state.informationsData.error = errorState;
          state.informationsData.error.errorEligibility = errorEligibility;
        })
      );
      get().informationsFunction.onSetStepHidden();
      return errorEligibility
        ? ValidationResponse.NotEligible
        : isValid
        ? ValidationResponse.Valid
        : ValidationResponse.NotValid;
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
