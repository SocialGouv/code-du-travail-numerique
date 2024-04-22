import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635613",
    "id": "0044",
    "num": 44,
    "shortTitle": "Industries chimiques et connexes",
    "slug": "44-industries-chimiques-et-connexes",
    "title": "Convention collective nationale des industries chimiques et connexes du 30 décembre 1952. Étendue par arrêté du 13 novembre 1956 JONC 12 décembre 1956",
    "contributions": true
  }  
`
);

describe("Indemnité licenciement - CC 44", () => {
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
    fireEvent.change(ui.information.agreement44.ruptureAge.get(), {
      target: { value: "60" },
    });
    fireEvent.change(ui.information.agreement44.proCategory.get(), {
      target: { value: "'Ouvriers et collaborateurs (Groupes I à III)'" },
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
    expect(ui.result.resultat.get()).toHaveTextContent("13764 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("10746.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("13764 €");
    expect(ui.result.dismissalType.mobility.query()).not.toBeInTheDocument();
  });
});
