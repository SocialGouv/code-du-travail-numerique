import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import { dismissalProcessQuiz, QuizQuestion } from "@cdt/data";
import { state } from "lit-element";

export type QuizStore = {
  questionTree: QuizQuestion;
  currentQuestion: string;
  nextQuestion: (index) => void;
};

const createStore = (quizName: string) =>
  create<QuizStore>((set, get) => ({
    questionTree: dismissalProcessQuiz,
    currentQuestion: "",
    nextQuestion: (index) => {
      const current = get().currentQuestion;
      return set({
        currentQuestion: current !== "" ? `${current}.${index}` : `${index}`,
      });
    },
  }));

const { Provider, useStore } = createContext<StoreApi<QuizStore>>();

export {
  Provider as QuizProvider,
  createStore as createQuizStore,
  useStore as useQuizStore,
};
