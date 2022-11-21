import { render, fireEvent, waitFor } from "@testing-library/react";
import { QuestionnaireWrapper } from "../Components";
import { ui } from "./ui";

jest.mock("../service");

test(`Questionnaire:
  - Vérifier l'affichage initial
  - Vérifier l'affichage des tooltips
  - Vérifier la navigation
  - Vérifier le retour en arrière
`, async () => {
  await render(
    <QuestionnaireWrapper
      name="dismissalProcess"
      title="Quelle est votre situation ?"
      slug="procedure-licenciement"
    />
  );
  // Vérifier l'affichage initial
  expect(ui.situationTitle.query()).toBeInTheDocument();
  expect(ui.question1.text.query()).toBeInTheDocument();
  expect(ui.response1.text.query()).toBeInTheDocument();
  expect(ui.response2.text.query()).toBeInTheDocument();
  expect(ui.question1.description.query()).toBeInTheDocument();
  expect(ui.question1.tooltip.query()).toBeInTheDocument();
  // Vérifier l'affichage des tooltips
  fireEvent.click(ui.question1.tooltip.get());
  expect(ui.question1.tooltipText.query()).toBeInTheDocument();
  fireEvent.click(ui.question1.tooltip.get());
  expect(ui.question1.tooltipText.query()).not.toBeInTheDocument();
  fireEvent.click(ui.response1.tooltip.get());
  expect(ui.response1.tooltipText.query()).toBeInTheDocument();
  fireEvent.click(ui.response1.tooltip.get());
  expect(ui.response1.tooltipText.query()).not.toBeInTheDocument();
  // Vérifier la navigation
  fireEvent.click(ui.response1.text.get());
  expect(ui.response1.statement.query()).toBeInTheDocument();
  expect(ui.response1.modify.query()).toBeInTheDocument();
  expect(ui.question11.text.query()).toBeInTheDocument();
  expect(ui.response11.text.query()).toBeInTheDocument();
  expect(ui.response12.text.query()).toBeInTheDocument();
  fireEvent.click(ui.response12.text.get());
  expect(ui.response12.statement.query()).toBeInTheDocument();
  expect(ui.response12.modify.query()).toBeInTheDocument();
  expect(ui.button.displayInfoPage.query()).toBeInTheDocument();
  // Vérifier le retour en arrière
  fireEvent.click(ui.response12.modify.get());
  await waitFor(() => {
    expect(ui.response1.statement.query()).toBeInTheDocument();
    expect(ui.response12.statement.query()).not.toBeInTheDocument();
    expect(ui.question11.text.query()).toBeInTheDocument();
    expect(ui.response11.text.query()).toBeInTheDocument();
    expect(ui.response12.text.query()).toBeInTheDocument();
  });
  fireEvent.click(ui.response1.modify.get());
  await waitFor(() => {
    expect(ui.question1.text.query()).toBeInTheDocument();
    expect(ui.response1.text.query()).toBeInTheDocument();
    expect(ui.response2.text.query()).toBeInTheDocument();
  });
});
