import { DureePreavisLicenciement } from "..";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { ui } from "./ui";

jest.mock("../../../conventions/Search/api/agreements.service");

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

  fireEvent.click(ui.agreement.agreement.get());
  fireEvent.change(ui.agreement.agreementInput.get(), {
    target: { value: "1351" },
  });
  await waitFor(() =>
    expect(ui.agreement1351.searchResult.query()).toBeInTheDocument()
  );
  fireEvent.click(ui.agreement1351.searchResult.get());
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
