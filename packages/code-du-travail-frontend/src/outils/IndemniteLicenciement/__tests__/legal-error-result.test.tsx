import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../../conventions/Search/api/agreements.service");

test(`
    - Vérifier l'affichage de l'erreur légal cdd
    - Vérifier l'affichage de l'erreur légal faute grave
    - Vérifier l'affichage de l'erreur ancienneté < 8 mois
  `, async () => {
  await render(
    <CalculateurIndemnite
      icon={""}
      title={""}
      displayTitle={""}
      publicodesRules={loadPublicodesRules("indemnite-licenciement")}
    />
  );

  // Vérifier l'affichage de l'erreur légal cdd
  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.contract.type.cdd.get());
  fireEvent.click(ui.next.get());
  expect(ui.result.legalError.cdd.get()).toBeInTheDocument();

  // Vérifier l'affichage de l'erreur légal cdd
  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.contract.type.cdi.get());
  fireEvent.click(ui.contract.fauteGrave.oui.get());
  fireEvent.click(ui.next.get());
  expect(ui.result.legalError.fauteGrave.get()).toBeInTheDocument();

  // Vérifier l'affichage de l'erreur ancienneté < 8 mois
  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.contract.fauteGrave.non.get());
  fireEvent.click(ui.contract.inaptitude.non.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.agreement.agreement.get());
  fireEvent.change(ui.agreement.agreementInput.get(), {
    target: { value: "16" },
  });
  await waitFor(() =>
    fireEvent.click(ui.agreement.searchItem.agreement16.get())
  );
  fireEvent.click(ui.next.get());
  userEvent.selectOptions(
    ui.information.agreement16.proCategory.get(),
    "Ingénieurs et cadres"
  );
  fireEvent.click(ui.information.agreement16.proCategoryHasChanged.oui.get());
  fireEvent.change(ui.information.agreement16.dateProCategoryChanged.get(), {
    target: { value: "01/01/2010" },
  });
  fireEvent.change(ui.information.agreement16.engineerAge.get(), {
    target: { value: "38" },
  });
  fireEvent.click(ui.next.get());
  fireEvent.change(ui.seniority.startDate.get(), {
    target: { value: "01/09/2021" },
  });
  fireEvent.change(ui.seniority.notificationDate.get(), {
    target: { value: "01/01/2022" },
  });
  fireEvent.change(ui.seniority.endDate.get(), {
    target: { value: "01/01/2022" },
  });
  fireEvent.click(ui.seniority.hasAbsence.non.get());
  fireEvent.click(ui.next.get());
  expect(ui.result.legalError.seniorityToLow.get()).toBeInTheDocument();
});
