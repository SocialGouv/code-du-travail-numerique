import { Question } from "../../simulators/types";

export type CriteriaContainer = {
  criterias: CriteriaItem[];
  result: OptionResult;
};

export type TreeQuestionType = Question & {
  type: "agreement" | "radio" | "select";
};

export type CriteriaItem = {
  question: string;
  name: string;
  option: string;
  note?: string;
  key?: string;
  type: "agreement" | "radio" | "select";
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
  type: "agreement" | "radio" | "select";
};

export type TreeReference = {
  label: string;
  url: string;
};
