import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 113828,
    "cdtnId": "7d5c621b2c",
    "contributions": true,
    "num": 1518,
    "shortTitle": "Éducation, culture, loisirs et animation au service des territoires (ÉCLAT)",
    "id": "1518",
    "title": "Convention collective nationale des métiers de l'éducation, de la culture, des loisirs et de l'animation agissant pour l'utilité sociale et environnementale, au service des territoires (ÉCLAT) du 28 juin 1988. Étendue par arrêté du 10 janvier 1989 JORF 13 janvier 1989",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635177",
    "slug": "1518-education-culture-loisirs-et-animation-au-service-des-territoires-eclat"
  }
`
);

describe("Indemnité licenciement - CC 1518", () => {
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
    expect(ui.result.resultat.get()).toHaveTextContent("20 250,00 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent(
      "Non applicable dans votre situation"
    );
  });
});
