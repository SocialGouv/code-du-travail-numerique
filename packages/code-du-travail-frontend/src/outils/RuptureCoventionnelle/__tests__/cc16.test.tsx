import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

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
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
  });

  test(`Vérifier l'enchainement de question à l'étape information`, () => {
    userAction.changeInputList(
      ui.information.agreement16.proCategory.get(),
      "'Ingénieurs et cadres'"
    );
    userAction.click(
      ui.information.agreement16.proCategoryHasChanged.oui.get()
    );
    userAction.setInput(
      ui.information.agreement16.dateProCategoryChanged.get(),
      "01/01/2010"
    );
    userAction.setInput(
      ui.information.agreement16.ruptureEngineerAge.get(),
      "48"
    );
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "1488");
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("12896 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("10746.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("12896 €");
    expect(ui.result.dismissalType.mobility.query()).not.toBeInTheDocument();
  });
});
