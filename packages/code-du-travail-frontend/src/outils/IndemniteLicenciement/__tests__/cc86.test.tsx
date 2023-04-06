import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../../../../src/outils";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 75306,
    "cdtnId": "27bbafda66",
    "num": 86,
    "shortTitle": "Entreprises de la publicité et assimilées",
    "id": "KALICONT000005635630",
    "title": "Entreprises de la publicité et assimilées",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635630",
    "slug": "86-entreprises-de-la-publicite-et-assimilees"
  }
`
);

describe("Indemnité licenciement - CC 86", () => {
  beforeEach(() => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        slug={"indemnite-licenciement"}
      />
    );
  });



  test(`Vérification du fait que le salaire de reference est bien celui issu de la formule de calcul de l'indemnité`, () => {
    userEvent.click(ui.introduction.startButton.get());
    userEvent.click(ui.contract.type.cdi.get());
    userEvent.click(ui.contract.fauteGrave.non.get());
    userEvent.click(ui.contract.inaptitude.non.get());
    userEvent.click(ui.contract.arretTravail.non.get());
    userEvent.click(ui.next.get());
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
    userEvent.click(ui.salary.hasPartialTime.non.get());
    userEvent.click(ui.salary.hasSameSalary.non.get());
    fireEvent.change(ui.salary.salaries.getAll()[0], {
      target: { value: "2500" },
    });
    fireEvent.change(ui.salary.salaries.getAll()[0], {
      target: { value: "25000" },
    });
    userEvent.click(ui.next.get());
    expect(ui.result.formula.get()).toHaveTextContent("Formule");
    expect(ui.result.formula.get()).toHaveTextContent(
      "Sref : Salaire de référence (25000 €)"
    );
  });

});
