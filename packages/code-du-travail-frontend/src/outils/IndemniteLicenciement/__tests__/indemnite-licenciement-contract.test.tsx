import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

import { render, fireEvent } from "@testing-library/react";

test(`
  - Vérifier l'affichage de l'intro
  - Vérifier l'affichage de la question type contrat
  - Vérifier l'affichage de la question faute grave
  - Vérifier l'affichage de la question inaptitude
`, async () => {
  await render(
    <CalculateurIndemnite
      icon={""}
      title={""}
      displayTitle={""}
      slug={"indemnite-licenciement"}
    />
  );

  // Vérifier l'affichage de l'intro
  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  fireEvent.click(ui.introduction.startButton.get());

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
  fireEvent.click(ui.contract.type.cdi.get());

  // Vérifier l'affichage de la question faute grave
  expect(ui.contract.fauteGrave.question.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.oui.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.non.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.question.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).not.toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).not.toBeInTheDocument();
  fireEvent.click(ui.contract.fauteGrave.non.get());

  // Vérifier l'affichage de la question inaptitude
  expect(ui.contract.inaptitude.question.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).toBeInTheDocument();
});
