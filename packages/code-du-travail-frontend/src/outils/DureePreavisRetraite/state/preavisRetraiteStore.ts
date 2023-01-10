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
import resetInfosLastQuestionNotAnsweredOnOriginChange from "./usecases/resetInfosLastQuestionNotAnsweredOnOriginChange";
import produce from "immer";
import { loadPublicodes } from "../../api";

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

const createPreavisRetraiteStore = (title: string, slug: string) =>
  create<PreavisRetraiteStore>((set) => ({
    ...initialState,
    title: title,
    publicodes: loadPublicodes(slug),
    onFormValuesChange: (values) =>
      set((state) => ({
        ...state,
        formValues: values,
      })),
    onOriginChange: (oldType, newType) =>
      set((state) =>
        resetInfosLastQuestionNotAnsweredOnOriginChange(
          oldType,
          newType,
          showOriginWarning(state, newType!!)
        )
      ),
    onAgreementChange: (newValue, oldValue, form) =>
      set((state) => {
        return {
          ...computeMinSeniorityYear(
            computeNextQuestion(
              resetInfos(newValue, oldValue, state, updateFormValues(form))
            )
          ),
          publicodes: slug
            ? loadPublicodes(slug, newValue?.num?.toString())
            : undefined,
        };
      }),
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
