import produce from "immer";
import { StoreApi } from "zustand";
import { push as matopush } from "@socialgouv/matomo-next";
import { CommonAgreementStoreSlice } from "../../../../CommonSteps/Agreement/store";
import { StoreSlice } from "../../../../types";
import { SalairesStoreSlice } from "../../Salaires/store";

import {
  AncienneteStoreData,
  AncienneteStoreInput,
  AncienneteStoreSlice,
} from "./types";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { Absence } from "@socialgouv/modeles-social";
import { informationToSituation } from "../../../../CommonSteps/Informations/utils";
import { getErrorEligibility } from "./eligibility";
import { customSeniorityValidator } from "../../../agreements/seniority";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { ValidationResponse } from "../../../../Components/SimulatorLayout";
import { IndemniteLicenciementStepName } from "../../..";
import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../../lib/matomo/types";

const initialState: AncienneteStoreData = {
  hasBeenSubmit: false,
  isStepValid: true,
  input: {
    absencePeriods: [],
  },
  error: {},
};

const createAncienneteStore: StoreSlice<
  AncienneteStoreSlice,
  SalairesStoreSlice &
    CommonAgreementStoreSlice &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice
> = (set, get, { toolName }) => ({
  ancienneteData: { ...initialState },
  ancienneteFunction: {
    init: () => {
      set(
        produce(
          (state: AncienneteStoreSlice & CommonInformationsStoreSlice) => {
            state.ancienneteData.input.absencePeriods = cleanAbsenceDate(
              state.ancienneteData.input.absencePeriods,
              state
            );
          }
        )
      );
    },
    onChangeDateEntree: (value) => {
      applyGenericValidation(get, set, "dateEntree", value);
    },
    onChangeDateSortie: (value) => {
      applyGenericValidation(get, set, "dateSortie", value);
    },
    onChangeDateNotification: (value) => {
      applyGenericValidation(get, set, "dateNotification", value);
    },
    onChangeAbsencePeriods: (value) => {
      const absence = cleanAbsenceDate(value, get());
      applyGenericValidation(get, set, "absencePeriods", absence);
    },
    onChangeHasAbsenceProlonge: (value) => {
      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.input.absencePeriods =
            value === "non"
              ? initialState.input.absencePeriods
              : get().ancienneteData.input.absencePeriods;
        })
      );
      applyGenericValidation(get, set, "hasAbsenceProlonge", value);
    },
    onNextStep: () => {
      const { isValid, errorState } = customSeniorityValidator(
        get().ancienneteData.input,
        get().contratTravailData.input,
        get().informationsData.input,
        get().agreementData.input.agreement
      );

      let errorEligibility;
      if (isValid) {
        errorEligibility = getErrorEligibility(
          get().ancienneteData.input,
          get().informationsData.input,
          get().contratTravailData.input.licenciementInaptitude === "oui",
          get().agreementData.input.agreement
        );
      }

      set(
        produce((state: AncienneteStoreSlice) => {
          state.ancienneteData.hasBeenSubmit = isValid ? false : true;
          state.ancienneteData.isStepValid = isValid;
          state.ancienneteData.error = errorState;
          state.ancienneteData.error.errorEligibility = errorEligibility;
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
      CommonAgreementStoreSlice &
      CommonInformationsStoreSlice &
      ContratTravailStoreSlice
  >["getState"],
  set: StoreApi<
    AncienneteStoreSlice &
      CommonAgreementStoreSlice &
      CommonInformationsStoreSlice &
      ContratTravailStoreSlice
  >["setState"],
  paramName: keyof AncienneteStoreInput,
  value: any
) => {
  if (get().ancienneteData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.ancienneteData.input[paramName as string] = value;
    });

    const { isValid, errorState } = customSeniorityValidator(
      nextState.ancienneteData.input,
      nextState.contratTravailData.input,
      get().informationsData.input,
      get().agreementData.input.agreement
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

const cleanAbsenceDate = (
  absencePeriods: Absence[],
  data: CommonInformationsStoreSlice
): Absence[] => {
  return absencePeriods.map((absence) => {
    const dateRequired = absence.motif.startAt
      ? absence.motif.startAt(
          informationToSituation(
            data.informationsData.input.publicodesInformations
          )
        )
      : false;
    if (!dateRequired) {
      return {
        ...absence,
        startedAt: undefined,
      };
    } else {
      return absence;
    }
  });
};

export default createAncienneteStore;
