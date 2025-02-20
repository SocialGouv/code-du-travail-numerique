import { render } from "@testing-library/react";
import React from "react";

import { byText } from "testing-library-selector";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";

describe("Rupture conventionnelle - Etape ancienneté", () => {
  test("ne pas autoriser une date de début et de fin identique", () => {
    let userAction: UserAction;
    render(
      <IndemniteRuptureCoSimulator
        breadcrumbTitle="Simulateur d'indemnité de rupture conventionnelle"
        description="Estimez le montant de l'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Simulateur d'indemnité de rupture conventionnelle"
      />
    );
    userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Convention collective");

    userAction.click(ui.agreement.noAgreement.get()).click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(
      byText(/La date de fin de contrat doit se situer après le/).query()
    ).toBeInTheDocument();

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/08/2024")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Salaires");
  });
});
