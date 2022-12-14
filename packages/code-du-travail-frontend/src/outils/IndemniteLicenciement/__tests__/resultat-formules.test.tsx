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
  describe.each`
    inaptitude | startDate       | notifDate       | endDate         | ccNum   | ccTitle                                                                                                                         | select                                                                                                                                                 | selectOption         | expectedA1                                                | expectedA2                                                  | expectedFormula
    ${false}   | ${"01/01/2000"} | ${"01/03/2022"} | ${"01/03/2022"} | ${2264} | ${"Hospitalisation privée"}                                                                                                     | ${"infos.contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle"}                   | ${"Non-cadres"}      | ${"A1 : Années d'ancienneté de 10 ans ou moins (10 ans)"} | ${"A2 : Années d'ancienneté au delà de 10 ans (12.17 ans)"} | ${"(15×Sref×A1)+(25×Sref×A2)(\\frac{1}{5} \\times Sref \\times A1) + (\\frac{2}{5} \\times Sref \\times A2)(51​×Sref×A1)+(52​×Sref×A2)"}
    ${false}   | ${"01/01/2000"} | ${"01/03/2022"} | ${"01/03/2022"} | ${29}   | ${"Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)"} | ${"infos.contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle"} | ${"Autres salariés"} | ${"A1 : Ancienneté de 10 ans ou moins (10 ans)"}          | ${"A2 : Ancienneté au-delà de 10 ans (12.17 ans)"}          | ${"(14×Sref×A1)+(13×Sref×A2)(\\frac{1}{4} \\times Sref \\times A1) + (\\frac{1}{3} \\times Sref \\times A2)(41​×Sref×A1)+(31​×Sref×A2)"}
    ${true}    | ${"01/11/2021"} | ${"01/01/2022"} | ${"01/01/2022"} | ${29}   | ${"Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)"} | ${"infos.contrat salarié - convention collective - hospitalisation privée à but non lucratif - indemnité de licenciement - catégorie professionnelle"} | ${"Autres salariés"} | ${"A : Ancienneté totale (0.17 an)"}                      | ${"A : Ancienneté totale (0.17 an)"}                        | ${"(14×Sref×A)×2(\\frac{1}{4} \\times Sref \\times A) \\times 2(41​×Sref×A)×2"}
  `(
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
