import create from "zustand";
import {
  IndemniteLicenciementState,
  IndemniteLicenciementStore,
} from "./types";
import { IndemniteLicenciementPublicodes } from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForIndemniteLicenciement } from "../../publicodes";
import computeSalaryPeriods from "./usecases/computeSalaryPeriods";
import computeSeniority from "./usecases/computeSeniority";
import { getSalaireRef } from "../utils";

export const initialState: IndemniteLicenciementState = {
  title: "",
  steps: {
    salaries: {},
  },
  formValues: {},
};

const createIndemniteLicenciementStore = (rules: string, title: string) =>
  create<IndemniteLicenciementStore>((set) => ({
    ...initialState,
    title: title,
    publicodes: new IndemniteLicenciementPublicodes(rules),
    onFormValuesChange: (values) =>
      set((state) => ({
        ...state,
        formValues: values,
      })),
    onHasSameSalaryChange: (hasSameSalary) =>
      set((state) => {
        let salaryPeriods: any[] = [];
        const { absencePeriods, dateEntree, dateNotification } =
          state.formValues;
        if (
          !hasSameSalary &&
          absencePeriods &&
          dateEntree &&
          dateNotification
        ) {
          salaryPeriods = computeSalaryPeriods({
            dateEntree,
            dateNotification,
            absencePeriods,
          });
        }
        return {
          ...state,
          steps: { ...state.steps, salaries: { salaryPeriods } },
        };
      }),
    onSalariesChange: (value, currentSalaryIndex, form) =>
      set((state) => {
        console.log(">>>>>>", state.formValues.salaires);
        const salaries = state.formValues.salaires;
        if (!salaries?.length) return state;
        form.batch(() =>
          state.steps.salaries.salaryPeriods?.forEach((label, index) => {
            const salary = salaries[index];

            if (index > currentSalaryIndex && salary === null) {
              form.change(`salaries[${index}]`, value);
            }
          })
        );
        return state;
      }),
    onStepChange: (oldStep, newStep) =>
      set((state) => {
        // if (newStep.name === StepName.Info) {
        //   // Stepname.result
        //   const publicodes = state.publicodes;
        //   const {
        //     hasSameSalaire = false,
        //     salaires = [],
        //     primes = [],
        //     salaire,
        //     inaptitude = false,
        //     ccn,
        //     dateSortie,
        //     dateEntree,
        //     absencePeriods,
        //   } = state.formValues;

        //   if (!dateEntree || !dateSortie) {
        //     throw new Error(`Missing fields ${dateEntree} ${dateSortie}`);
        //   }

        //   const seniority = computeSeniority({
        //     dateSortie,
        //     dateEntree,
        //     absencePeriods,
        //   });
        //   const salaireRef = getSalaireRef({
        //     hasSameSalaire,
        //     primes,
        //     salaire,
        //     salaires,
        //   });

        //   const { result } = publicodes.setSituation(
        //     mapToPublicodesSituationForIndemniteLicenciement(
        //       ccn,
        //       seniority,
        //       salaireRef,
        //       inaptitude
        //     )
        //   );
        //   return { ...state, steps: { ...state.steps, result: { result } } };
        // }
        return state;
      }),
  }));

export default createIndemniteLicenciementStore;
