import create from "zustand";
import { PreavisRetraiteState, PreavisRetraiteStore } from "./types";
import { PreavisRetraitePublicodes } from "@socialgouv/modeles-social";
import { computeInfoQuestions, computeOriginWarning } from "./helpers";

export const initialState: PreavisRetraiteState = {
  title: "",
  steps: {
    origin: {
      showWarning: false,
    },
    seniority: {
      showAccurateSeniority: false,
      minYearCount: 2,
    },
    informations: {
      questions: [],
    },
  },
  formValues: {},
};

const createPreavisRetraiteStore = (rules: string, title: string) =>
  create<PreavisRetraiteStore>((set, get) => ({
    ...initialState,
    title: title,
    publicodes: new PreavisRetraitePublicodes(rules),
    onFormValuesChange: (values) =>
      set((state) => ({
        ...state,
        formValues: values,
      })),
    onOriginChange: (type) => set((state) => computeOriginWarning(state, type)),
    onAgreementChange: (form) =>
      set((state) => {
        console.log("On agreement change : ", state.formValues);
        console.log("On agreement change form : ", form.getState().values);
        return computeInfoQuestions(state, () => {});
      }),
    onInformationChange: (name, values, form) =>
      set((state) =>
        computeInfoQuestions(
          state,
          // Side effect for react-final-form
          (names) => {
            names.forEach((name) => {
              form.change(`infos.${name}`, undefined);
            });
          },
          name
        )
      ),
  }));

export default createPreavisRetraiteStore;
