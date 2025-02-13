import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
    "id": "3239",
    "num": 3239,
    "shortTitle": "Particuliers employeurs et emploi à domicile",
    "slug": "3239-particuliers-employeurs-et-emploi-a-domicile",
    "title": "Convention collective nationale des particuliers employeurs et de l'emploi à domicile du 15 mars 2021 - Étendue par arrêté du 6 octobre 2021 JORF 16 octobre 2021",
    "contributions": true
  }   
`
);

describe("Indemnité licenciement - CC 3239", () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <IndemniteRuptureCoSimulator
        breadcrumbTitle="Simulateur d'indemnité de rupture conventionnelle"
        description="Estimez le montant de l'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Simulateur d'indemnité de rupture conventionnelle"
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
      ui.information.agreement3239.proCategory.get(),
      "'Salarié du particulier employeur'"
    );
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "1488");
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
  });

  test(`Vérifier l'inéligibilité des assistant maternel`, () => {
    userAction.changeInputList(
      ui.information.agreement3239.proCategory.get(),
      "'Assistant maternel'"
    );
    userAction.click(ui.next.get());

    expect(ui.result.legalError.ruptureTitle.query()).toBeInTheDocument();
  });
});
