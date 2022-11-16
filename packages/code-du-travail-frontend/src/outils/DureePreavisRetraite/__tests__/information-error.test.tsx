import { DureePreavisRetraite } from "..";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { ui } from "./ui";
import { loadPublicodesRules } from "../../api";

jest.mock("../../../conventions/Search/api/agreements.service");

test(`
  - Vérifier qu'on ne peut pas passer à l'étape suivante sans avoir sélectionné toutes les informations de la CC
`, async () => {
  await render(
    <DureePreavisRetraite
      icon=""
      title=""
      displayTitle=""
      publicodesRules={loadPublicodesRules("preavis-retraite")}
    />
  );

  fireEvent.click(ui.introduction.startButton.get());

  fireEvent.click(ui.origin.departRetraiteOui.get());
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
      value: "'Agents de maîtrise'",
    },
  });
  fireEvent.click(ui.next.get());
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).toBeInTheDocument();

  fireEvent.click(ui.agreement1351.disableWorkerNoInput.get());
  expect(
    screen.queryByText(/vous devez répondre à cette question/i)
  ).not.toBeInTheDocument();
  fireEvent.click(ui.next.get());
});
