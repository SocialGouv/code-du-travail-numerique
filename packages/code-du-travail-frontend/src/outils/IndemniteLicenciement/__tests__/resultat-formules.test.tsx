import { fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";
import { byTestId } from "testing-library-selector";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Page résultat: vérification de la formule affichée", () => {
  describe.each([
    {
      inaptitude: false,
      startDate: "01/01/2000",
      notifDate: "01/03/2022",
      endDate: "01/03/2022",
      ccNum: 2264,
      ccTitle: "Hospitalisation privée",
      select:
        "infos.contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Non-cadres",
      expectedA1: "A1 : Années d'ancienneté de 10 ans ou moins (10 ans)",
      expectedA2:
        "A2 : Années d'ancienneté au delà de 10 ans (≈ 12.17 ans : valeur arrondie)",
      expectedFormula:
        "(15×Sref×A1)+(25×Sref×A2)(\\frac{1}{5} \\times Sref \\times A1) + (\\frac{2}{5} \\times Sref \\times A2)(51​×Sref×A1)+(52​×Sref×A2)",
    },
    {
      inaptitude: false,
      startDate: "01/01/2000",
      notifDate: "01/03/2022",
      endDate: "01/03/2022",
      ccNum: 29,
      ccTitle:
        " : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
      select:
        "infos.contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Autres salariés",
      expectedA1: "A1 : Ancienneté de 10 ans ou moins (10 ans)",
      expectedA2:
        "A2 : Ancienneté au-delà de 10 ans (≈ 12.17 ans : valeur arrondie)",
      expectedFormula:
        "(14×Sref×A1)+(13×Sref×A2)(\\frac{1}{4} \\times Sref \\times A1) + (\\frac{1}{3} \\times Sref \\times A2)(41​×Sref×A1)+(31​×Sref×A2)",
    },
    {
      inaptitude: true,
      startDate: "01/11/2021",
      notifDate: "01/01/2022",
      endDate: "01/01/2022",
      ccNum: 29,
      ccTitle:
        " : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
      select:
        "infos.contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Autres salariés",
      expectedA1: "A : Ancienneté totale (≈ 0.17 an : valeur arrondie)",
      expectedA2: "A : Ancienneté totale (≈ 0.17 an : valeur arrondie)",
      expectedFormula: "(14×Sref×A)×2",
    },
    {
      inaptitude: false,
      startDate: "01/01/2022",
      notifDate: "31/12/2022",
      endDate: "31/12/2022",
      ccNum: 29,
      ccTitle:
        " : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
      select:
        "infos.contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Autres salariés",
      expectedA1: "A : Ancienneté totale (1 an)",
      expectedA2: "A : Ancienneté totale (1 an)",
      expectedFormula: "14×Sref×A",
    },
  ])(
    "pour la CC $ccNum avec inaptitude $inaptitude",
    ({
      inaptitude,
      startDate,
      notifDate,
      endDate,
      ccNum,
      ccTitle,
      expectedFormula,
      select,
      selectOption,
      expectedA1,
      expectedA2,
    }) => {
      beforeEach(async () => {
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => `{"num":${ccNum},"shortTitle":"${ccTitle}"}`
        );

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
        userEvent.click(
          ui.contract.inaptitude[inaptitude ? "oui" : "non"].get()
        );
        userEvent.click(ui.next.get());
        userEvent.click(ui.next.get());

        userEvent.selectOptions(byTestId(select).get(), selectOption);
        userEvent.click(ui.next.get());
        fireEvent.change(ui.seniority.startDate.get(), {
          target: { value: startDate },
        });
        fireEvent.change(ui.seniority.notificationDate.get(), {
          target: { value: notifDate },
        });
        fireEvent.change(ui.seniority.endDate.get(), {
          target: { value: endDate },
        });

        userEvent.click(ui.seniority.hasAbsence.non.get());
        userEvent.click(ui.next.get());
        userEvent.click(ui.salary.hasPartialTime.non.get());
        userEvent.click(ui.salary.hasSameSalary.oui.get());
        fireEvent.change(ui.salary.sameSalaryValue.get(), {
          target: { value: "2500" },
        });
        userEvent.click(ui.next.get());

        // Validation que l'on est bien sur l'étape résultat
        expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      });

      test("should show formula", async () => {
        expect(ui.result.formula.get()).toHaveTextContent("Formule");
        expect(ui.result.formula.get()).toHaveTextContent(expectedFormula);
        expect(ui.result.formula.get()).toHaveTextContent(expectedA1);
        expect(ui.result.formula.get()).toHaveTextContent(expectedA2);
        expect(ui.result.formula.get()).toHaveTextContent(
          "Sref : Salaire de référence (2500 €)"
        );
      });
    }
  );
});
