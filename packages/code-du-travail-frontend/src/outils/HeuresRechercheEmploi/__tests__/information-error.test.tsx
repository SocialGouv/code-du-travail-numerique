import { HeuresRechercheEmploi } from "..";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { ui } from "./ui";

jest.mock("../../../conventions/Search/api/agreements.service");

test(`
  - Vérifier qu'on ne peut pas passer à l'étape suivante sans avoir sélectionné toutes les informations de la CC
`, async () => {
  await render(<HeuresRechercheEmploi icon="" title="" displayTitle="" />);

  fireEvent.click(ui.introduction.startButton.get());

  fireEvent.click(ui.agreement.agreement.get());
  fireEvent.change(ui.agreement.agreementInput.get(), {
    target: { value: "3239" },
  });
  await waitFor(() =>
    expect(ui.agreement3239.searchResult.query()).toBeInTheDocument()
  );
  fireEvent.click(ui.agreement3239.searchResult.get());
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
    screen.getByText(/vous devez répondre à cette question/i)
  ).toBeInTheDocument();
});
