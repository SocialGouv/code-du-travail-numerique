import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 216431,
    "cdtnId": "a25dfc974f",
    "contributions": true,
    "num": 2120,
    "shortTitle": "Banque",
    "id": "2120",
    "title": "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004.",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
    "slug": "2120-banque"
}
`
);

describe("Rupture Co - CC 2120", () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userAction = new UserAction();

    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get());
  });

  test(`Verification du processus`, () => {
    fireEvent.change(ui.information.agreement2120.proCategory.get(), {
      target: { value: "'Cadres'" },
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
    fireEvent.change(ui.salary.agreement2120.salariesVariablePart.get(), {
      target: { value: "2000" },
    });
    userEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("25626,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("25626.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("25626.67 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
    expect(ui.result.dismissalType.discipline.query()).not.toBeInTheDocument();
  });
});
