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

const initialState: SalairesStoreData = {
  input: {
    salaryPeriods: [],
    primes: [],
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
    onChangeHasTempsPartiel: (value) => {
      applyGenericValidation(get, set, "hasTempsPartiel", value);
    },
    onChangeHasSameSalaire: (value) => {
      applyGenericValidation(get, set, "hasSameSalaire", value);
      setSalaryPeriods(get, set);
    },
    onChangeSalaireBrut: (value) => {
      applyGenericValidation(get, set, "salaireBrut", value);
    },
    onSalariesChange: (value) => {
      applyGenericValidation(get, set, "salaryPeriods", value);
    },
    onChangeHasPrimes: (value) => {
      applyGenericValidation(get, set, "hasPrimes", value);
      if (value === "non") {
        set(
          produce((state: SalairesStoreSlice) => {
            state.salairesData.input.primes = [];
          })
        );
      }
    },
    onChangePrimes: (primes) => {
      applyGenericValidation(get, set, "primes", primes);
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
        SupportedCcIndemniteLicenciement.IDCC1516,
        IndemniteLicenciementStepName.Salaires,
        get,
        set
      );

      set(
        produce((state: SalairesStoreSlice) => {
          state.salairesData.hasBeenSubmit = isValid ? false : true;
          state.salairesData.isStepValid = isValid;
          state.salairesData.error = errorState;
        })
      );
      return isValid && isAgreementValid;
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
    set(
      produce((state: SalairesStoreSlice) => {
        state.salairesData.error = errorState;
        state.salairesData.isStepValid = isValid;
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
