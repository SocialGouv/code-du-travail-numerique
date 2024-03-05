import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../..";
import { ui } from "./ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
  "id": "2120",
  "num": 2120,
  "shortTitle": "Banque",
  "slug": "2120-banque",
  "title": "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004."
}
`
);

describe("Indemnité licenciement - CC 2120", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(() => {
    rendering = render(
      <CalculateurIndemnite icon={""} title={""} displayTitle={""} />
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
        ui.information.agreement2120.proCategory.get(),
        "Non-cadres"
      )
      .click(ui.information.agreement2120.eco.oui.get())
      .click(ui.next.get())

      .setInput(ui.seniority.startDate.get(), "01/01/1999")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1991")
      .setInput(ui.salary.agreement2120.salariesVariablePart.get(), "2000")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("25540,67 €");
  });
});
