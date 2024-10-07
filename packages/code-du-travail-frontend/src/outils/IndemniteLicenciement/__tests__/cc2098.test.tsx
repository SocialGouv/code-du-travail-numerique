import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
  "id": "2098",
  "num": 2098,
  "shortTitle": "personnel presta service tertiaire",
  "slug": "2098-personnel presta service tertiaire",
  "title": "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004."
}
`
);

describe("Indemnité licenciement- CC 2098", () => {
  let userAction: UserAction;
  test("Inaptitude non pro", () => {
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
      .click(ui.contract.inaptitude.oui.get())
      .click(ui.next.get())
      .click(ui.next.get())

      .click(ui.information.agreement2098.inaptitudeNonPro.get())
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/2009")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.oui.get())
      .setInput(ui.seniority.absences.duration(0).get(), "8")
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get())
      .setInputs(ui.salary.salaries.getAll(), [
        "2266",
        "2250",
        "2203",
        "2199",
        "2100",
        "2020",
        "2010",
        "2010",
        "1930",
        "1890",
        "1900",
        "1800",
      ])
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("17 668,48 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("9 331,94 €");
  });
});
