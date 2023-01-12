import { CalculateurIndemnite, loadPublicodesRules } from "../..";
import { ui } from "./ui";

import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import expect from "expect";

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
`
);

describe(`Tests des erreurs d'éligibilité`, () => {
  beforeEach(() => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        publicodesRules={loadPublicodesRules("indemnite-licenciement")}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
  });

  test("Vérifier l'affichage de l'erreur légal cdd", () => {
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.contract.type.cdd.get());
    fireEvent.click(ui.next.get());
    expect(ui.result.legalError.cdd.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
  });

  test("Vérifier l'affichage de l'erreur légal faute grave", () => {
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.contract.fauteGrave.oui.get());
    fireEvent.click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(ui.result.infoWarning.title.ineligible.query()).toBeInTheDocument();
    expect(ui.result.legalError.fauteGrave.query()).toBeInTheDocument();
    expect(ui.result.infoWarning.message.mayBeCC.query()).toBeInTheDocument();
  });

  test("Vérifier l'affichage de l'erreur ancienneté < 8 mois", () => {
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.next.get());
    userEvent.selectOptions(
      ui.information.agreement16.proCategory.get(),
      "Ingénieurs et cadres"
    );
    fireEvent.click(ui.information.agreement16.proCategoryHasChanged.oui.get());
    fireEvent.change(ui.information.agreement16.dateProCategoryChanged.get(), {
      target: { value: "01/01/2010" },
    });
    fireEvent.change(ui.information.agreement16.engineerAge.get(), {
      target: { value: "38" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/09/2021" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(ui.result.infoWarning.title.ineligible.query()).toBeInTheDocument();
    expect(ui.result.legalError.seniorityToLow.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.message.maybeFirmAgreement.query()
    ).toBeInTheDocument();
  });
});
