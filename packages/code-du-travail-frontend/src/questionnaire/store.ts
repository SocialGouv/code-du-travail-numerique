import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import {
  dismissalProcessQuestionnaire,
  QuestionnaireQuestion,
  QuestionnaireResponse,
} from "@cdt/data";
import { getCurrentQuestion, getResponseStatement } from "./service";

export type Store = {
  questionTree: QuestionnaireQuestion;
  currentQuestion: QuestionnaireQuestion;
  lastResponse?: QuestionnaireResponse;
  previousResponses: PreviousResponse[];
  answer: (index: number) => void;
  goTo: (index: number) => void;
  getSlug: () => string | undefined;
};

export type PreviousResponse = {
  index: number;
  text: string;
};

const createStore = (Name: string) =>
  create<Store>((set, get): Store => {
    return {
      questionTree: dismissalProcessQuestionnaire,
      currentQuestion: dismissalProcessQuestionnaire,
      lastResponse: undefined,
      previousResponses: [],
      answer: (index) => {
        const previousResponsesOld = get().previousResponses;
        const currentQuestionOld = get().currentQuestion;
        const lastResponse = currentQuestionOld.responses[index];
        const currentQuestion = lastResponse.question;
        const text = getResponseStatement(currentQuestionOld, index);
        const previousResponses = previousResponsesOld.concat({ index, text });
        set({ previousResponses, currentQuestion, lastResponse });
      },
      goTo: (index) => {
        const previousResponsesOld = get().previousResponses;
        const data = get().questionTree;
        const previousResponses = previousResponsesOld.slice(0, index);
        const { currentQuestion, lastResponse } = getCurrentQuestion(
          data,
          previousResponses
        );
        set({ previousResponses, currentQuestion, lastResponse });
      },
      getSlug: () => {
        const currentQuestion = get().currentQuestion;
        const previousResponses = get().previousResponses;
        if (!previousResponses.length) return;
        const { index } = previousResponses.reverse()[0];
        return currentQuestion.responses[index]?.slug;
      },
    };
  });

const { Provider, useStore } = createContext<StoreApi<Store>>();

export { Provider, createStore, useStore };
