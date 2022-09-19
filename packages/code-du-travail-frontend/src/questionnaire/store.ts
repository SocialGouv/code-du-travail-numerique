import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import {
  dismissalProcessQuestionnaire,
  QuestionnaireQuestion,
  QuestionnaireResponse,
} from "@cdt/data";
import {
  getCurrentQuestion,
  getResponseStatement,
  slugSummaryRecursive,
} from "./service";
import { SlugResponses } from "./type";
import { trackSelectResponse, trackViewQuestion } from "./tracking";

export type Store = {
  questionTree?: QuestionnaireQuestion;
  currentQuestion?: QuestionnaireQuestion;
  lastResponse?: QuestionnaireResponse;
  previousResponses: PreviousResponse[];
  slugResponses?: SlugResponses;
  toolSlug?: string;
  answer: (index: number) => void;
  goTo: (index: number) => void;
  getSlug: () => string | undefined;
  init: () => void;
  initSlugResponses: (slug: string) => void;
};

export type PreviousResponse = {
  index: number;
  text: string;
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
          const slugResponses = slugSummaryRecursive(
            dismissalProcessQuestionnaire
          );
          const questionTree = dismissalProcessQuestionnaire;
          const currentQuestion = dismissalProcessQuestionnaire;
          set({ slugResponses, questionTree, currentQuestion });
        }
      },
      initSlugResponses: (slug) => {
        const slugResponses = get().slugResponses;
        const lastResponseOld = get().lastResponse;
        const data = get().questionTree;
        if (!slugResponses || lastResponseOld?.slug || !data) return;
        const previousResponses = slugResponses[slug];
        const { currentQuestion, lastResponse } = getCurrentQuestion(
          data,
          previousResponses
        );
        set({ previousResponses, currentQuestion, lastResponse });
      },
      answer: (index) => {
        const previousResponsesOld = get().previousResponses;
        const currentQuestionOld = get().currentQuestion;
        if (!currentQuestionOld) return;
        const lastResponse = currentQuestionOld.responses[index];
        const currentQuestion = lastResponse.question;
        const text = getResponseStatement(currentQuestionOld, index);
        const previousResponses = previousResponsesOld.concat({ index, text });
        trackSelectResponse(lastResponse.trackingName);
        if (currentQuestion) {
          trackViewQuestion(currentQuestion.trackingName);
        }
        set({ previousResponses, currentQuestion, lastResponse });
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
        if (currentQuestion) {
          trackViewQuestion(currentQuestion.trackingName);
        }
        set({ previousResponses, currentQuestion, lastResponse });
      },
      getSlug: () => {
        const currentQuestion = get().currentQuestion;
        if (!currentQuestion) return;
        const previousResponses = get().previousResponses;
        if (!previousResponses.length) return;
        const { index } = previousResponses.reverse()[0];
        return currentQuestion.responses[index]?.slug;
      },
    };
  });

const { Provider, useStore } = createContext<StoreApi<Store>>();

export { Provider, createStore, useStore };
