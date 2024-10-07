import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635373",
  "id": "0573",
  "num": 573,
  "shortTitle": "Commerces de gros",
  "slug": "573-commerces-de-gros",
  "title": "Convention collective nationale de commerces de gros du 23 juin 1970. Etendue par arrêté du 15 juin 1972 JONC 29 août 1972. Mise à jour par accord du 27 septembre 1984 étendu par arrêté du 4 février 1985 JORF 16 février 1985."
}
`
);

describe("Indemnité licenciement - CC 573", () => {
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
    userAction
      .changeInputList(
        ui.information.agreement573.proCategory.get(),
        "Agents de maîtrise, techniciens et assimilés"
      )
      .click(ui.information.agreement573.eco.oui.get())
      .setInput(ui.information.agreement573.age.get(), "57")
      .click(ui.next.get())

      .setInput(ui.seniority.startDate.get(), "01/01/2010")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2700")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("10 350,00 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("9 000,00 €");
  });
});
