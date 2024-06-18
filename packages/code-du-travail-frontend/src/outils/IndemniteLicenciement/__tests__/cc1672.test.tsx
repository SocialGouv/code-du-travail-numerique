import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635918",
  "id": "KALICONT000005635918",
  "num": 1672,
  "shortTitle": "Sociétés d'assurances",
  "slug": "1672-societes-dassurances",
  "title": "Sociétés d'assurances"
}
`
);

describe("Indemnité licenciement - CC 1672", () => {
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
    userAction.changeInputList(
      ui.information.agreement1672.proCategory.get(),
      "Non-cadres (Classes 1 à 4)"
    );
    userAction.setInput(ui.information.agreement1672.age.get(), "42");
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
    expect(ui.result.resultat.get()).toHaveTextContent("3 588,54 €");
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
    expect(ui.result.resultat.get()).toHaveTextContent("2 760,42 €");
    expect(ui.result.resultTableRows.queryAll().length).toBe(0);
  });
  test(`Cas avec arrêt de travail`, () => {
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .click(ui.contract.arretTravail.oui.get());

    userAction.setInput(ui.contract.dateArretTravail.get(), "01/01/2022");
    userAction.click(ui.next.get()).click(ui.next.get());

    userAction.changeInputList(
      ui.information.agreement1672.proCategory.get(),
      "Non-cadres (Classes 1 à 4)"
    );
    userAction.setInput(ui.information.agreement1672.age.get(), "42");
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

  test(`Cas spécifique`, () => {
    userAction
      .changeInputList(
        ui.information.agreement1672.proCategory.get(),
        "Cadres (Classes 5 à 7)"
      )
      .click(ui.information.agreement1672.nonCadreAvant.oui.get())
      .setInput(ui.information.agreement1672.dateDebutCadre.get(), "01/01/1999")
      .setInput(ui.information.agreement1672.age.get(), "52")
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/1994")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get());
    expect(ui.salary.salaries.queryAll()).toHaveLength(12);

    userAction.setInput(ui.salary.salaries.getAll()[0], "2471");
    userAction.setInput(ui.salary.salaries.getAll()[1], "2794");
    userAction.setInput(ui.salary.salaries.getAll()[2], "2859");
    userAction.setInput(ui.salary.salaries.getAll()[3], "2566");
    userAction.setInput(ui.salary.salaries.getAll()[4], "2650");
    userAction.setInput(ui.salary.salaries.getAll()[5], "2842");
    userAction.setInput(ui.salary.salaries.getAll()[6], "2564");
    userAction.setInput(ui.salary.salaries.getAll()[7], "2882");
    userAction.setInput(ui.salary.salaries.getAll()[8], "2718");
    userAction.setInput(ui.salary.salaries.getAll()[9], "2756");
    userAction.setInput(ui.salary.salaries.getAll()[10], "2752");
    userAction.setInput(ui.salary.salaries.getAll()[11], "2512");

    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("51 381,03 €");
    expect(ui.result.resultat.get()).toHaveTextContent("51 381,03 €");
  });
});
