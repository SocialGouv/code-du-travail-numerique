import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../index";

import { UserAction } from "../../../common";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { byText } from "testing-library-selector";

describe("Rupture conventionnelle - Etape ancienneté", () => {
  test("ne pas autoriser une date de début et de fin identique", () => {
    let userAction: UserAction;
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.agreement.noAgreement.get()).click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(byText(/La date de fin de contrat doit se situer après le/).query()).toBeInTheDocument();

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/08/2024")
      .click(ui.next.get());


    expect(ui.activeStep.query()).toHaveTextContent("Salaires");
  });
});
