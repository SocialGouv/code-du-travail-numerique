import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635557",
  "id": "KALICONT000005635557",
  "num": 2148,
  "shortTitle": "Télécommunications",
  "slug": "2148-telecommunications",
  "title": "Télécommunications"
}
`
);

describe("Indemnité licenciement - CC 2148", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(() => {
    rendering = render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userAction = new UserAction();

    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get());
  });
  test(`Cas nominal`, () => {
    userAction.setInput(ui.information.agreement2148.age.get(), "42");
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2018");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/01/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "2500");

    expect(
      rendering.queryByText(
        "Connaissez-vous le montant du salaire perçu pendant le préavis ?"
      )
    ).not.toBeInTheDocument();
    userAction.click(ui.previous.get());
    userAction.setInput(ui.seniority.endDate.get(), "01/06/2022");
    userAction.click(ui.next.get());
    expect(
      rendering.queryByText(
        "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
      )
    ).toBeInTheDocument();
    userAction.click(
      ui.salary.agreementWithNoticeSalary.knowingLastSalary.oui.get()
    );
    expect(
      rendering.queryByText("Salaires perçus pendant le préavis")
    ).toBeInTheDocument();
    userAction.setInput(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[0],
      "3000"
    );

    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("3900 €");
    expect(ui.result.resultTableRows.getAll().length).toBe(5);
    expect(ui.result.resultTableRows.getAll()[0]).toHaveTextContent(
      "mai 20223000 €"
    );
    userAction.click(ui.previous.get());
    expect(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[0]
    ).toHaveValue(3000);
    userAction
      .click(ui.salary.agreementWithNoticeSalary.knowingLastSalary.non.get())
      .click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("3600 €");
    expect(ui.result.resultTableRows.queryAll().length).toBe(0);
  });
  test(`Cas avec arrêt de travail`, () => {
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .click(ui.contract.arretTravail.oui.get());

    userAction.setInput(ui.contract.dateArretTravail.get(), "01/01/2022");
    userAction.click(ui.next.get()).click(ui.next.get());

    userAction.setInput(ui.information.agreement2148.age.get(), "42");
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2018");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/06/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "2500");
    expect(
      rendering.queryByText(
        "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
      )
    ).not.toBeInTheDocument();
  });
});
