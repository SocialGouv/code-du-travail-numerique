import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

test(`
  - Vérifier l'affichage de l'intro
  - Vérifier l'affichage de la question type contrat
  - Vérifier l'affichage de la question faute grave
  - Vérifier l'affichage de la question inaptitude
`, async () => {
  await render(<CalculateurIndemniteLicenciement title={""} />);
  const userAction = new UserAction();

  // Vérifier l'affichage de l'intro
  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  userAction.click(ui.introduction.startButton.get());

  // Vérifier l'affichage de la question inaptitude
  expect(ui.contract.inaptitude.question.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).toBeInTheDocument();
});
