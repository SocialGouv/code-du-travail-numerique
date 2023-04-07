import { DureePreavisRetraite } from "..";

import { fireEvent, render, screen } from "@testing-library/react";

import { ui } from "./ui";
import { loadPublicodesRules } from "../../api";

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
  await render(
    <DureePreavisRetraite
      icon=""
      title=""
      displayTitle=""
      slug={"preavis-retraite"}
    />
  );

  fireEvent.click(ui.introduction.startButton.get());

  fireEvent.click(ui.origin.depart.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  fireEvent.change(ui.information.agreement1351.categoryProInput.get(), {
    target: {
      value: "'Agents de maîtrise'",
    },
  });
  fireEvent.click(ui.next.get());
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).toBeInTheDocument();

  fireEvent.click(ui.information.agreement1351.disableWorkerNoInput.get());
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).not.toBeInTheDocument();
  fireEvent.click(ui.next.get());
});
