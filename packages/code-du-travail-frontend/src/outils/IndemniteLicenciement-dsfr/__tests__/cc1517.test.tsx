import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url":"https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635870",
    "id":"KALICONT000005635870",
    "num":1517,
    "shortTitle":"Commerces de détail non alimentaires : antiquités, brocante, galeries d'art (œuvres d'art), arts de la table, coutellerie, droguerie, équipement du foyer, bazars, commerces ménagers, modélisme, jeux, jouets, puérinatalité, maroquinerie, presse et jeux de hasard ou pronostics, produits de la vape",
    "slug":"1517-commerces-de-detail-non-alimentaires-antiquites-brocante-galeries-dart",
    "title":"Commerces de détail non alimentaires : antiquités, brocante, galeries d'art (œuvres d'art), arts de la table, coutellerie, droguerie, équipement du foyer, bazars, commerces ménagers, modélisme, jeux, jouets, puérinatalité, maroquinerie, presse et jeux de hasard ou pronostics, produits de la vape"
  }
`
);

describe("Indemnité licenciement - CC 1517", () => {
  let userAction: UserAction;
  beforeEach(async () => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );

    userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
  });
  test("vérifier l'eligibilite pour ancienneté (entree -> sortie) supérieur à 8 mois", async () => {
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.notificationDate.get(), "15/08/2022");
    userAction.setInput(ui.seniority.endDate.get(), "15/12/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());
    expect(ui.result.formula.get()).toHaveTextContent("Formule");
  });
});
