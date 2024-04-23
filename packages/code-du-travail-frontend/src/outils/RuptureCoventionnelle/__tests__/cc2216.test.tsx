import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
    "id": "2216",
    "num": 2216,
    "shortTitle": "Commerce de détail et de gros à prédominance alimentaire",
    "slug": "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
    "title": "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
    "contributions": true
  }  
`
);

describe("Indemnité licenciement - CC 2216", () => {
  beforeEach(() => {
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userEvent.click(ui.introduction.startButton.get());
    userEvent.click(ui.contract.type.cdi.get());
    userEvent.click(ui.contract.arretTravail.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.next.get());
  });

  test(`Vérifier l'enchainement de question à l'étape information`, () => {
    fireEvent.change(ui.information.agreement2216.proCategory.get(), {
      target: { value: "'Cadres'" },
    });
    fireEvent.change(ui.information.agreement2216.ruptureAge.get(), {
      target: { value: "65" },
    });
    userEvent.click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/1970" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/03/2024" },
    });
    userEvent.click(ui.seniority.hasAbsence.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.salary.hasPartialTime.non.get());
    userEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "1488" },
    });
    userEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("25626,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("25626.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("24882.67 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
  });
});
