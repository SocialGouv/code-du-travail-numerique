import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../..";
import { ui } from "./ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635413",
  "id": "1527",
  "num": 1527,
  "shortTitle": "Immobilier : administrateurs de biens, sociétés immobilières, agents immobiliers",
  "slug": "1527-immobilier-administrateurs-de-biens-societes-immobilieres-agents-immobi",
  "title": "Convention collective nationale de l'immobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc. (anciennement cabinets d'administrateurs de biens et des sociétés immobilières), du 9 septembre 1988. Etendue par arrêté du 24 février 1989 JORF 3 mars 1989. Mise à jour par avenant  n° 47 du 23 novembre 2010, JORF 18 juillet 2012 "
}
`
);

describe("Indemnité licenciement - CC 1527", () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(<CalculateurIndemnite icon={""} title={""} displayTitle={""} />);
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
  test("cas avec versement de comission", () => {
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2014")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get())
      .setInput(ui.salary.salaries.getAll()[0], "2100")
      .setInput(ui.salary.salaries.getAll()[1], "2100")
      .setInput(ui.salary.salaries.getAll()[2], "2100")
      .setInput(ui.salary.salaries.getAll()[3], "1900")
      .setInput(ui.salary.salaries.getAll()[4], "2090")
      .setInput(ui.salary.salaries.getAll()[5], "2500")
      .setInput(ui.salary.salaries.getAll()[6], "2080")
      .setInput(ui.salary.salaries.getAll()[7], "2000")
      .setInput(ui.salary.salaries.getAll()[8], "1999")
      .setInput(ui.salary.salaries.getAll()[9], "1995")
      .setInput(ui.salary.salaries.getAll()[10], "1990")
      .setInput(ui.salary.salaries.getAll()[11], "1990")
      .click(ui.salary.agreement1517.hasContractSalary.oui.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("5250 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("4777.69 €");
  });

  test("cas sans versement de comission", () => {
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2014")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get())
      .setInput(ui.salary.salaries.getAll()[0], "2100")
      .setInput(ui.salary.salaries.getAll()[1], "2100")
      .setInput(ui.salary.salaries.getAll()[2], "2100")
      .setInput(ui.salary.salaries.getAll()[3], "1900")
      .setInput(ui.salary.salaries.getAll()[4], "2090")
      .setInput(ui.salary.salaries.getAll()[5], "2500")
      .setInput(ui.salary.salaries.getAll()[6], "2080")
      .setInput(ui.salary.salaries.getAll()[7], "2000")
      .setInput(ui.salary.salaries.getAll()[8], "1999")
      .setInput(ui.salary.salaries.getAll()[9], "1995")
      .setInput(ui.salary.salaries.getAll()[10], "1990")
      .setInput(ui.salary.salaries.getAll()[11], "1990")
      .click(ui.salary.agreement1517.hasContractSalary.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("5250 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("5250 €");
  });
});
