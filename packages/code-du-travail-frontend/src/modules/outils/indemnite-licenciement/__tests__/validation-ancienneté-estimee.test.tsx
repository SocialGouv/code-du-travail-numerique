import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";

describe("Vérification de l'affichage de l'ancienneté estimée", () => {
  test("doit afficher l'ancienneté estimée à l'utilisateur en temps réél", async () => {
    render(<CalculateurIndemniteLicenciement title={""} />);
    const userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.agreement.noAgreement.get())
      .click(ui.next.get())
      .click(ui.information.inaptitude.non.get())
      .click(ui.next.get());
    expect(ui.seniority.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 0 mois"
    );

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2024");
    expect(ui.seniority.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 0 mois"
    );

    userAction.setInput(ui.seniority.notificationDate.get(), "31/01/2025");
    expect(ui.seniority.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 0 mois"
    );

    userAction.setInput(ui.seniority.endDate.get(), "31/01/2025");
    expect(ui.seniority.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 1 an et 1 mois"
    );

    userAction.click(ui.next.get());
    expect(ui.absences.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 1 an et 1 mois"
    );

    userAction
      .click(ui.absences.arretTravail.non.get())
      .click(ui.absences.hasAbsence.oui.get())
      .setInput(ui.absences.absences.duration(0).get(), "2")
      .changeInputList(
        ui.absences.absences.motif(0).get(),
        "Congés sans solde"
      );
    expect(ui.absences.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 11 mois"
    );

    userAction.click(ui.previous.get());
    expect(ui.seniority.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 11 mois"
    );

    userAction.setInput(ui.seniority.endDate.get(), "01/06/2025");
    expect(ui.seniority.ancienneteEstimee.get()).toHaveTextContent(
      "Ancienneté estimée : 1 an et 3 mois"
    );
  });
});
