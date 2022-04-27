import create from "zustand";
import { PreavisRetraiteState, PreavisRetraiteStore } from "./types";
import { PreavisRetraitePublicodes } from "@socialgouv/modeles-social";
import { computeInfoQuestions, computeOriginWarning } from "./helpers";
import { cleanForm } from "./utils/cleanForm";

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
  create<PreavisRetraiteStore>((set) => ({
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
      set((state) => computeInfoQuestions(state, cleanForm(form))),
    onInformationChange: (name, values, form) =>
      set((state) => computeInfoQuestions(state, cleanForm(form), name)),
  }));

export default createPreavisRetraiteStore;
