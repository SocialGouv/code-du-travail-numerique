import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173",
  "id": "1486",
  "num": 1486,
  "shortTitle": "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
  "slug": "1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de",
  "title": "Convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils du 15 décembre 1987. "
}
`
);

describe("Indemnité licenciement - CC 1486", () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
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
    userAction
      .changeInputList(
        ui.information.agreement1486.proCategory.get(),
        "Chargés d'enquête intermittents"
      )
      .click(ui.information.agreement1486.refus.non.get())
      .click(ui.next.get())

      .setInput(ui.seniority.startDate.get(), "01/01/2004")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.oui.get())
      .changeInputList(
        ui.seniority.absences.motif(0).get(),
        "Absence pour maladie non professionnelle"
      )
      .setInput(ui.seniority.absences.duration(0).get(), "3")
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get());
    ui.salary.fillSalaries(userAction, [
      "3500",
      "3350",
      "3200",
      "3150",
      "3300",
      "3600",
      "3100",
      "3200",
      "3300",
      "3250",
      "3100",
      "3100",
    ]);
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("26100 €");
  });
});
