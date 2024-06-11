import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
    "id": "0016",
    "num": 16,
    "shortTitle": "Transports routiers et activités auxiliaires du transport",
    "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport",
    "title": "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950",
    "contributions": true
  }   
`
);

describe("Indemnité licenciement - CC 16", () => {
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
    fireEvent.change(ui.information.agreement16.proCategory.get(), {
      target: { value: "'Ingénieurs et cadres'" },
    });
    userEvent.click(ui.information.agreement16.proCategoryHasChanged.oui.get());
    fireEvent.change(ui.information.agreement16.dateProCategoryChanged.get(), {
      target: { value: "01/01/2010" },
    });
    fireEvent.change(ui.information.agreement16.ruptureEngineerAge.get(), {
      target: { value: "48" },
    });
    userEvent.click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2000" },
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
    expect(ui.result.resultat.get()).toHaveTextContent("12 896,00 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("10 746,67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("12 896,00 €");
    expect(ui.result.dismissalType.mobility.query()).not.toBeInTheDocument();
  });
});
