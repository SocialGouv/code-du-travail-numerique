import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../common/indemnite-depart/__tests__/ui";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635550",
    "id": "2098",
    "num": 2098,
    "shortTitle": "Prestataires de services dans le domaine du secteur tertiaire",
    "slug": "2098-prestataires-de-services-dans-le-domaine-du-secteur-tertiaire",
    "title": "Convention collective nationale du personnel des prestataires de services dans le domaine du secteur tertiaire du 13 août 1999",
    "contributions": true
  }
`
);

describe("Indemnité licenciement - CC 2098", () => {
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
      ui.information.agreement2098.proCategory.get(),
      "'Cadres'"
    );
    userAction.setInput(ui.information.agreement2098.age.get(), "55");
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/1980");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "1488");
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.dismissalType.inaptitude.query()).not.toBeInTheDocument();
  });
});
