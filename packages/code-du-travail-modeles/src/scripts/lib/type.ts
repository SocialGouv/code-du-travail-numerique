import { Question } from "../../simulators/types";

export type CriteriaContainer = {
  criterias: CriteriaItem[];
  result: OptionResult;
};

export type QuestionType = "agreement" | "radio" | "select" | "input";

export type TreeQuestionType = Question & {
  type: QuestionType;
  commonNamespace?: string;
};

export type CriteriaItem = {
  question: string;
  name: string;
  option: string;
  note?: string;
  key?: string;
  type: QuestionType;
  commonNamespace?: string;
};

export type OptionResult = {
  texts: string[];
  refs: {
    label: string;
    url: string;
  }[];
};

export type TreeOption = {
  text: string;
  nextQuestion?: TreeQuestion;
  result?: OptionResult;
};

export type TreeQuestion = {
  name: string;
  text: string;
  note?: string;
  options: TreeOption[];
  key?: string;
  type: QuestionType;
  commonNamespace?: string;
};

export type TreeReference = {
  label: string;
  url: string;
};
