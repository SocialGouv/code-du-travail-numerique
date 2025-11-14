import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

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
    rendering = render(<CalculateurIndemniteLicenciement title={""} />);
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
  test(`Cadres`, async () => {
    await userAction.changeInputList(
      ui.information.agreement2596.proCategory.get(),
      "Cadres"
    );
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
    userAction.setInput(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[1],
      "3000"
    );
    userAction.setInput(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[2],
      "3000"
    );
    userAction.setInput(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[3],
      "3000"
    );
    userAction.setInput(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[4],
      "3000"
    );

    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("2 990,45 €");
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
  test(`Cadres moins de 8 mois d'ancienneté`, async () => {
    await userAction.changeInputList(
      ui.information.agreement2596.proCategory.get(),
      "Cadres"
    );
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/03/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "2500");

    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("104,17 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("0 €");
  });
  test(`Cadres avec arret de travail`, async () => {
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .click(ui.contract.arretTravail.oui.get());

    userAction.setInput(ui.contract.dateArretTravail.get(), "01/01/2022");
    userAction.click(ui.next.get()).click(ui.next.get());
    await userAction.changeInputList(
      ui.information.agreement2596.proCategory.get(),
      "Cadres"
    );
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
  test(`Non-cadres`, async () => {
    await userAction.changeInputList(
      ui.information.agreement2596.proCategory.get(),
      "Emplois techniques et de coiffeurs"
    );
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
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
    expect(
      rendering.queryByText("Salaires perçus pendant le préavis")
    ).not.toBeInTheDocument();

    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("16 388,89 €");
  });

  test(`Emplois de l'esthétique-cosmétique avec moins de 8 moins d'ancienneté`, async () => {
    await userAction.changeInputList(
      ui.information.agreement2596.proCategory.get(),
      "Emplois de l'esthétique-cosmétique"
    );
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2020");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/03/2024");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
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
    expect(
      rendering.queryByText("Salaires perçus pendant le préavis")
    ).not.toBeInTheDocument();

    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("2 604,17 €");
  });

  test(`Emplois de l'esthétique-cosmétique`, async () => {
    await userAction.changeInputList(
      ui.information.agreement2596.proCategory.get(),
      "Emplois de l'esthétique-cosmétique"
    );
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/09/2023");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/03/2024");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.legalError.title.query()).toBeInTheDocument();
    expect(ui.result.legalError.seniorityToLow.query()).toBeInTheDocument();
  });
});
