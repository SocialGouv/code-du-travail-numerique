import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../../../../src/outils";
import { ui } from "./ui";

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
  beforeEach(async () => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        slug={"indemnite-licenciement"}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.next.get());
  });
  test("vérifier l'eligibilite pour ancienneté (entree -> sortie) supérieur à 8 mois", async () => {
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/08/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/12/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.result.formula.get()).toHaveTextContent("Formule");
  });
});
