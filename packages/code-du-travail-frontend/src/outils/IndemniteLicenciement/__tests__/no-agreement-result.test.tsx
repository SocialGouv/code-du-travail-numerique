import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173",
  "id": "1486",
  "num": 1486,
  "shortTitle": "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
  "slug": "1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de",
  "title": "Convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils du 15 décembre 1987. "
}
`
);
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Indemnité licenciement", () => {
  let userAction: UserAction;
  describe("parcours avec la convention collective 2596 pour tester le cas où il n'y a pas d'indemnité conventionnel", () => {
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
      userAction
        .changeInputList(
          ui.information.agreement1486.proCategory.get(),
          "Chargés d'enquête intermittents"
        )
        .click(ui.information.agreement1486.refus.non.get())
        .click(ui.next.get())

        .setInput(ui.seniority.startDate.get(), "01/10/2023")
        .setInput(ui.seniority.notificationDate.get(), "01/06/2024")
        .setInput(ui.seniority.endDate.get(), "01/06/2024")
        .click(ui.seniority.hasAbsence.oui.get())
        .changeInputList(
          ui.seniority.absences.motif(0).get(),
          "Absence pour maladie non professionnelle"
        )
        .setInput(ui.seniority.absences.duration(0).get(), "3")
        .click(ui.next.get())
        .click(ui.salary.hasPartialTime.non.get())
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
  test(`Le résultat doit être légal si la convention collective a été retirée de la sélection`, async () => {
    render(
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
      .click(ui.agreement.unknownAgreement.get())
      .setInput(ui.agreement.agreementCompanyInput.get(), "bricoman")
      .click(ui.agreement.agreementCompanySearchButton.get())
      .click(ui.agreement.agreementCompanySearchButton.get());
    await waitFor(() => {
      userAction.click(ui.agreement.searchItem.bricomanie.get());
    });
    userAction
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/2018")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2500")
      .click(ui.next.get());
    expect(ui.result.resultatLegal.get()).toHaveTextContent("3 750,00");
  });
});
