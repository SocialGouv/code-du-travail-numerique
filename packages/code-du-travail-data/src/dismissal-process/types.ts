export type QuestionnaireResponse = {
  text: string;
  info?: string;
  description?: string;
  slug?: string;
  question?: QuestionnaireQuestion;
};

export type QuestionnaireQuestion = {
  text: string;
  statement: string;
  info?: string;
  description?: string;
  responses: QuestionnaireResponse[];
};
