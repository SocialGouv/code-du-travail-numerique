import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

import { fireEvent, render, waitFor } from "@testing-library/react";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

test(`
  - Vérifier la recherche par cc
  - Vérifier la recherche par entreprise
  - Vérifier la non sélection d'une cc
`, async () => {
  await render(
    <CalculateurIndemnite
      icon={""}
      title={""}
      displayTitle={""}
      publicodesRules={loadPublicodesRules("indemnite-licenciement")}
    />
  );
  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.contract.type.cdi.get());
  fireEvent.click(ui.contract.fauteGrave.non.get());
  fireEvent.click(ui.contract.inaptitude.non.get());
  fireEvent.click(ui.next.get());

  // Vérifier la recherche par cc
  fireEvent.click(ui.agreement.agreement.get());
  fireEvent.change(ui.agreement.agreementInput.get(), {
    target: { value: "16" },
  });
  await waitFor(() =>
    fireEvent.click(ui.agreement.searchItem.agreement16.get())
  );
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.previous.get());
  expect(ui.agreement.agreementInputConfirm.query()).toBeInTheDocument();
  expect(ui.agreement.searchItem.agreement16.query()).toBeInTheDocument();

  // Vérifier la recherche par entreprise
  fireEvent.click(ui.agreement.unknownAgreement.get());
  expect(ui.agreement.agreementCompanyInputAsk.query()).toBeInTheDocument();
  expect(ui.agreement.agreementCompanyInput.query()).toBeInTheDocument();
  expect(ui.agreement.agreementPostalCodeInput.query()).toBeInTheDocument();
  fireEvent.change(ui.agreement.agreementCompanyInput.get(), {
    target: { value: "carrefour" },
  });
  await waitFor(() => {
    fireEvent.click(ui.agreement.searchItem.carrefour.get());
  });
  expect(ui.agreement.agreementCompanyInputConfirm.query()).toBeInTheDocument();
  expect(ui.agreement.ccChoice.commerce.query()).toBeInTheDocument();
  expect(ui.agreement.ccChoice.bureau.query()).toBeInTheDocument();
  fireEvent.click(ui.agreement.ccChoice.commerce.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.previous.get());
  expect(ui.agreement.agreementCompanyInputConfirm.query()).toBeInTheDocument();
  expect(ui.agreement.searchItem.carrefour.query()).toBeInTheDocument();

  // Vérifier la non sélection d'une cc
  fireEvent.click(ui.agreement.noAgreement.get());
  expect(ui.warning.query()).toBeInTheDocument();
});
