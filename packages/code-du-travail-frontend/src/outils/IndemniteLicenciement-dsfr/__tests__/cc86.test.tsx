import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 75306,
    "cdtnId": "27bbafda66",
    "num": 86,
    "shortTitle": "Entreprises de la publicité et assimilées",
    "id": "KALICONT000005635630",
    "title": "Entreprises de la publicité et assimilées",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635630",
    "slug": "86-entreprises-de-la-publicite-et-assimilees"
  }
`
);

describe("Indemnité licenciement - CC 86", () => {
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
  });

  test(`Vérification du fait que le salaire de reference est bien celui issu de la formule de calcul de l'indemnité`, () => {
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.non.get());
    userAction.setInput(ui.salary.salaries.getAll()[0], "2500");
    userAction.setInput(ui.salary.salaries.getAll()[0], "25000");
    userAction.click(ui.next.get());
    expect(ui.result.formula.get()).toHaveTextContent("Formule");
    expect(ui.result.formula.get()).toHaveTextContent(
      "Sref : Salaire de référence (25000 €)"
    );
  });
});
