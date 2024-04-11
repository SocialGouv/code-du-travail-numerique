import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../..";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635617",
    "id": "0675",
    "num": 675,
    "shortTitle": "Maisons à succursales de vente au détail d'habillement",
    "slug": "675-maisons-a-succursales-de-vente-au-detail-dhabillement",
    "title": "Convention collective nationale des maisons à succursales de vente au détail d'habillement du 30 juin 1972.  Etendue par arrêté du 8 décembre 1972 (JO du 7 janvier 1973).",
    "contributions": true
  }
`
);

describe("Indemnité licenciement - CC 675", () => {
  test("cas spécifique", () => {
    render(<CalculateurIndemnite icon={""} title={""} displayTitle={""} />);
    userEvent.click(ui.introduction.startButton.get());
    userEvent.click(ui.contract.type.cdi.get());
    userEvent.click(ui.contract.fauteGrave.non.get());
    userEvent.click(ui.contract.inaptitude.non.get());
    userEvent.click(ui.contract.arretTravail.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.next.get());
    fireEvent.change(ui.information.agreement675.proCategory.get(), {
      target: { value: "'Employés'" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2021" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2024" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/01/2024" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "1488" },
    });
    fireEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("446.4");
    expect(ui.result.resultat.get()).toHaveTextContent("1116");
  });
});
