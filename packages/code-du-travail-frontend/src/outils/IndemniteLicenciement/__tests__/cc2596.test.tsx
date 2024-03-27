import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018773893",
  "id": "KALICONT000018773893",
  "num": 2596,
  "shortTitle": "Coiffure",
  "slug": "2596-coiffure",
  "title": "Coiffure"
}
`
);

describe("Indemnité licenciement - CC 2596", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(() => {
    rendering = render(
      <CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />
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
  test(`Cadres`, () => {
    userAction
      .changeInputList(ui.information.agreement2596.proCategory.get(), "Cadres")
      .click(ui.next.get());

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
    expect(ui.result.resultat.get()).toHaveTextContent("2990,45 €");
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
    expect(ui.result.resultat.get()).toHaveTextContent("2760,42 €");
    expect(ui.result.resultTableRows.queryAll().length).toBe(0);
  });
  test(`Cadres moins de 8 mois d'ancienneté`, () => {
    userAction
      .changeInputList(ui.information.agreement2596.proCategory.get(), "Cadres")
      .click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/03/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/03/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "2500" },
    });

    fireEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("104,17 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("0 €");
  });
  test(`Cadres avec arret de travail`, () => {
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .click(ui.contract.arretTravail.oui.get());

    fireEvent.change(ui.contract.dateArretTravail.get(), {
      target: { value: "01/01/2022" },
    });
    userAction
      .click(ui.next.get())
      .click(ui.next.get())
      .changeInputList(ui.information.agreement2596.proCategory.get(), "Cadres")
      .click(ui.next.get());

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
  test(`Non-cadres`, () => {
    userAction
      .changeInputList(
        ui.information.agreement2596.proCategory.get(),
        "Emplois techniques et de coiffeurs"
      )
      .click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2000" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/03/2022" },
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
    expect(
      rendering.queryByText("Salaires perçus pendant le préavis")
    ).not.toBeInTheDocument();

    fireEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("16388,89 €");
  });
});
