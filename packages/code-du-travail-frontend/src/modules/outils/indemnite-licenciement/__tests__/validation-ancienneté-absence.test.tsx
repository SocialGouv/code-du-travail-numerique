import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

describe("Page ancienneté: vérification validation lorsque absence > ancienneté", () => {
  test("should show 12 month", async () => {
    const { getByText } = render(
      <CalculateurIndemniteLicenciement title={""} />
    );
    const userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.oui.get());
    userAction.click(ui.next.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2024");
    userAction.setInput(ui.seniority.notificationDate.get(), "31/01/2025");
    userAction.setInput(ui.seniority.endDate.get(), "31/01/2025");
    userAction.click(ui.seniority.hasAbsence.oui.get());
    userAction.setInput(ui.seniority.absences.duration(0).get(), "13");
    userAction.click(ui.next.get());
    expect(
      getByText(
        "La durée totale des absences doit être inférieure ou égale à l'ancienneté",
        { selector: ".sr-only" }
      )
    ).toBeInTheDocument();
  });
});
