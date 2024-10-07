import { HeuresRechercheEmploi } from "..";

import { fireEvent, render, waitFor } from "@testing-library/react";

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
  - Vérifier que lorsqu'on fait un retour en arrière, on peut re-sélectionner la catégorie pro
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
  expect(ui.agreement3239.categoryProInput.get()).toHaveValue(
    "100| Salariés du particulier employeur"
  );
  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.next.get());
  expect(ui.agreement3239.categoryProInput.get()).toHaveValue(
    "100| Salariés du particulier employeur"
  );
});
