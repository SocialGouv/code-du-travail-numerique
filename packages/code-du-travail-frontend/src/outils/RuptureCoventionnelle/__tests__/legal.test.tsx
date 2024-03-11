import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../index";

import { UserAction } from "../../../common";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { byText } from "testing-library-selector";

describe("Rupture conventionnelle - légale", () => {
  test("parcours classique", () => {
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
      .click(ui.contract.type.cdi.get());

    expect(ui.contract.fauteGrave.question.query()).not.toBeInTheDocument();

    userAction
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Convention collective");

    userAction.click(ui.agreement.noAgreement.get()).click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(ui.seniority.notificationDate.query()).not.toBeInTheDocument();

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/05/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Salaire");

    userAction
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1000")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

    expect(ui.result.resultat.get()).toHaveTextContent("83,33 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("83.33");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent(
      "Convention collective non renseignée"
    );
    expect(ui.result.data.get()).not.toHaveTextContent(
      "Licenciement dû à une faute grave"
    );
    expect(byText(/Type de contrat/).query()).toBeInTheDocument();
    expect(
      byText(/Date de notification du licenciement/).query()
    ).not.toBeInTheDocument();
  });
});
