import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../../../../src/outils";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `{
    "url":"https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635653",
    "id":"KALICONT000005635653",
    "num":1404,
    "shortTitle":"Entreprises de la maintenance, distribution et location de matériels agricoles, de travaux publics, de bâtiment, de manutention, de motoculture de plaisance et activités connexes, dite SDLM",
    "slug":"1404-entreprises-de-la-maintenance-distribution-et-location-de-materiels-agrico",
    "title":"Entreprises de la maintenance, distribution et location de matériels agricoles, de travaux publics, de bâtiment, de manutention, de motoculture de plaisance et activités connexes, dite SDLM"
}`
);

describe("Indemnité licenciement - CC 1404", () => {
  beforeEach(() => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        slug={"indemnite-licenciement"}
      />
    );
    userEvent.click(ui.introduction.startButton.get());
    userEvent.click(ui.contract.type.cdi.get());
    userEvent.click(ui.contract.fauteGrave.non.get());
    userEvent.click(ui.contract.inaptitude.non.get());
    userEvent.click(ui.contract.arretTravail.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.next.get());
  });

  test("Vérifier que le CDI classique amène au résultat", () => {
    userEvent.click(ui.information.agreement1404.cdiOperation.non.get());
    userEvent.click(ui.next.get());
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
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
  });
  describe("Etant donné un CDI opération", () => {
    beforeEach(() =>
      userEvent.click(ui.information.agreement1404.cdiOperation.oui.get())
    );
    describe("Etant donné une mission impossible", () => {
      beforeEach(() =>
        userEvent.click(
          ui.information.agreement1404.missionImpossible.oui.get()
        )
      );
      test("Vérifier que le licenciement avant fin de la période d'essai amène au résultat", () => {
        userEvent.click(ui.information.agreement1404.trial.oui.get());
        userEvent.click(ui.next.get());
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
        expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      });
      test("Vérifier que le licenciement après fin de la période d'essai amène au résultat", () => {
        userEvent.click(ui.information.agreement1404.trial.non.get());
        fireEvent.change(ui.information.agreement1404.salaryTotal.get(), {
          target: { value: "50000" },
        });
        userEvent.click(ui.next.get());
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
        expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      });
    });
    test("Vérifier que la mission possible ammène au résultat", () => {
      userEvent.click(ui.information.agreement1404.missionImpossible.non.get());
      fireEvent.change(ui.information.agreement1404.duree.get(), {
        target: { value: "30" },
      });
      fireEvent.change(ui.information.agreement1404.salary1.get(), {
        target: { value: "100000" },
      });
      fireEvent.change(ui.information.agreement1404.salary2.get(), {
        target: { value: "150000" },
      });
      fireEvent.change(ui.information.agreement1404.salary3.get(), {
        target: { value: "200000" },
      });
      userEvent.click(ui.next.get());
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
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });
  });
});
