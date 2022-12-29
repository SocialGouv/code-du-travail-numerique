import { fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";

describe("Arrêt de travail", () => {
  describe("Page contrat de travail: vérification des questions affichées", () => {
    beforeEach(async () => {
      render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
        />
      );
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.oui.get());
    });

    test("should display a new question", async () => {
      expect(ui.contract.arretTravail.question.query()).toBeInTheDocument();
    });

    test("should stop because a new question is display", async () => {
      userEvent.click(ui.next.get());
      expect(ui.agreement.agreement.query()).not.toBeInTheDocument();
    });

    test("should pass to next step", async () => {
      userEvent.click(ui.contract.arretTravail.non.get());
      userEvent.click(ui.next.get());
      expect(ui.agreement.agreement.query()).toBeInTheDocument();
    });

    test("should stop because a date question about the 'arret de travail' is asked", async () => {
      userEvent.click(ui.contract.arretTravail.oui.get());
      userEvent.click(ui.next.get());
      expect(ui.agreement.agreement.query()).not.toBeInTheDocument();
    });

    test("should pass to next step after selecting a date", async () => {
      userEvent.click(ui.contract.arretTravail.oui.get());
      fireEvent.change(ui.contract.dateArretTravail.get(), {
        target: { value: "15/09/2022" },
      });
      userEvent.click(ui.next.get());
      expect(ui.agreement.agreement.query()).toBeInTheDocument();
    });
  });

  describe("Page salaires: vérification de la liste affichée", () => {
    beforeEach(async () => {
      render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
        />
      );
    });

    test("should display with the good number of months at the 'Salaires' step if no inaptitude", async () => {
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.oui.get());
      userEvent.click(ui.contract.arretTravail.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.agreement.noAgreement.get());
      userEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2022" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/05/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/09/2022" },
      });
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(ui.salary.salaries.queryAll()).toHaveLength(4);
    });

    test("should display with the good number of months at the 'Salaires' step", async () => {
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.oui.get());
      userEvent.click(ui.contract.arretTravail.oui.get());
      fireEvent.change(ui.contract.dateArretTravail.get(), {
        target: { value: "01/03/2022" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.agreement.noAgreement.get());
      userEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2022" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/05/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/09/2022" },
      });
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(ui.salary.salaries.queryAll()).toHaveLength(2);
    });
  });
});
