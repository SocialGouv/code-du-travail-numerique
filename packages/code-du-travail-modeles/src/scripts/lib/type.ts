export type CriteriaContainer = {
  criterias: CriteriaItem[];
  result: OptionResult;
};

export type CriteriaItem = {
  question: string;
  name: string;
  option: string;
  note?: string;
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
  type: "agreement" | "radio" | "select";
  nextQuestion?: TreeQuestion;
  result?: OptionResult;
};

export type TreeQuestion = {
  name: string;
  text: string;
  note?: string;
  options: TreeOption[];
};
