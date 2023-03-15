import { render, fireEvent, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../..";
import { ui } from "./ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018773893",
  "id": "KALICONT000018773893",
  "num": 2596,
  "shortTitle": "Coiffure",
  "slug": "2596-coiffure",
  "title": "Coiffure"
}
`
);

describe("Indemnité licenciement - CC 2596", () => {
  describe("parcours avec la convention collective pour valider ses spécificités", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      rendering = render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          slug={"indemnite-licenciement"}
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
        .click(ui.next.get());
    });
    test(`Cadres`, () => {
      userAction
        .changeInputList(
          ui.information.agreement2596.proCategory.get(),
          "Cadres et agents de maitrise"
        )
        .click(ui.next.get());

      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2000" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/01/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/03/2022" },
      });
      fireEvent.click(ui.seniority.hasAbsence.non.get());
      fireEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");

      fireEvent.click(ui.salary.hasPartialTime.non.get());
      fireEvent.click(ui.salary.hasSameSalary.oui.get());
      fireEvent.change(ui.salary.sameSalaryValue.get(), {
        target: { value: "2500" },
      });

      expect(
        rendering.queryByText(
          "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
        )
      ).toBeInTheDocument();
      fireEvent.click(ui.salary.agreement2596.knowingLastSalary.oui.get());
      expect(
        rendering.queryByText("Salaires perçus pendant le préavis")
      ).toBeInTheDocument();
      fireEvent.change(ui.salary.salaries.getAll()[0], {
        target: { value: "2500" },
      });

      fireEvent.click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

      userAction
        .click(ui.previous.get())
        .click(ui.salary.agreement2596.knowingLastSalary.non.get())
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });

    test(`Non-cadres`, () => {
      userAction
        .changeInputList(
          ui.information.agreement2596.proCategory.get(),
          "Emplois techniques et de coiffeurs, emplois de l'esthétique-cosmétique et emplois non techniques"
        )
        .click(ui.next.get());

      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2000" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/01/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/03/2022" },
      });
      fireEvent.click(ui.seniority.hasAbsence.non.get());
      fireEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");

      fireEvent.click(ui.salary.hasPartialTime.non.get());
      fireEvent.click(ui.salary.hasSameSalary.oui.get());
      fireEvent.change(ui.salary.sameSalaryValue.get(), {
        target: { value: "2500" },
      });

      expect(
        rendering.queryByText(
          "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
        )
      ).not.toBeInTheDocument();
      expect(
        rendering.queryByText("Salaires perçus pendant le préavis")
      ).not.toBeInTheDocument();

      fireEvent.click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });
  });
});
