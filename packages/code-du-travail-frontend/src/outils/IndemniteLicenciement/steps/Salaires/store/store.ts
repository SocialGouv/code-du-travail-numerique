import { GetState, SetState } from "zustand";
import produce from "immer";
import {
  SalairesStoreData,
  SalairesStoreInput,
  SalairesStoreSlice,
} from "./types";
import { StoreSlice } from "../../../../types";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { validateStep } from "./validator";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { validatorAgreement } from "../../../agreements";
import {
  getMotifs,
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { IndemniteLicenciementStepName } from "../../..";
import { deepMergeArray } from "../../../../../lib";
import { computeSalaryPeriods } from "../../../common";
import { CommonAgreementStoreSlice } from "../../Agreement/store";

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
  AncienneteStoreSlice & ContratTravailStoreSlice & CommonAgreementStoreSlice
> = (set, get) => ({
  salairesData: { ...initialState },
  salairesFunction: {
    initFieldSalaries: () => {
      const ancienneteInput = get().ancienneteData.input;
      const agreement = get().agreementData.input.agreement;
      const periods = computeSalaryPeriods({
        motifs: getMotifs(
          agreement
            ? (`IDCC${agreement.num}` as SupportedCcIndemniteLicenciement)
            : SupportedCcIndemniteLicenciement.default
        ),
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

        const refSalary = sReference.computeReferenceSalary({
          salaires: salaireInput.salaryPeriods,
        });

        set(
          produce((state: SalairesStoreSlice) => {
            state.salairesData.input.refSalary = refSalary;
          })
        );
      }

      const agreement = get().agreementData.input.agreement;

      let isAgreementValid = true;

      if (agreement) {
        isAgreementValid = validatorAgreement(
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement,
          IndemniteLicenciementStepName.Salaires,
          get,
          set
        );
      }

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
  get: GetState<SalairesStoreSlice & CommonAgreementStoreSlice>,
  set: SetState<SalairesStoreSlice & CommonAgreementStoreSlice>,
  paramName: keyof SalairesStoreInput,
  value: any
) => {
  if (get().salairesData.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      draft.salairesData.input[paramName as string] = value;
    });
    const { isValid, errorState } = validateStep(nextState.salairesData.input);
    const agreement = get().agreementData.input.agreement;

    let isAgreementValid = true;

    if (agreement) {
      isAgreementValid = validatorAgreement(
        `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement,
        IndemniteLicenciementStepName.Salaires,
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
