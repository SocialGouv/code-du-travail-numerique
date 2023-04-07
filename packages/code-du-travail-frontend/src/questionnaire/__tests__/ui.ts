import { byTestId, byText } from "testing-library-selector";

export const ui = {
  situationTitle: byText("Quelle est votre situation ?"),
  personnalizedTitle: byText("Titre personnalisé"),
  question1: {
    text: byText("Question1"),
    description: byText("Description"),
    tooltip: byTestId("Tooltip-Question1"),
    tooltipText: byText("Question1Info"),
  },
  response1: {
    text: byText("Response1"),
    tooltip: byTestId("Tooltip-Response1"),
    tooltipText: byText("Response1Info"),
    statement: byText("Statement1"),
    neutralStatement: byText("neutralStatement1"),
    modify: byTestId("modify-Statement1"),
  },
  response2: {
    text: byText("Response2"),
    statement: byText("Statement2"),
    neutralStatement: byText("neutralStatement2"),
    modify: byTestId("modify-Statement2"),
  },
  question11: {
    text: byText("Question11"),
  },
  response11: {
    text: byText("Response11"),
    statement: byText("Statement11"),
    neutralStatement: byText("neutralStatement11"),
    modify: byTestId("modify-Statement11"),
  },
  response12: {
    text: byText("Response12"),
    statement: byText("Statement12"),
    neutralStatement: byText("neutralStatement12"),
    neutralStatementTooltip: byTestId("Tooltip-neutralStatement12"),
    neutralStatementTooltipText: byText("neutralStatementInfo12"),
    modify: byTestId("modify-Statement12"),
  },
  button: {
    displayInfoPage: byText("Afficher les informations personnalisées"),
    changeProcedure: byText("Changer de procédure"),
  },
};
