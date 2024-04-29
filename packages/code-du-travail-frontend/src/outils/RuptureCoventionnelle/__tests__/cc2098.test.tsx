import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

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
    fireEvent.change(ui.information.agreement2098.proCategory.get(), {
      target: { value: "'Cadres'" },
    });
    fireEvent.change(ui.information.agreement2098.age.get(), {
      target: { value: "55" },
    });
    userEvent.click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/1980" },
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
    expect(ui.result.resultat.get()).toHaveTextContent("20666,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("20666.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("20666.67 €");
    expect(ui.result.dismissalType.inaptitude.query()).not.toBeInTheDocument();
  });
});
