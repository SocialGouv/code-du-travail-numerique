import produce from "immer";
import { StoreApi } from "zustand";
import { AncienneteStoreSlice } from "../../../steps/Anciennete/store";
import { SalairesStoreSlice } from "../../../steps/Salaires/store";
import { StoreSlice } from "../../../../types";
import {
  Agreement44StoreData,
  Agreement44StoreInput,
  Agreement44StoreSlice,
} from "./types";
import { validateStep } from "./validator";
import { CommonInformationsStoreSlice } from "../../../../CommonSteps/Informations/store";
import { computeSalaryPeriods } from "../../../common";
import { parse } from "../../../../common/utils";
import { SalaryPeriods } from "@socialgouv/modeles-social";
import { generateFrenchDate } from "../../../../utils";

const initialState: Agreement44StoreData = {
  input: {
    showVariablePay: false,
    showKnowingLastSalary: false,
    showLastMonthSalary: false,
  },
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement44StoreSalaires: StoreSlice<
  Agreement44StoreSlice,
  SalairesStoreSlice & AncienneteStoreSlice & CommonInformationsStoreSlice
> = (set, get) => ({
  agreement44Data: { ...initialState },
  agreement44Function: {
    onInit: () => {
      const categoryPro = get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
      )?.info;
      const ancienneteInput = get().ancienneteData.input;
      const periods = computeSalaryPeriods({
        dateEntree: generateFrenchDate(
          new Date(
            parse(ancienneteInput.dateSortie!).setMonth(
              parse(ancienneteInput.dateSortie!).getMonth() - 1
            )
          )
        ),
        dateNotification: ancienneteInput.dateSortie!,
      });
      const lastMonthSalaryProcess: SalaryPeriods = { month: periods[0] };
      const sameDateNotificationDateSortie =
        ancienneteInput.dateNotification !== ancienneteInput.dateSortie;
      const isOuvrierOrAgent =
        categoryPro === "'Ouvriers et collaborateurs (Groupes I à III)'" ||
        categoryPro === "'Agents de maîtrise et techniciens (Groupe IV)'";
      set(
        produce((state: Agreement44StoreSlice) => {
          state.agreement44Data.input.showVariablePay =
            isOuvrierOrAgent &&
            get().salairesData.input.hasSameSalary === "non";
          if (sameDateNotificationDateSortie) {
            state.agreement44Data.input.showLastMonthSalary = false;
            state.agreement44Data.input.showKnowingLastSalary = false;
            state.agreement44Data.input.lastMonthSalary = lastMonthSalaryProcess;
            state.agreement44Data.input.knowingLastSalary = undefined;
          } else {
            state.agreement44Data.input.lastMonthSalary = get().agreement44Data
              .input.showLastMonthSalary
              ? get().agreement44Data.input.lastMonthSalary
              : lastMonthSalaryProcess;
          }
        })
      );
    },
    onChangeHasVariablePay: (value) => {
      const categoryPro = get().informationsData.input.publicodesInformations.find(
        (item) =>
          item.question.name ===
          "contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
      )?.info;
      applyGenericValidation(get, set, [
        { paramName: "hasVariablePay", value: value },
        {
          paramName: "showKnowingLastSalary",
          value:
            value === "non" &&
            (categoryPro === "'Ouvriers et collaborateurs (Groupes I à III)'" ||
              categoryPro ===
                "'Agents de maîtrise et techniciens (Groupe IV)'") &&
            get().agreement44Data.input.showVariablePay,
        },
      ]);
    },
    onChangeKnowingLastSalary: (value) => {
      const ancienneteInput = get().ancienneteData.input;
      const periods = computeSalaryPeriods({
        dateEntree: generateFrenchDate(
          new Date(
            parse(ancienneteInput.dateSortie!).setMonth(
              parse(ancienneteInput.dateSortie!).getMonth() - 1
            )
          )
        ),
        dateNotification: ancienneteInput.dateSortie!,
      });
      const lastMonthSalaryProcess: SalaryPeriods = { month: periods[0] };
      applyGenericValidation(get, set, [
        { paramName: "showLastMonthSalary", value: value === "oui" },
        { paramName: "knowingLastSalary", value },
        {
          paramName: "lastMonthSalary",
          value:
            value === "non"
              ? lastMonthSalaryProcess
              : get().agreement44Data.input.lastMonthSalary,
        },
      ]);
    },
    onChangeLastMonthSalary: (value) => {
      applyGenericValidation(get, set, [
        { paramName: "lastMonthSalary", value },
      ]);
    },
  },
});

const applyGenericValidation = (
  get: StoreApi<Agreement44StoreSlice & SalairesStoreSlice>["getState"],
  set: StoreApi<Agreement44StoreSlice & SalairesStoreSlice>["setState"],
  arrParam: { paramName: keyof Agreement44StoreInput; value: any }[]
) => {
  if (get().agreement44Data.hasBeenSubmit) {
    const nextState = produce(get(), (draft) => {
      arrParam.forEach(({ paramName, value }) => {
        draft.agreement44Data.input[paramName] = value;
      });
    });
    const { isValid, errorState } = validateStep(
      nextState.agreement44Data.input
    );
    set(
      produce((state: Agreement44StoreSlice) => {
        state.agreement44Data.error = errorState;
        state.agreement44Data.isStepValid = isValid;
        arrParam.forEach(({ paramName, value }) => {
          state.agreement44Data.input[paramName] = value;
        });
      })
    );
    get().salairesFunction.onValidateStep();
  } else {
    set(
      produce((state: Agreement44StoreSlice) => {
        arrParam.forEach(({ paramName, value }) => {
          state.agreement44Data.input[paramName] = value;
        });
      })
    );
  }
};
