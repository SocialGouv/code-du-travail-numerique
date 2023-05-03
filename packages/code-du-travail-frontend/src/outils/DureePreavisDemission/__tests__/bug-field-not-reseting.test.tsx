import { DureePreavisDemission } from "..";

import { fireEvent, render, waitFor } from "@testing-library/react";

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
  - Vérifier l'affichage de la cc 1351 lorsque l'on change la sélection de catégorie
`, async () => {
  await render(<DureePreavisDemission icon="" title="" displayTitle="" />);

  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  fireEvent.change(ui.agreement1351.categoryProInput.get(), {
    target: {
      value:
        "20| Agents d'exploitation, employés administratifs et techniciens",
    },
  });
  fireEvent.change(ui.agreement1351.levelInput.get(), {
    target: { value: "1| I" },
  });
  fireEvent.change(ui.agreement1351.seniorityInput.get(), {
    target: { value: "1| Moins de 15 jours" },
  });
  fireEvent.change(ui.agreement1351.categoryProInput.get(), {
    target: {
      value: "48| Cadres",
    },
  });
  fireEvent.change(ui.agreement1351.seniorityInput.get(), {
    target: { value: "2| 15 jours à 1 mois" },
  });
  fireEvent.click(ui.next.get());
  expect(ui.print.get()).toBeInTheDocument();
});
