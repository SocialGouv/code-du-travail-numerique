import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

import { render, fireEvent } from "@testing-library/react";

test(`
  - Vérifier l'affichage de l'intro
  - Vérifier l'affichage des questions de contrat
  - Vérifier les bulles d'info
`, async () => {
  await render(
    <CalculateurIndemnite
      icon={""}
      title={""}
      displayTitle={""}
      publicodesRules={loadPublicodesRules("indemnite-licenciement")}
    />
  );

  // Vérifier l'affichage de l'intro
  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  fireEvent.click(ui.introduction.startButton.get());

  // Vérifier l'affichage des questions de contrat
  expect(ui.contract.type.question.query()).toBeInTheDocument();
  expect(ui.contract.type.cdi.query()).toBeInTheDocument();
  expect(ui.contract.type.cdd.query()).toBeInTheDocument();

  expect(ui.contract.fauteGrave.question.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.oui.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.non.query()).toBeInTheDocument();

  expect(ui.contract.inaptitude.question.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.non.query()).toBeInTheDocument();

  // Vérifier l'affichage des bulles d'info
  fireEvent.click(ui.contract.type.cdd.get());
  expect(ui.contract.type.alert.query()).toBeInTheDocument();
  fireEvent.click(ui.contract.type.cdi.get());
  expect(ui.contract.type.alert.query()).not.toBeInTheDocument();

  fireEvent.click(ui.contract.fauteGrave.oui.get());
  expect(ui.contract.fauteGrave.alert.query()).toBeInTheDocument();
  fireEvent.click(ui.contract.fauteGrave.non.get());
  expect(ui.contract.fauteGrave.alert.query()).not.toBeInTheDocument();
});
