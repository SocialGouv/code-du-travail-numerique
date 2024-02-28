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
import { ContratTravailStoreSlice } from "../../../steps/ContratTravail/store";
import { CommonSituationStoreSlice } from "../../../../common/situationStore";

const initialInputState = {
  showVariablePay: false,
  showKnowingLastSalary: false,
  showLastMonthSalary: false,
};

const initialState: Agreement44StoreData = {
  input: initialInputState,
  error: {},
  hasBeenSubmit: false,
  isStepValid: false,
};

export const createAgreement44StoreSalaires: StoreSlice<
  Agreement44StoreSlice,
  SalairesStoreSlice &
    AncienneteStoreSlice &
    CommonInformationsStoreSlice &
    ContratTravailStoreSlice &
    CommonSituationStoreSlice
> = (set, get) => ({
  agreement44Data: { ...initialState },
  agreement44Function: {
    onInit: () => {
      const categoryPro =
        get().informationsData.input.publicodesInformations.find(
          (item) =>
            item.question.name ===
            "contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
        )?.info;
      const ancienneteInput = get().ancienneteData.input;
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;
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
        ancienneteInput.dateNotification === ancienneteInput.dateSortie;
      const isOuvrierOrAgent =
        categoryPro === "'Ouvriers et collaborateurs (Groupes I à III)'" ||
        categoryPro === "'Agents de maîtrise et techniciens (Groupe IV)'";
      const showVariablePay =
        isOuvrierOrAgent && get().salairesData.input.hasSameSalary === "non";
      set(
        produce((state: Agreement44StoreSlice) => {
          let isShowingLastSalary = false;
          let lastMonthSalary: SalaryPeriods | undefined = undefined;
          state.agreement44Data.input.showVariablePay = showVariablePay;
          isShowingLastSalary = !showVariablePay;
          if (sameDateNotificationDateSortie) {
            state.agreement44Data.input.showLastMonthSalary = false;
            isShowingLastSalary = false;
            lastMonthSalary = lastMonthSalaryProcess;
            state.agreement44Data.input.knowingLastSalary = undefined;
          } else {
            lastMonthSalary =
              get().agreement44Data.input.showLastMonthSalary &&
              lastMonthSalaryProcess.month ===
                get().agreement44Data.input.lastMonthSalary?.month
                ? get().agreement44Data.input.lastMonthSalary
                : lastMonthSalaryProcess;
          }
          if (state.agreement44Data.input.hasVariablePay === "non") {
            get().agreement44Function.onChangeHasVariablePay("non");
          }
          if (
            get().agreement44Data.input.hasVariablePay === "non" &&
            !sameDateNotificationDateSortie
          ) {
            isShowingLastSalary = true;
          }
          if (dateArretTravail) {
            isShowingLastSalary = false;
            lastMonthSalary = undefined;
          }
          state.agreement44Data.input.lastMonthSalary = lastMonthSalary;
          state.agreement44Data.input.showKnowingLastSalary =
            isShowingLastSalary;
          if (!isOuvrierOrAgent) {
            state.agreement44Data.input = initialInputState;
          }
        })
      );
    },
    onChangeHasVariablePay: (value) => {
      const categoryPro =
        get().informationsData.input.publicodesInformations.find(
          (item) =>
            item.question.name ===
            "contrat salarié - convention collective - industries chimiques - indemnité de licenciement - catégorie professionnelle"
        )?.info;
      const ancienneteInput = get().ancienneteData.input;
      const sameDateNotificationDateSortie =
        ancienneteInput.dateNotification === ancienneteInput.dateSortie;
      const isOuvrierOrAgent =
        categoryPro === "'Ouvriers et collaborateurs (Groupes I à III)'" ||
        categoryPro === "'Agents de maîtrise et techniciens (Groupe IV)'";
      const dateArretTravail = get().contratTravailData.input.dateArretTravail;
      get().situationFunction.setSituation("hasVariablePay", value);
      applyGenericValidation(get, set, [
        { paramName: "hasVariablePay", value: value },
        {
          paramName: "showKnowingLastSalary",
          value:
            value === "non" &&
            isOuvrierOrAgent &&
            get().agreement44Data.input.showVariablePay &&
            !sameDateNotificationDateSortie &&
            !dateArretTravail,
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
      const lastMonthSalaryValue =
        value === "non"
          ? lastMonthSalaryProcess
          : get().agreement44Data.input.lastMonthSalary;
      get().situationFunction.setSituation(
        "lastMonthSalary",
        JSON.stringify(lastMonthSalaryValue)
      );
      applyGenericValidation(get, set, [
        { paramName: "showLastMonthSalary", value: value === "oui" },
        { paramName: "knowingLastSalary", value },
        {
          paramName: "lastMonthSalary",
          value: lastMonthSalaryValue,
        },
      ]);
    },
    onChangeLastMonthSalary: (value) => {
      get().situationFunction.setSituation(
        "lastMonthSalary",
        JSON.stringify(value)
      );
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
    get().salairesFunction.onNextStep();
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
