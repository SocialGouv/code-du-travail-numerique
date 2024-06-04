import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";
import userEvent from "@testing-library/user-event";

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
    userEvent.selectOptions(
      ui.information.agreement1672.proCategory.get(),
      "Non-cadres (Classes 1 à 4)"
    );
    fireEvent.change(ui.information.agreement1672.age.get(), {
      target: { value: "42" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2018" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "2500" },
    });

    expect(
      rendering.queryByText(
        "Connaissez-vous le montant du salaire perçu pendant le préavis ?"
      )
    ).not.toBeInTheDocument();
    userAction.click(ui.previous.get());
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/06/2022" },
    });
    fireEvent.click(ui.next.get());
    expect(
      rendering.queryByText(
        "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
      )
    ).toBeInTheDocument();
    fireEvent.click(
      ui.salary.agreementWithNoticeSalary.knowingLastSalary.oui.get()
    );
    expect(
      rendering.queryByText("Salaires perçus pendant le préavis")
    ).toBeInTheDocument();
    fireEvent.change(ui.salary.agreementWithNoticeSalary.salaries.getAll()[0], {
      target: { value: "3000" },
    });

    fireEvent.click(ui.next.get());

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

    fireEvent.change(ui.contract.dateArretTravail.get(), {
      target: { value: "01/01/2022" },
    });
    userAction.click(ui.next.get()).click(ui.next.get());

    userEvent.selectOptions(
      ui.information.agreement1672.proCategory.get(),
      "Non-cadres (Classes 1 à 4)"
    );
    fireEvent.change(ui.information.agreement1672.age.get(), {
      target: { value: "42" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2018" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/06/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "2500" },
    });
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

    fireEvent.change(ui.salary.salaries.getAll()[0], {
      target: { value: "2471" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[1], {
      target: { value: "2794" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[2], {
      target: { value: "2859" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[3], {
      target: { value: "2566" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[4], {
      target: { value: "2650" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[5], {
      target: { value: "2842" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[6], {
      target: { value: "2564" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[7], {
      target: { value: "2882" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[8], {
      target: { value: "2718" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[9], {
      target: { value: "2756" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[10], {
      target: { value: "2752" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[11], {
      target: { value: "2512" },
    });

    fireEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("51 381,03 €");
    expect(ui.result.resultat.get()).toHaveTextContent("51 381,03 €");
  });
});
