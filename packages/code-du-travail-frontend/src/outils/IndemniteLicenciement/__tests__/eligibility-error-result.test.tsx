import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 16,
  "shortTitle": "Transports routiers et activités auxiliaires du transport",
  "id": "KALICONT000005635624",
  "title": "Transports routiers et activités auxiliaires du transport",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
  "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
}
`,
);

describe(`Tests des erreurs d'éligibilité`, () => {
  let userAction = new UserAction();
  beforeEach(() => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />,
    );
    userAction.click(ui.introduction.startButton.get());
  });

  test("Vérifier l'affichage de l'erreur légal cdd", () => {
    userAction
      .click(ui.contract.type.cdi.get())
      .click(ui.next.get())
      .click(ui.contract.type.cdd.get())
      .click(ui.next.get());
    expect(ui.result.legalError.cddLicenciement.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query(),
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query(),
    ).not.toBeInTheDocument();
  });

  test("Vérifier l'affichage de l'erreur légal faute grave", () => {
    userAction
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.next.get())
      .click(ui.contract.fauteGrave.oui.get())
      .click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query(),
    ).not.toBeInTheDocument();
    expect(ui.result.infoWarning.title.ineligible.query()).toBeInTheDocument();
    expect(ui.result.legalError.fauteGrave.query()).toBeInTheDocument();
    expect(ui.result.infoWarning.message.mayBeCC.query()).toBeInTheDocument();
  });

  test("Vérifier l'affichage de l'erreur ancienneté < 8 mois", () => {
    userAction
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get())
      .changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ingénieurs et cadres",
      )
      .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
      .setInput(
        ui.information.agreement16.dateProCategoryChanged.get(),
        "01/01/2010",
      )
      .setInput(ui.information.agreement16.engineerAge.get(), "38")
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/09/2021")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2022")
      .click(ui.seniority.hasAbsence.non.get())
      .setInput(ui.seniority.endDate.get(), "01/01/2022")
      .click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query(),
    ).not.toBeInTheDocument();
    expect(ui.result.infoWarning.title.ineligible.query()).toBeInTheDocument();
    expect(ui.result.legalError.seniorityToLow.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.message.maybeFirmAgreement.query(),
    ).toBeInTheDocument();
  });

  test("Vérifier l'affichage de l'erreur ancienneté < 8 mois quand on revient changer la date de notification", () => {
    userAction
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get())
      .changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ingénieurs et cadres",
      )
      .click(ui.information.agreement16.proCategoryHasChanged.non.get())
      .setInput(ui.information.agreement16.engineerAge.get(), "38")
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.notificationDate.get(), "01/10/2024")
      .setInput(ui.seniority.endDate.get(), "01/12/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2000")
      .click(ui.next.get());
    expect(ui.activeStep.get()).toHaveTextContent("Indemnité");
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .setInput(ui.seniority.notificationDate.get(), "01/08/2024")
      .click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query(),
    ).not.toBeInTheDocument();
    expect(ui.result.infoWarning.title.ineligible.query()).toBeInTheDocument();
    expect(ui.result.legalError.seniorityToLow.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.message.maybeFirmAgreement.query(),
    ).toBeInTheDocument();
  });
});
