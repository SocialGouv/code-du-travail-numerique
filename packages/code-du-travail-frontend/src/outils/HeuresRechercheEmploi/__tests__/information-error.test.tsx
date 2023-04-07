import { HeuresRechercheEmploi } from "..";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ui } from "./ui";

jest.mock("../../../conventions/Search/api/agreements.service");

test(`
  - Vérifier qu'on ne peut pas passer à l'étape suivante sans avoir sélectionné toutes les informations de la CC
`, async () => {
  await render(<HeuresRechercheEmploi icon="" title="" displayTitle="" />);

  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.agreement.agreement.get());
  fireEvent.focus(ui.agreement.agreementInput.get());
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
