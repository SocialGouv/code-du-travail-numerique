import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "effectif": 1,
  "cdtnId": "394e29a64d",
  "contributions": true,
  "num": 29,
  "shortTitle": "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
  "id": "0029",
  "title": "Convention collective nationale des etablissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif du 31 octobre 1951.",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635234",
  "slug": "29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d"
  }
`
);

describe("Indemnité licenciement - CC 29", () => {
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
