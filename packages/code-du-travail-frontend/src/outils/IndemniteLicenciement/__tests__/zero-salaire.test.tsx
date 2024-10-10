import { render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

describe("Indemnité licenciement - Zero salaire complété", () => {
  let userAction: UserAction;
  describe("validation de la step salaire", () => {
    beforeEach(() => {
      render(
        <CalculateurIndemniteLicenciement
          icon={""}
          title={""}
          displayTitle={""}
        />
      );
    });

    test(`Empêcher l'utilisateur d'accéder à la page résultat si aucun salaire n'est demandé à l'étape salaire`, () => {
      userAction = new UserAction();
      userAction.click(ui.introduction.startButton.get());
      userAction.click(ui.contract.type.cdi.get());
      userAction.click(ui.contract.fauteGrave.non.get());
      userAction.click(ui.contract.inaptitude.non.get());
      userAction.click(ui.contract.arretTravail.oui.get());
      userAction.setInput(ui.contract.dateArretTravail.get(), "01/02/2020");
      userAction.click(ui.next.get());
      userAction.click(ui.agreement.noAgreement.get());
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "31/01/2020");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2024");
      userAction.setInput(ui.seniority.endDate.get(), "01/01/2024");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.oui.get());
      userAction.setInput(ui.salary.sameSalaryValue.get(), "2000");
      userAction.click(ui.next.get());
      expect(
        screen.queryByText(
          "Aucun mois complet n'a été réalisé, veuillez vérifier les dates que vous avez saisies aux étapes précédentes."
        )
      ).toBeInTheDocument();
    });
  });
});
