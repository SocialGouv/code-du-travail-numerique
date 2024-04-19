import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 430195,
    "cdtnId": "b0b893fc83",
    "contributions": true,
    "num": 413,
    "shortTitle": "Handicapés : établissements et services pour les personnes inadaptées et handicapées",
    "id": "0413",
    "title": "Convention collective nationale de travail des etablissements et services pour personnes inadaptées et handicapées du 15 mars 1966. Mise à jour au 15 septembre 1976.",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635407",
    "slug": "413-handicapes-etablissements-et-services-pour-les-personnes-inadaptees-et-han"
  }
`
);

describe("Indemnité licenciement - CC 413", () => {
  let userAction: UserAction;
  beforeEach(() => {
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
      .click(ui.next.get());
  });

  test(`Rupture conventionnelle Hors ANI`, () => {
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2000")
      .setInput(ui.seniority.endDate.get(), "01/01/2025")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2700")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("20250 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent(
      "Non applicable dans votre situation"
    );
  });
});
