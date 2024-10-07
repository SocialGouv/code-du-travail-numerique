import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { UserAction } from "../../../common";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

import { render } from "@testing-library/react";

test(`
  - Vérifier l'affichage de l'intro
  - Vérifier l'affichage de la question type contrat
  - Vérifier l'affichage de la question faute grave
  - Vérifier l'affichage de la question inaptitude
`, async () => {
  await render(
    <CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />,
  );
  const userAction = new UserAction();

  // Vérifier l'affichage de l'intro
  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  userAction.click(ui.introduction.startButton.get());

  // Vérifier l'affichage de la question type contrat
  expect(ui.contract.type.question.query()).toBeInTheDocument();
  expect(ui.contract.type.cdi.query()).toBeInTheDocument();
  expect(ui.contract.type.cdd.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.question.query()).not.toBeInTheDocument();
  expect(ui.contract.fauteGrave.oui.query()).not.toBeInTheDocument();
  expect(ui.contract.fauteGrave.non.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.question.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).not.toBeInTheDocument();
  userAction.click(ui.contract.type.cdi.get());

  // Vérifier l'affichage de la question faute grave
  expect(ui.contract.fauteGrave.question.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.oui.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.non.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.question.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).not.toBeInTheDocument();
  userAction.click(ui.contract.fauteGrave.non.get());

  // Vérifier l'affichage de la question inaptitude
  expect(ui.contract.inaptitude.question.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).toBeInTheDocument();
});
