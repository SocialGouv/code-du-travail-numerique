import { fireEvent, render } from "@testing-library/react";
import { QuestionnaireWrapper } from "../Components";
import { ui } from "./ui";

jest.mock("../service");

test(`Questionnaire
  - Vérifier l'affichage du résumé en mode non personnalisé
  - Vérifier l'affichage des tooltips
  - Vérifier le non affichage des questions
`, async () => {
  await render(
    <QuestionnaireWrapper
      name="dismissalProcess"
      title="Titre"
      personnalizedTitle="Titre personnalisé"
      slug="Slug12"
    />
  );
  // Vérifier l'affichage du résumé en mode non personnalisé
  expect(ui.response12.neutralStatement.query()).toBeInTheDocument();
  expect(ui.button.changeProcedure.query()).toBeInTheDocument();
  // Vérifier l'affichage des tooltips
  expect(ui.response12.neutralStatementTooltip.query()).toBeInTheDocument();
  fireEvent.click(ui.response12.neutralStatementTooltip.get());
  expect(ui.response12.neutralStatementTooltipText.query()).toBeInTheDocument();
  fireEvent.click(ui.response12.neutralStatementTooltip.get());
  expect(
    ui.response12.neutralStatementTooltipText.query()
  ).not.toBeInTheDocument();
  // Vérifier le non affichage des questions
  expect(ui.question1.text.query()).not.toBeInTheDocument();
  expect(ui.question11.text.query()).not.toBeInTheDocument();
});
