import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

describe("Page salaire: vérification l'affichage des salaires mensuels", () => {
  test("should show 12 month", async () => {
    const { getByText } = render(
      <CalculateurIndemniteLicenciement title={""} />
    );
    const userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.notificationDate.get(), "31/12/2022");
    userAction.setInput(ui.seniority.endDate.get(), "31/12/2022");

    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.non.get());
    expect(
      getByText(/Salaires mensuels bruts des 12 derniers mois/)
    ).toBeInTheDocument();
    expect(getByText(/décembre 2022/)).toBeInTheDocument();
  });
});
