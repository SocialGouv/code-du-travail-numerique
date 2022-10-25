import { getServerSideProps } from "../../../../pages/outils/[slug]";

import { CalculateurIndemnite } from "..";
import { ui } from "./ui";

import { render, fireEvent, screen } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ relatedItems: [] }),
  })
) as jest.Mock;

test(`
  - Vérifier l'affichage de l'intro
  - Vérifier l'affichage des questions de contrat
  - Vérifier les bulles d'info
`, async () => {
  // @ts-ignore
  const { props }: Props = await getServerSideProps({
    query: { slug: "indemnite-licenciement" },
  });
  await render(<CalculateurIndemnite {...props} />);

  // Vérifier l'affichage de l'intro
  expect(ui.title.query()).toBeInTheDocument();
  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  fireEvent.click(ui.introduction.startButton.get());

  // Vérifier l'affichage des questions de contrat
  expect(ui.contract.type.question.query()).toBeInTheDocument();
  expect(ui.contract.type.cdi.get()).toBeInTheDocument();
  expect(ui.contract.type.cdd.get()).toBeInTheDocument();

  expect(ui.contract.fauteGrave.question.query()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.oui.get()).toBeInTheDocument();
  expect(ui.contract.fauteGrave.non.get()).toBeInTheDocument();

  expect(ui.contract.inaptitude.question.query()).toBeInTheDocument();
  expect(ui.contract.inaptitude.oui.get()).toBeInTheDocument();
  expect(ui.contract.inaptitude.non.get()).toBeInTheDocument();

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
