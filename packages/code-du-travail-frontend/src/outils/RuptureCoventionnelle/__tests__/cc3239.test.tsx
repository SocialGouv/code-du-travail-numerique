import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

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
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Salarié du particulier employeur'" },
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
    userEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "1488" },
    });
    userEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
  });

  test(`Vérifier l'inéligibilité des assistant maternel`, () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Assistant maternel'" },
    });
    userEvent.click(ui.next.get());

    expect(ui.result.legalError.ruptureTitle.query()).toBeInTheDocument();
  });
});
