import { render } from "@testing-library/react";
import React from "react";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { UserAction } from "../../common/utils/UserAction";

describe("Vérification de l'affichage du résultat lorsqu'une date d'arrêt est sélectionnée", () => {
  test("should show result", async () => {
    render(
      <IndemniteRuptureCoSimulator
        displayTitle="Simulateur d'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Simulateur d'indemnité de rupture conventionnelle"
      />
    );
    const userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.arretTravail.oui.get());
    userAction.setInput(ui.contract.dateArretTravail.get(), "03/02/2024");
    userAction.click(ui.next.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "03/02/2024");
    userAction.setInput(ui.seniority.endDate.get(), "31/08/2025");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("1 125,00 €");
  });
});
