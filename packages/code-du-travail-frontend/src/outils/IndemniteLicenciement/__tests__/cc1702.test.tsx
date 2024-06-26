import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635467",
  "id": "KALICONT000005635467",
  "num": 1702,
  "shortTitle": "Travaux publics (Tome II : Ouvriers)",
  "slug": "1702-travaux-publics-tome-ii-ouvriers",
  "title": "Travaux publics (Tome II : Ouvriers)"
}
`
);

describe("Indemnité licenciement - CC 1702", () => {
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
  test(`Autre licenciement`, () => {
    userAction
      .setInput(ui.information.agreement1702.age.get(), "40")
      .click(ui.information.agreement1702.motif.non.get())
      .click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2018");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/01/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.non.get());
    expect(
      rendering.queryByText(
        "Indiquez le montant des salaires (en incluant l’indemnité de congés payés, les primes, dont la prime de vacances, et les avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)"
      )
    ).toBeInTheDocument();
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
    expect(ui.result.resultat.get()).toHaveTextContent("2 760,42 €");
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
    expect(
      rendering.queryByText(
        "Le montant de l’indemnité doit être calculé sur la base des salaires (reconstitués) que la salarié aurait dû percevoir au cours des 3 derniers mois précédant la rupture du contrat s’il n’avait pas été en arrêt de travail. Pour simplifier l'utilisation de ce simulateur, la calcul se base ici sur les salaires perçus avant l'arrêt travail et non sur les salaires reconstitués. Le montant de l'indemnité pourrait donc être plus important que celui donné par le simulateur."
      )
    ).not.toBeInTheDocument();
    expect(
      rendering.queryByText(
        /Ce résultat ne prend pas en compte le complément forfaitaire dont bénéficie le salarié en plus du montant de l'indemnité de licenciement/
      )
    ).not.toBeInTheDocument();
  });

  test(`Autre licenciement avec arret de travail`, () => {
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .click(ui.contract.arretTravail.oui.get());

    userAction.setInput(ui.contract.dateArretTravail.get(), "01/01/2022");
    userAction
      .click(ui.next.get())
      .click(ui.next.get())
      .setInput(ui.information.agreement1702.age.get(), "40")
      .click(ui.information.agreement1702.motif.non.get())
      .click(ui.next.get());

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
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("2 760,42 €");
  });

  test(`Licenciement économique`, () => {
    userAction
      .setInput(ui.information.agreement1702.age.get(), "40")
      .click(ui.information.agreement1702.motif.oui.get())
      .click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2018");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/01/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.non.get());
    expect(
      rendering.queryByText(
        "Indiquez le montant des salaires (en incluant l’indemnité de congés payés, les primes, dont la prime de vacances, et les avantages en nature) dans le premier champ et le montant des primes dans le second champ (uniquement pour les 3 derniers mois)"
      )
    ).toBeInTheDocument();
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
    expect(ui.result.resultat.get()).toHaveTextContent("2 760,42 €");
    expect(
      rendering.queryByText(
        /Ce résultat ne prend pas en compte le complément forfaitaire dont bénéficie le salarié en plus du montant de l'indemnité de licenciement/
      )
    ).toBeInTheDocument();
  });
});
