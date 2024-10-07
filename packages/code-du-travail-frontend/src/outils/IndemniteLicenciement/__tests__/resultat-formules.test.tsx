import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { byTestId } from "testing-library-selector";
import { UserAction } from "../../../common";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Page résultat: vérification de la formule affichée", () => {
  let userAction: UserAction;
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
      ccNum: 2596,
      ccTitle: "Coiffure",
      select:
        "infos.contrat salarié - convention collective - coiffure - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Cadres",
      expectedA1: "A1 : Ancienneté de 10 ans ou moins (10 ans)",
      expectedA2:
        "A2 : Ancienneté au-delà de 10 ans (≈ 12.17 ans : valeur arrondie)",
      expectedFormula:
        "(14×Sref×A1)+(13×Sref×A2)(\\frac{1}{4} \\times Sref \\times A1) + (\\frac{1}{3} \\times Sref \\times A2)(41​×Sref×A1)+(31​×Sref×A2)",
    },
    {
      inaptitude: false,
      startDate: "01/01/2022",
      notifDate: "31/12/2022",
      endDate: "31/12/2022",
      ccNum: 2596,
      ccTitle: "Coiffure",
      select:
        "infos.contrat salarié - convention collective - coiffure - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Cadres",
      expectedA1: "A : Ancienneté totale (1 an)",
      expectedA2: "A : Ancienneté totale (1 an)",
      expectedFormula: "14×Sref×A",
    },
    {
      inaptitude: true,
      startDate: "01/11/2021",
      notifDate: "01/01/2022",
      endDate: "01/01/2022",
      ccNum: 2596,
      ccTitle: "Coiffure",
      select:
        "infos.contrat salarié - convention collective - coiffure - indemnité de licenciement - catégorie professionnelle",
      selectOption: "Cadres",
      expectedA1: "A : Ancienneté totale (≈ 0.17 an : valeur arrondie)",
      expectedA2: "A : Ancienneté totale (≈ 0.17 an : valeur arrondie)",
      expectedFormula: "(14×Sref×A)×2",
    },
  ])(
    "pour la CC $ccNum avec inaptitude $inaptitude de $startDate à $endDate",
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
          () => `{"num":${ccNum},"shortTitle":"${ccTitle}"}`,
        );

        render(
          <CalculateurIndemniteLicenciement
            icon={""}
            title={""}
            displayTitle={""}
          />,
        );
        userAction = new UserAction();
        userAction.click(ui.introduction.startButton.get());
        userAction.click(ui.contract.type.cdi.get());
        userAction.click(ui.contract.fauteGrave.non.get());
        userAction.click(
          ui.contract.inaptitude[inaptitude ? "oui" : "non"].get(),
        );
        !inaptitude && userAction.click(ui.contract.arretTravail.non.get());
        userAction.click(ui.next.get());
        userAction.click(ui.next.get());

        userAction.changeInputList(byTestId(select).get(), selectOption);
        userAction.click(ui.next.get());
        userAction.setInput(ui.seniority.startDate.get(), startDate);
        userAction.setInput(ui.seniority.notificationDate.get(), notifDate);
        userAction.setInput(ui.seniority.endDate.get(), endDate);

        userAction.click(ui.seniority.hasAbsence.non.get());
        userAction.click(ui.next.get());
        userAction.click(ui.salary.hasPartialTime.non.get());
        userAction.click(ui.salary.hasSameSalary.oui.get());
        userAction.setInput(ui.salary.sameSalaryValue.get(), "2500");
        userAction.click(ui.next.get());

        // Validation que l'on est bien sur l'étape résultat
        expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      });

      test("should show formula", async () => {
        expect(ui.result.formula.get()).toHaveTextContent("Formule");
        expect(ui.result.formula.get()).toHaveTextContent(expectedFormula);
        expect(ui.result.formula.get()).toHaveTextContent(expectedA1);
        expect(ui.result.formula.get()).toHaveTextContent(expectedA2);
        expect(ui.result.formula.get()).toHaveTextContent(
          "Sref : Salaire de référence (2500 €)",
        );
      });
    },
  );
});
