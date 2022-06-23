import create from "zustand";
import { PreavisRetraiteState, PreavisRetraiteStore } from "./types";
import { PreavisRetraitePublicodes } from "@socialgouv/modeles-social";
import {
  askAccurateSeniority,
  computeMinSeniorityYear,
  computeNextQuestion,
  computeNotice,
  processAnalyticEvents,
  resetInfos,
  showOriginWarning,
} from "./usecases";
import { updateFormValues } from "./utils";
import removeOldQuestions from "./usecases/removeOldQuestions";
import validateInformationAgreement3239 from "./usecases/validateInformationAgreement3239";

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
    onAgreementChange: (newValue, oldValue, form) =>
      set((state) =>
        computeMinSeniorityYear(
          computeNextQuestion(
            resetInfos(newValue, oldValue, state, updateFormValues(form))
          )
        )
      ),
    onInformationChange: (name, form) =>
      set((state) =>
        computeNextQuestion(
          removeOldQuestions(state, updateFormValues(form), name)
        )
      ),
    onSeniorityChange: (form) =>
      set((state) => askAccurateSeniority(state, updateFormValues(form))),
    onStepChange: (oldStep, newStep) =>
      set((state) => {
        processAnalyticEvents(state, oldStep, newStep);
        return computeNotice(state);
      }),
  }));

export default createPreavisRetraiteStore;
