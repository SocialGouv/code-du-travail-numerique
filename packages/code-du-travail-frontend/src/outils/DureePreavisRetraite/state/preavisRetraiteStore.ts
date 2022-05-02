import create from "zustand";
import {PreavisRetraiteState, PreavisRetraiteStore} from "./types";
import {PreavisRetraitePublicodes} from "@socialgouv/modeles-social";
import {
  askAccurateSeniority,
  computeMinSeniorityYear,
  computeNextQuestion,
  computeNotice,
  initQuestions,
  processAnalyticEvents,
  showOriginWarning,
} from "./usecases";
import {updateFormValues} from "./utils";
import {StepName} from "../steps";

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
    onOriginChange: (type) => set((state) => showOriginWarning(state, type)),
    onAgreementChange: (form) =>
      set((state) =>
        computeMinSeniorityYear(initQuestions(state, updateFormValues(form)))
      ),
    onInformationChange: (name, form) =>
      set((state) => computeNextQuestion(state, updateFormValues(form), name)),
    onSeniorityChange: (form) =>
      set((state) => askAccurateSeniority(state, updateFormValues(form))),
    onStepChange: (oldStep, newStep) =>
      set((state) => {
        processAnalyticEvents(state, oldStep, newStep);
        return computeNotice(state);
      }),
  }));

export default createPreavisRetraiteStore;
