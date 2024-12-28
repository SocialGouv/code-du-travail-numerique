import { StoreApi } from "zustand";
import produce from "immer";
import {
  SalairesStoreData,
  SalairesStoreInput,
  SalairesStoreSlice,
} from "./types";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { validateStep } from "./validator";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { validatorAgreement } from "../../../agreements";
import {
  getSupportedAgreement,
  PublicodesSimulator,
  SalaryPeriods,
} from "@socialgouv/modeles-social";
import { IndemniteDepartStepName } from "../../..";
import { computeSalaryPeriods } from "../../../common";
import { CommonAgreementStoreSlice } from "../../Agreement/store";
import { dateToString, deepMergeArray } from "src/lib";
import { add } from "date-fns";
import { StoreSlice } from "../../../types";
import { ValidationResponse } from "src/modules/outils/common/components/SimulatorLayout/types";
import { parse } from "src/modules/outils/common/utils";

const initialState: SalairesStoreData = {
  input: {
    showHasTempsPartiel: true,
    salaryPeriods: [],
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createSalairesStore: StoreSlice<
  SalairesStoreSlice,
  AncienneteStoreSlice &
    ContratTravailStoreSlice &
    CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT>
> = (set, get) => ({
  salairesData: { ...initialState },
  salairesFunction: {
    initFieldSalaries: () => {
      const ancienneteInput = get().ancienneteData.input;
      const contratTravailInput = get().contratTravailData.input;
      const dateNotification = add(
        parse(
          contratTravailInput.dateArretTravail ??
            ancienneteInput.dateNotification!
        ),
        {
          days: 1,
        }
      );
      const periods = computeSalaryPeriods({
        dateEntree: ancienneteInput.dateEntree!,
        dateNotification: dateToString(dateNotification),
      });
      const p: SalaryPeriods[] = periods.map((v) => ({
        month: v,
        value: undefined,
      }));
      let salaryPeriods = deepMergeArray(
        p,
        get().salairesData.input.salaryPeriods,
        "month"
      );
      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.input.salaryPeriods = salaryPeriods;
        })
      );
    },
    initShowHasTempsPartiel: () => {
      const idcc = get().agreementData.input.agreement?.num;
      const showPartialTime = idcc !== 3239;
      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.input.showHasTempsPartiel = showPartialTime;
          state.salairesData.input.hasTempsPartiel = showPartialTime
            ? state.salairesData.input.hasTempsPartiel
            : "non";
        })
      );
    },
    onChangeHasTempsPartiel: (value) => {
      applyGenericValidation(get, set, "hasTempsPartiel", value);
    },
    onChangeHasSameSalary: (value) => {
      applyGenericValidation(get, set, "hasSameSalary", value);
      if (value === "non") {
        applyGenericValidation(get, set, "salary", undefined);
      }
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
    onChangeSalary(value) {
      applyGenericValidation(get, set, "salary", value);
    },
    onNextStep: () => {
      const { isValid, errorState } = validateStep(get().salairesData.input);

      if (isValid) {
        const salaryInput = get().salairesData.input;

        let salaries = salaryInput.salaryPeriods;

        const { salary } = salaryInput;

        if (salary) {
          const parseSalary = parseFloat(salary);
          salaries = salaryInput.salaryPeriods.map((v) => ({
            ...v,
            value: parseSalary,
          }));
          set(
            produce((state: SalairesStoreSlice) => {
              state.salairesData.input.salaryPeriods = salaries;
            })
          );
        }
      }

      const agreement = get().agreementData.input.agreement;
      const isAgreementSupportedIndemniteLicenciement =
        get().agreementData.input.isAgreementSupportedIndemniteLicenciement;

      let isAgreementValid = true;

      if (agreement && isAgreementSupportedIndemniteLicenciement) {
        isAgreementValid = validatorAgreement(
          getSupportedAgreement(agreement.num),
          IndemniteDepartStepName.Salaires,
          get,
          set
        );
      }

      const isStepValid = isValid && isAgreementValid;

      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.hasBeenSubmit = !isStepValid;
          state.salairesData.isStepValid = isStepValid;
          state.salairesData.error = errorState;
        })
      );
      return isStepValid
        ? ValidationResponse.Valid
        : ValidationResponse.NotValid;
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<
    SalairesStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT>
  >["getState"],
  set: StoreApi<
    SalairesStoreSlice &
      CommonAgreementStoreSlice<PublicodesSimulator.INDEMNITE_LICENCIEMENT>
  >["setState"],
  paramName: keyof SalairesStoreInput,
  value: any
) => {
  if (get().salairesData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.salairesData.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(nextState.salairesData.input);
    const agreement = get().agreementData.input.agreement;
    const isAgreementSupportedIndemniteLicenciement =
      get().agreementData.input.isAgreementSupportedIndemniteLicenciement;
    let isAgreementValid = true;

    if (agreement && isAgreementSupportedIndemniteLicenciement) {
      isAgreementValid = validatorAgreement(
        getSupportedAgreement(agreement.num),
        IndemniteDepartStepName.Salaires,
        get,
        set
      );
    }
    const isStepValid = isValid && isAgreementValid;
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.error = errorState;
        state.salairesData.isStepValid = isStepValid;
        state.salairesData.input[paramName as string] = value;
      })
    );
  } else {
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.input[paramName as string] = value;
      })
    );
  }
};

export default createSalairesStore;
