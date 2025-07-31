import { render, screen } from "@testing-library/react";
import { QuestionnaireWrapper } from "../QuestionnaireWrapper";
import { withStore } from "../store";
import { ui } from "./ui";

jest.mock("../service");

test(`Questionnaire
  - Vérifier l'affichage du résumé en mode personnalisé
`, async () => {
  const storeInitialState = withStore("dismissalProcess").getState();
  withStore("dismissalProcess").setState(
    {
      ...storeInitialState,
      previousResponses: [
        {
          text: "Statement1",
          index: 0,
        },
        {
          text: "Statement12",
          index: 0,
        },
      ],
      questionnaireSlug: "Slug12",
    },
    true
  );
  await render(<QuestionnaireWrapper name="dismissalProcess" slug="Slug12" />);
  expect(ui.response1.statement.query()).toBeInTheDocument();
  expect(ui.response12.statement.query()).toBeInTheDocument();
  expect(ui.question1.text.query()).not.toBeInTheDocument();
  expect(ui.question11.text.query()).not.toBeInTheDocument();
});
