import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import React from "react";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
  "id": "KALICONT000044594539",
  "num": 3239,
  "shortTitle": "Particuliers employeurs et emploi à domicile",
  "slug": "3239-particuliers-employeurs-et-emploi-a-domicile",
  "title": "Particuliers employeurs et emploi à domicile"
}
`
);

describe("Indemnité licenciement - CC 3239", () => {
  beforeEach(async () => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        publicodesRules={loadPublicodesRules("indemnite-licenciement")}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.next.get());
  });
  test("vérifier l'ineligibilite des ass mat en cas de suspension", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Assistant maternel'" },
    });
    fireEvent.click(ui.information.agreement3239.congeMatSuspension.oui.get());
    fireEvent.click(ui.next.get());
    expect(
      ui.result.legalError.specific.agreement3239.suspendedNotEligible.get()
    ).toBeInTheDocument();
    fireEvent.click(ui.previous.get());
  });
  test("vérifier l'ineligibilite des ass mat pour ancienneté < 9mois", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Assistant maternel'" },
    });
    fireEvent.click(ui.information.agreement3239.congeMatSuspension.non.get());
    fireEvent.change(ui.information.agreement3239.salaryInput.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(
      ui.result.legalError.specific.agreement3239.lessThan9month.get()
    ).toBeInTheDocument();
  });
  test("vérifier l'eligibilite des autres salariés pour ancienneté compris entre 8 et 9 mois", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Salarié du particulier employeur'" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.result.formula.get()).toHaveTextContent("Formule");
  });
  test("vérifier l'ineligibilite des autres salariés pour ancienneté < 8mois", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Salarié du particulier employeur'" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/08/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/08/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.result.legalError.seniorityToLow.get()).toBeInTheDocument();
  });
});
