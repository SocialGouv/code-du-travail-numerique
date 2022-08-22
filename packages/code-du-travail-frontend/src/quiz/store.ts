import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import { dismissalProcessQuiz, QuizQuestion } from "@cdt/data";
import { getCurrentQuestion, getResponseStatement } from "./service";

export type QuizStore = {
  questionTree: QuizQuestion;
  currentQuestion: QuizQuestion;
  previousResponses: PreviousResponse[];
  nextQuestion: (index: number) => void;
  goTo: (index: number) => void;
};

export type PreviousResponse = {
  index: number;
  text: string;
};

const createStore = (quizName: string) =>
  create<QuizStore>((set, get): QuizStore => {
    return {
      questionTree: dismissalProcessQuiz,
      currentQuestion: dismissalProcessQuiz,
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

const { Provider, useStore } = createContext<StoreApi<QuizStore>>();

export {
  Provider as QuizProvider,
  createStore as createQuizStore,
  useStore as useQuizStore,
};
