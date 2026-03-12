import { produce } from "immer";
import { StoreApi } from "zustand";
import { StoreSlice } from "../../../types";
import { SalairesStoreSlice } from "../../Salaires/store";
import * as Sentry from "@sentry/nextjs";
import {
  AncienneteStoreData,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";
import { CommonInformationsStoreSlice } from "../../Informations/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { informationToSituation } from "../../Informations/components/utils";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { validateStep } from "./validator";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { CommonSituationStoreSlice } from "../../../situationStore";
import { AbsenceStoreSlice } from "../../Absences";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {},
  error: {},
};

const createAncienneteStore: StoreSlice<
  AncienneteStoreSlice,
  SalairesStoreSlice &
    AbsenceStoreSlice &
    CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT> &
    CommonInformationsStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    init: () => {
      applyGenericValidation(
        get,
        set,
        "dateEntree",
        get().ancienneteData.input.dateEntree
      );
    },
    onChangeDateEntree: (value) => {
      applyGenericValidation(get, set, "dateEntree", value);
      get().ancienneteFunction.updateAncienneteEstimee();
    },
    onChangeDateSortie: (value) => {
      applyGenericValidation(get, set, "dateSortie", value);
      get().ancienneteFunction.updateAncienneteEstimee();
    },
    onChangeDateNotification: (value) => {
      applyGenericValidation(get, set, "dateNotification", value);
    },
    updateAncienneteEstimee: () => {
      const publicodes = get().agreementData.publicodes;
      const { dateEntree, dateSortie } = get().ancienneteData.input;
      const absences = get().absenceData.input.absencePeriods;
      if (dateEntree && dateSortie) {
        const result = publicodes.estimatedSeniority(
          dateEntree,
          dateSortie,
          absences
        );
        set(
          produce((state: AncienneteStoreSlice) => {
            state.ancienneteData.input.ancienneteEstimee = result.value;
          })
        );
      }
    },
    onNextStep: () => {
      const { isValid, errorState } = validateStep(get().ancienneteData.input);
      let errorEligibility;

      if (isValid) {
        try {
          const publicodes = get().agreementData.publicodes;
          const infos = informationToSituation(
            get().informationsData.input.publicodesInformations
          );
          const { dateEntree, dateNotification, dateSortie } =
            get().ancienneteData.input;
          const situation = {
            ...get().situationData.situation,
            ...infos,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              dateEntree,
            "contrat salarié . indemnité de licenciement . date de notification":
              dateNotification,
            "contrat salarié . indemnité de licenciement . date de sortie":
              dateSortie,
            "contrat salarié . indemnité de licenciement . arrêt de travail":
              undefined,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              get().informationsData.input.licenciementInaptitude,
            absencePeriods: undefined,
          };

          const result = publicodes.calculate(situation);
          if (result.type === "ineligibility") {
            errorEligibility = result.ineligibility;
          }
        } catch (e) {
          console.error(e);
          Sentry.captureException(e);
          set(
            produce((state: AncienneteStoreSlice) => {
              state.ancienneteData.error.errorPublicodes =
                "Une erreur liée au moteur de calcul nous empêche de continuer la simulation. Veuillez vérifier les informations saisies ou rafraîchir la page si le problème persiste.";
            })
          );
          return ValidationResponse.NotValid;
        }
      }

      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = !isValid;
          state.ancienneteData.isStepValid = isValid;
          state.ancienneteData.error = errorState;
          state.ancienneteData.error.errorEligibility = errorEligibility;
          state.ancienneteData.error.errorPublicodes = undefined;
        })
      );
      return errorEligibility
        ? ValidationResponse.NotEligible
        : isValid
          ? ValidationResponse.Valid
          : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT>
  >["getState"],
  set: StoreApi<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT>
  >["setState"],
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName as string] = value;
    });

    const { isValid, errorState } = validateStep(
      nextState.ancienneteData.input
    );
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.error = errorState;
        state.ancienneteData.isStepValid = isValid;
        state.ancienneteData.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: AncienneteStoreSlice) => {
        state.ancienneteData.input[paramName as string] = value;
      })
    );
  }
};

export default createAncienneteStore;
