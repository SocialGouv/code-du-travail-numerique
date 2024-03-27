import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url":"https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635234",
  "id":"0029",
  "num":29,
  "shortTitle":"Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
  "slug":"29-hospitalisation-privee-etablissements-prives-dhospitalisation-de-soins-d",
  "title":"Convention collective nationale des etablissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif du 31 octobre 1951.",
  "contributions":true
}
`
);

describe("Indemnité licenciement - CC 29", () => {
  test("cas spécifique", () => {
    let userAction: UserAction;
    render(<CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />);
    userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get())
      .changeInputList(
        ui.information.agreement29.proCategory.get(),
        "Assistants familiaux des services de placements familiaux spécialisés"
      )
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/2014")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get())
      .setInput(ui.salary.salaries.getAll()[0], "2392")
      .setInput(ui.salary.salaries.getAll()[1], "2145")
      .setInput(ui.salary.salaries.getAll()[2], "2465")
      .setInput(ui.salary.salaries.getAll()[3], "2189")
      .setInput(ui.salary.salaries.getAll()[4], "2247")
      .setInput(ui.salary.salaries.getAll()[5], "2154")
      .setInput(ui.salary.salaries.getAll()[6], "2406")
      .setInput(ui.salary.salaries.getAll()[7], "2305")
      .setInput(ui.salary.salaries.getAll()[8], "2175")
      .setInput(ui.salary.salaries.getAll()[9], "2129")
      .setInput(ui.salary.salaries.getAll()[10], "2305")
      .setInput(ui.salary.salaries.getAll()[11], "2101")
      .click(ui.salary.agreement29.hasSiwMonthBestSalary.non.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("5835");
    expect(ui.result.resultat.get()).toHaveTextContent("5835");
  });
});
