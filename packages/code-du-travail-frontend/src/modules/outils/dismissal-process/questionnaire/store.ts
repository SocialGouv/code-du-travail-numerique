import { getCurrentQuestion, slugSummaryRecursive } from "./utils";
import { getQuestionnaire } from "./service";
import {
  PreviousResponse,
  QuestionnaireQuestion,
  QuestionnaireResponse,
  SlugResponses,
} from "./type";
import { createContext } from "react";
import { createStore as create, StoreApi, useStore } from "zustand";

export type Store = {
  questionTree?: QuestionnaireQuestion;
  currentQuestion?: QuestionnaireQuestion;
  lastResponse?: QuestionnaireResponse;
  previousResponses: PreviousResponse[];
  slugResponses?: SlugResponses;
  toolSlug?: string;
  questionnaireSlug?: string;
  answer: (index: number) => void;
  goTo: (index: number) => void;
  getSlug: () => string | undefined;
  init: () => void;
  setQuestionnaireSlug: (questionnaireSlug: string) => void;
  isPersonnalizedMode: (slug: string) => boolean;
  getSlugResponses: (slug?: string) => PreviousResponse[];
};

const Stores = {};

export const withStore = (name: string) => {
  if (!Stores[name]) {
    Stores[name] = createStore(name);
  }
  return Stores[name];
};

const createStore = (name: string) =>
  create<Store>((set, get): Store => {
    return {
      previousResponses: [],
      toolSlug: "procedure-licenciement",
      init: () => {
        const slugResponsesOld = get().slugResponses;
        const questionTreeOld = get().questionTree;
        const currentQuestionOld = get().currentQuestion;
        if (!slugResponsesOld && !questionTreeOld && !currentQuestionOld) {
          const dismissalProcessQuestionnaire = getQuestionnaire(name);
          const slugResponses = slugSummaryRecursive(
            dismissalProcessQuestionnaire
          );
          const questionTree = dismissalProcessQuestionnaire;
          const currentQuestion = dismissalProcessQuestionnaire;
          set({ slugResponses, questionTree, currentQuestion });
        }
      },
      getSlugResponses: (slug) => {
        const slugResponses = get().slugResponses;
        return slug && slugResponses ? slugResponses[slug] : [];
      },
      answer: (index) => {
        const previousResponsesOld = get().previousResponses;
        const currentQuestionOld = get().currentQuestion;
        if (!currentQuestionOld) return;
        const lastResponse = currentQuestionOld.responses[index];
        const currentQuestion = lastResponse.question;
        const { statement: text } = currentQuestionOld.responses[index];
        const previousResponses = previousResponsesOld.concat({ index, text });
        set({
          previousResponses,
          currentQuestion,
          lastResponse,
        });
      },
      goTo: (index) => {
        const previousResponsesOld = get().previousResponses;
        const data = get().questionTree;
        if (!data) return;
        const previousResponses = previousResponsesOld.slice(0, index);
        const { currentQuestion, lastResponse } = getCurrentQuestion(
          data,
          previousResponses
        );
        set({
          previousResponses,
          currentQuestion,
          lastResponse,
          questionnaireSlug: undefined,
        });
      },
      getSlug: () => {
        const currentQuestion = get().currentQuestion;
        if (!currentQuestion) return;
        const previousResponses = get().previousResponses;
        if (!previousResponses.length) return;
        const { index } = previousResponses.reverse()[0];
        return currentQuestion.responses[index]?.slug;
      },
      setQuestionnaireSlug: (questionnaireSlug: string) => {
        set({ questionnaireSlug });
      },
      isPersonnalizedMode: (slug: string) => {
        const questionnaireSlug = get().questionnaireSlug;
        const toolSlug = get().toolSlug;
        return (
          slug === toolSlug ||
          (!!questionnaireSlug && questionnaireSlug === slug)
        );
      },
    };
  });

const DossierLicenciementContext = createContext<StoreApi<Store>>(
  {} as StoreApi<Store>
);

const { Provider } = DossierLicenciementContext;

export { Provider, createStore, useStore, DossierLicenciementContext };
