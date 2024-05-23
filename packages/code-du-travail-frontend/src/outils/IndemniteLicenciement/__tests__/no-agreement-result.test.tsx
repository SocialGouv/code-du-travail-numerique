import { render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 413,
  "shortTitle": "Hôpital",
  "id": "XXXX",
  "title": "Hôpital",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=XXXX",
  "slug": "413-hopital"
}
`
);

describe("Indemnité licenciement", () => {
  let userAction: UserAction;
  describe("parcours avec la convention collective 413 pour tester le cas où il n'y a pas d'indemnité conventionnel", () => {
    beforeEach(() => {
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
      userAction.changeInputList(
        ui.information.agreement413.proCategory.get(),
        "Non-cadres"
      );
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2021");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/03/2022");
      userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.oui.get());
      userAction.setInput(ui.salary.sameSalaryValue.get(), "2000");
      userAction.click(ui.next.get());
      // Validation que l'on est bien sur l'étape Indemnité
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });

    test(`
     - vérification que le montant affiché pour la convention collective est "la convention collective ne prévoit pas d'indemnité dans ce cas"
     - vérification que le montant pour la convention collective est bien affiché quand il y en a un
    `, () => {
      // vérification que le montant affiché pour la convention collective est "la convention collective ne prévoit pas d'indemnité dans ce cas"
      expect(
        screen.queryByText(
          "La convention collective ne prévoit pas d'indemnité dans ce cas"
        )
      ).toBeInTheDocument();

      // vérification que le montant pour la convention collective est bien affiché quand il y en a un
      userAction.click(ui.previous.get());
      userAction.click(ui.previous.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2020");
      userAction.click(ui.next.get());
      userAction.click(ui.next.get());

      expect(
        screen.queryByText(
          "La convention collective ne prévoit pas d'indemnité dans ce cas"
        )
      ).not.toBeInTheDocument();
    });
  });
});
