import { DureePreavisLicenciement } from "..";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ui } from "./ui";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 1351,
  "shortTitle": "CC 1351",
  "id": "KALICONT",
  "title": "CC 1351",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT",
  "slug": "cc-1351"
}
`
);


test(`
  - Vérifier qu'on ne peut pas passer à l'étape suivante sans avoir sélectionné toutes les informations de la CC
`, async () => {
  await render(<DureePreavisLicenciement icon="" title="" displayTitle="" />);

  fireEvent.click(ui.introduction.startButton.get());

  fireEvent.click(ui.situation.fauteGraveNon.get());
  fireEvent.click(ui.situation.handicapNon.get());
  fireEvent.change(ui.situation.seniority.get(), {
    target: { value: "15| Moins de 6 mois" },
  });
  fireEvent.click(ui.next.get());

  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  fireEvent.change(ui.agreement1351.categoryProInput.get(), {
    target: {
      value:
        "20| Agents d'exploitation, employés administratifs et techniciens",
    },
  });
  fireEvent.click(ui.next.get());
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).toBeInTheDocument();

  fireEvent.change(ui.agreement1351.levelInput.get(), {
    target: {
      value: "4| III",
    },
  });
  fireEvent.change(ui.agreement1351.seniorityInput.get(), {
    target: {
      value: "36| Plus de 6 mois à 2 ans",
    },
  });
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).not.toBeInTheDocument();
  fireEvent.click(ui.next.get());
  expect(ui.print.get()).toBeInTheDocument();
});
