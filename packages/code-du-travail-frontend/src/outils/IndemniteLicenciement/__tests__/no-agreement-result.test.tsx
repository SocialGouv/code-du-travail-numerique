import {
  RenderResult,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";
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
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Indemnité licenciement", () => {
  let rendering: RenderResult;
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
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.non.get());
      userEvent.click(ui.contract.arretTravail.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.selectOptions(
        ui.information.agreement413.proCategory.get(),
        "Non-cadres"
      );
      userEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2021" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/03/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/03/2022" },
      });
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());
      fireEvent.change(ui.salary.sameSalaryValue.get(), {
        target: { value: "2000" },
      });
      userEvent.click(ui.next.get());
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
      userEvent.click(ui.previous.get());
      userEvent.click(ui.previous.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2020" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());

      expect(
        screen.queryByText(
          "La convention collective ne prévoit pas d'indemnité dans ce cas"
        )
      ).not.toBeInTheDocument();
    });
  });
  test(`Le résultat doit être légal si la convention collective a été retirée de la sélection`, async () => {
    rendering = render(
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
