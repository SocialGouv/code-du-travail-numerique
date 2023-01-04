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
  "num": 413,
  "shortTitle": "Hôpital",
  "id": "XXXX",
  "title": "Hôpital",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=XXXX",
  "slug": "413-hopital"
}
`
);

describe("Indemnité licenciement", () => {
  describe("parcours avec la convention collective 413 pour tester le cas où il n'y a pas d'indemnité conventionnel", () => {
    beforeEach(() => {
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
});
