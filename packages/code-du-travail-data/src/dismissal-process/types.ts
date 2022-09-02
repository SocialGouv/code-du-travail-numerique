export type QuestionnaireResponse = {
  text: string;
  info?: string;
  description?: string;
  slug?: string;
  statement?: string;
  question?: QuestionnaireQuestion;
  isSlugReference?: boolean;
};

export type QuestionnaireQuestion = {
  text: string;
  responseStatement?: string;
  info?: string;
  description?: string;
  responses: QuestionnaireResponse[];
};
