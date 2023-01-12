import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url":"https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635613",
  "id":"KALICONT000005635613",
  "num":44,
  "shortTitle":"Industries chimiques et connexes",
  "slug":"44-industries-chimiques-et-connexes","title":"Industries chimiques et connexes"}
`
);

describe("Indemnité licenciement - CC 44", () => {
  describe("parcours avec la convention collective pour valider ses spécificités", () => {
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
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      userEvent.click(ui.information.agreement44.economicFire.oui.get());
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "38" },
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
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test(`
     - vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
     - vérification que l'on demande si le salaire a eu des primes pour un Agents de maîtrise et techniciens (Groupe IV)
     - vérification que l'on ne demande pas si le salaire a eu des primes pour un Ingénieurs et cadres (Groupe V)
    `, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un Agents de maîtrise et techniciens (Groupe IV)
      userEvent.click(ui.previous.get());
      userEvent.click(ui.previous.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Agents de maîtrise et techniciens (Groupe IV)"
      );
      userEvent.click(ui.information.agreement44.economicFire.oui.get());
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "36" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un Ingénieurs et cadres (Groupe V)
      userEvent.click(ui.previous.get());
      userEvent.click(ui.previous.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Ingénieurs et cadres (Groupe V)"
      );
      userEvent.click(ui.information.agreement44.economicFire.oui.get());
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "36" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());

      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
    });
  });
});
