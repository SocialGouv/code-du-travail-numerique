import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import {
  dismissalProcessQuestionnaire,
  QuestionnaireQuestion,
} from "@cdt/data";
import { getCurrentQuestion, getResponseStatement } from "./service";

export type Store = {
  questionTree: QuestionnaireQuestion;
  currentQuestion: QuestionnaireQuestion;
  previousResponses: PreviousResponse[];
  nextQuestion: (index: number) => void;
  goTo: (index: number) => void;
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
      previousResponses: [],
      nextQuestion: (index) => {
        const previousResponsesOld = get().previousResponses;
        const currentQuestionOld = get().currentQuestion;
        const currentQuestion =
          currentQuestionOld.responses[index].question ?? currentQuestionOld;
        const text = getResponseStatement(currentQuestionOld, index);
        const previousResponses = previousResponsesOld.concat({ index, text });
        set({ previousResponses, currentQuestion });
      },
      goTo: (index) => {
        const previousResponsesOld = get().previousResponses;
        const data = get().questionTree;
        const previousResponses = previousResponsesOld.slice(0, index);
        const currentQuestion = getCurrentQuestion(data, previousResponses);
        set({ previousResponses, currentQuestion });
      },
    };
  });

const { Provider, useStore } = createContext<StoreApi<Store>>();

export {
  Provider as Provider,
  createStore as createStore,
  useStore as useStore,
};
