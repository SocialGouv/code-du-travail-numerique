export type QuestionnaireResponse = {
  text: string;
  name: string;
  info?: string;
  description?: string;
  slug?: string;
  statement?: string;
  question?: QuestionnaireQuestion;
  isSlugReference?: boolean;
};

export type QuestionnaireQuestion = {
  text: string;
  name: string;
  responseStatement?: string;
  info?: string;
  description?: string;
  responses: QuestionnaireResponse[];
};
