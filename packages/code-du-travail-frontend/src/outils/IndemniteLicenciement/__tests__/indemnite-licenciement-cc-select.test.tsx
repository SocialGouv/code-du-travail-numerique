import { CalculateurIndemniteLicenciement } from "../index";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

import { fireEvent, render, waitFor } from "@testing-library/react";
import { UserAction } from "../../../common";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Indemnité licenciement - Sélection de CC", () => {
  beforeEach(() => {
    render(<CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
  });
  test("Vérifier la recherche par cc", async () => {
    const userAction = new UserAction();

    userAction
      .click(ui.agreement.agreement.get())
      .setInput(ui.agreement.agreementInput.get(), "16")
      .click(await waitFor(() => ui.agreement.ccChoice.transport.get()))
      .click(ui.next.get());

    fireEvent.click(ui.previous.get());
    expect(ui.agreement.agreementInputConfirm.query()).toBeInTheDocument();
    expect(ui.agreement.searchItem.agreement16.query()).toBeInTheDocument();
  });
  test("Vérifier la recherche par entreprise", async () => {
    fireEvent.click(ui.agreement.unknownAgreement.get());
    expect(ui.agreement.agreementCompanyInputAsk.query()).toBeInTheDocument();
    expect(ui.agreement.agreementCompanyInput.query()).toBeInTheDocument();
    expect(ui.agreement.agreementPostalCodeInput.query()).toBeInTheDocument();
    fireEvent.change(ui.agreement.agreementCompanyInput.get(), {
      target: { value: "carrefour" },
    });
    fireEvent.click(ui.agreement.agreementCompanySearchButton.get());
    await waitFor(() => {
      fireEvent.click(ui.agreement.searchItem.carrefour.get());
    });
    expect(
      ui.agreement.agreementCompanyInputConfirm.query()
    ).toBeInTheDocument();
    expect(ui.agreement.ccChoice.commerce.query()).toBeInTheDocument();
    expect(ui.agreement.ccChoice.bureau.query()).toBeInTheDocument();
    fireEvent.click(ui.agreement.ccChoice.commerce.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.previous.get());
    expect(
      ui.agreement.agreementCompanyInputConfirm.query()
    ).toBeInTheDocument();
    expect(ui.agreement.searchItem.carrefour.query()).toBeInTheDocument();
  });
  test("Vérifier la non sélection d'une cc", () => {
    fireEvent.click(ui.agreement.noAgreement.get());
    expect(ui.warning.query()).toBeInTheDocument();
  });
});
