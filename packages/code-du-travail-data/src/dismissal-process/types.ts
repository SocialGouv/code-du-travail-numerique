export type QuestionnaireResponse = {
  text: string;
  trackingName: string;
  info?: string;
  description?: string;
  slug?: string;
  statement: string;
  neutralStatement?: string;
  neutralStatementRef?: boolean;
  question?: QuestionnaireQuestion;
};

export type QuestionnaireQuestion = {
  text: string;
  trackingName: string;
  info?: string;
  description?: string;
  responses: QuestionnaireResponse[];
};
