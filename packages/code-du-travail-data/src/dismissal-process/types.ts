export type QuestionnaireResponse = {
  text: string;
  trackingName: string;
  info?: string;
  description?: string;
  slug?: string;
  statement?: string;
  question?: QuestionnaireQuestion;
  isSlugReference?: boolean;
};

export type QuestionnaireQuestion = {
  text: string;
  trackingName: string;
  responseStatement?: string;
  info?: string;
  description?: string;
  responses: QuestionnaireResponse[];
};
