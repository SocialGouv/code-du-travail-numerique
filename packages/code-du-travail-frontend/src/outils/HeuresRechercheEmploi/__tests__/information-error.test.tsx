import { HeuresRechercheEmploi } from "..";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ui } from "./ui";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
  "id": "KALICONT000044594539",
  "num": 3239,
  "shortTitle": "Particuliers employeurs et emploi à domicile",
  "slug": "3239-particuliers-employeurs-et-emploi-a-domicile",
  "title": "Particuliers employeurs et emploi à domicile"
}
`
);

test(`
  - Vérifier qu'on ne peut pas passer à l'étape suivante sans avoir sélectionné toutes les informations de la CC
`, async () => {
  await render(<HeuresRechercheEmploi icon="" title="" displayTitle="" />);

  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  fireEvent.change(ui.typeRupture.input.get(), {
    target: { value: "3| Licenciement" },
  });
  fireEvent.click(ui.next.get());

  fireEvent.change(ui.agreement3239.categoryProInput.get(), {
    target: {
      value: "100| Salariés du particulier employeur",
    },
  });
  fireEvent.click(ui.next.get());
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).toBeInTheDocument();
  fireEvent.change(ui.agreement3239.durationInput.get(), {
    target: {
      value: "124| Moins de 40 heures par semaine",
    },
  });
  fireEvent.change(ui.agreement3239.seniorityInput.get(), {
    target: {
      value: "43| 2 ans ou plus",
    },
  });
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).not.toBeInTheDocument();
  fireEvent.click(ui.next.get());
  expect(ui.print.get()).toBeInTheDocument();
});
