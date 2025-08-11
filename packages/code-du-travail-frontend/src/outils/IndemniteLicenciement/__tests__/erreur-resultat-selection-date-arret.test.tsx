import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Page salaire: vérification l'affichage du résultat lorsqu'une date d'arrêt est sélectionnée", () => {
  test("should show result", async () => {
    const { getByText } = render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    const userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.oui.get());
    userAction.setInput(ui.contract.dateArretTravail.get(), "03/12/1992");
    userAction.click(ui.next.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/12/1992");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/08/2025");
    userAction.setInput(ui.seniority.endDate.get(), "01/09/2025");

    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.legalError.title.get()).toBeDefined();
  });
});
