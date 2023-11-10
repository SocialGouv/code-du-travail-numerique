import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import { CalculateurIndemnite } from "../../../../src/outils";
import { ui } from "./ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "id": "KALICONT000046993250",
  "num": 3248,
  "shortTitle": "Convention collective nationale de la métallurgie",
  "title": "Convention collective nationale de la métallurgie du 7 février 2022",
  "url": "https://www.legifrance.gouv.fr/conv_coll/id/KALICONT000046993250",
  "slug": "3248-metallurgie"
}
`
);

describe("Indemnité licenciement - CC 3248", () => {
  describe("parcours avec la convention collective pour valider ses spécificités", () => {
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

    test(`valider les questions`, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un cadre
      userAction
        .changeInputList(
          ui.information.agreement3248.proCategory.get(),
          "'ABCDE'"
        )
        .click(ui.information.agreement3248.dayContract.oui.get())
        .click(ui.information.agreement3248.alwaysDayContract.non.get())
        .setInput(
          ui.information.agreement3248.dateDayContract.get(),
          "01/01/2010"
        )
        .click(ui.information.agreement3248.hasBeenCadre.oui.get())
        .setInput(ui.information.agreement3248.age.get(), "61")
        .click(ui.information.agreement3248.retirementRight.oui.get())
        .click(ui.next.get())
        .setInput(ui.seniority.startDate.get(), "01/01/2000")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2023")
        .setInput(ui.seniority.endDate.get(), "01/06/2023")
        .click(ui.seniority.hasAbsence.non.get())
        .click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });
  });
});
