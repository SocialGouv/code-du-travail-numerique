import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

describe("Rupture co avec un arrêt de travail", () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <IndemniteRuptureCoSimulator
        breadcrumbTitle="Simulateur d'indemnité de rupture conventionnelle"
        description="Estimez le montant de l'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Simulateur d'indemnité de rupture conventionnelle"
      />
    );
    userAction = new UserAction();
  });

  test(`Rupture conventionnelle avec un arrêt de travail`, () => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.arretTravail.oui.get())
      .setInput(ui.contract.dateArretTravail.get(), "01/10/2024")
      .click(ui.next.get())
      .click(ui.agreement.noAgreement.get())
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/03/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2025")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get());

    expect(ui.salary.salaries.queryAll()).toHaveLength(7);

    userAction
      .setInput(ui.salary.salaries.getAll()[0], "3000")
      .setInput(ui.salary.salaries.getAll()[1], "3000")
      .setInput(ui.salary.salaries.getAll()[2], "3000")
      .setInput(ui.salary.salaries.getAll()[3], "3000")
      .setInput(ui.salary.salaries.getAll()[4], "3000")
      .setInput(ui.salary.salaries.getAll()[5], "3000")
      .setInput(ui.salary.salaries.getAll()[6], "3000")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("625,00 €");
  });

  test(`Rupture conventionnelle sans arrêt de travail`, () => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.agreement.noAgreement.get())
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/03/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2025")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get());

    userAction.click(ui.salary.hasSameSalary.non.get());
    expect(ui.salary.salaries.queryAll()).toHaveLength(10);

    userAction
      .setInput(ui.salary.salaries.getAll()[0], "3000")
      .setInput(ui.salary.salaries.getAll()[1], "3000")
      .setInput(ui.salary.salaries.getAll()[2], "3000")
      .setInput(ui.salary.salaries.getAll()[3], "3000")
      .setInput(ui.salary.salaries.getAll()[4], "3000")
      .setInput(ui.salary.salaries.getAll()[5], "3000")
      .setInput(ui.salary.salaries.getAll()[6], "3000")
      .setInput(ui.salary.salaries.getAll()[7], "3000")
      .setInput(ui.salary.salaries.getAll()[8], "3000")
      .setInput(ui.salary.salaries.getAll()[9], "3000")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("625,00 €");
  });
});
