import { QuestionnaireQuestion } from "@cdt/data";

export const getQuestionnaire = (): QuestionnaireQuestion => {
  return {
    text: "Question1",
    trackingName: "Question1",
    description: "Description",
    info: "Question1Info",
    responses: [
      {
        text: "Response1",
        trackingName: "Response1",
        statement: "Statement1",
        neutralStatementRef: true,
        info: "Response1Info",
        question: {
          text: "Question11",
          trackingName: "name1",
          responses: [
            {
              text: "Response11",
              trackingName: "Response11",
              statement: "Statement11",
              neutralStatement: "neutralStatement11",
              slug: "Slug11",
            },
            {
              text: "Response12",
              trackingName: "Response12",
              statement: "Statement12",
              neutralStatement: "neutralStatement12",
              neutralStatementInfo: "neutralStatementInfo12",
              slug: "Slug12",
            },
          ],
        },
      },
      {
        text: "Response2",
        trackingName: "Response2",
        statement: "Statement2",
        slug: "Response2",
      },
    ],
  };
};
