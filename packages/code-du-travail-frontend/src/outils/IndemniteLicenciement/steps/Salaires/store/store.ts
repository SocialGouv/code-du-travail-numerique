import { GetState, SetState } from "zustand";
import produce from "immer";
import {
  SalairesStoreData,
  SalairesStoreInput,
  SalairesStoreSlice,
} from "./types";
import { MainStore, StoreSlice } from "../../../store";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { validateStep } from "./validator";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { setSalaryPeriods } from "../../../common/";
import { validateAgreement } from "../../../agreements";
import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { IndemniteLicenciementStepName } from "../../..";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods, SalaryPeriods } from "../../../common";

const initialState: SalairesStoreData = {
  input: {
    salaryPeriods: [],
    refSalary: 0,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createSalairesStore: StoreSlice<
  SalairesStoreSlice,
  AncienneteStoreSlice & ContratTravailStoreSlice
> = (set, get) => ({
  salairesData: { ...initialState },
  salairesFunction: {
    initFieldSalaries: () => {
      const ancienneteInput = get().ancienneteData.input;
      const periods = computeSalaryPeriods({
        dateEntree: ancienneteInput.dateEntree ?? "",
        dateNotification: ancienneteInput.dateNotification ?? "",
        absencePeriods: ancienneteInput.absencePeriods,
      });
      const p: SalaryPeriods[] = periods.map((v) => ({
        month: v,
        value: undefined,
      }));
      const salaryPeriods = deepMergeArray(
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
    onChangeHasTempsPartiel: (value) => {
      applyGenericValidation(get, set, "hasTempsPartiel", value);
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
    onValidateStepSalaires: () => {
      const { isValid, errorState } = validateStep(get().salairesData.input);

      if (isValid) {
        const salaireInput = get().salairesData.input;

        const sReference = new ReferenceSalaryFactory().create(
          SupportedCcIndemniteLicenciement.default
        );

        const primes = salaireInput.primes.filter(
          (v) => v !== null
        ) as number[];

        const salaires = salaireInput.salaryPeriods.filter(
          (v) => v.value !== undefined
        ) as { month: string; value: number }[];

        const refSalary = sReference.computeReferenceSalary({
          hasSameSalaire: salaireInput.hasSameSalaire === "oui",
          primes,
          salaire: salaireInput.salaireBrut
            ? parseFloat(salaireInput.salaireBrut)
            : undefined,
          salaires,
        });

        set(
          produce((state: SalairesStoreSlice) => {
            state.salairesData.input.refSalary = refSalary;
          })
        );
      }

      const isAgreementValid = validateAgreement(
        SupportedCcIndemniteLicenciement.IDCC1516, //TODO: replace par la cc
        IndemniteLicenciementStepName.Salaires,
        get,
        set
      );

      const isStepValid = isValid && isAgreementValid;

      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.hasBeenSubmit = isStepValid ? false : true;
          state.salairesData.isStepValid = isStepValid;
          state.salairesData.error = errorState;
        })
      );
      return isStepValid;
    },
  },
});

const applyGenericValidation = (
  get: GetState<SalairesStoreSlice>,
  set: SetState<SalairesStoreSlice>,
  paramName: keyof SalairesStoreInput,
  value: any
) => {
  if (get().salairesData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.salairesData.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(nextState.salairesData.input);
    const isAgreementValid = validateAgreement(
      SupportedCcIndemniteLicenciement.IDCC1516, //TODO: replace par la cc
      IndemniteLicenciementStepName.Salaires,
      get,
      set
    );
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
