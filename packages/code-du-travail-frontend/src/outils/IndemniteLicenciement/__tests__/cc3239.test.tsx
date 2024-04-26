import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../index";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

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
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
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
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
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
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
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
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).toBeInTheDocument();
  });
  test("vérifier que la CC 3239 n'affecte pas les autres inéligibilités", async () => {
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.contract.type.cdd.get());
    fireEvent.click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.oui.get());
    fireEvent.click(ui.next.get());
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).toBeInTheDocument();
  });

  test("vérifier qu'on a pas la question sur le temps partiel en tant que salarié du particulier employeur", async () => {
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
    expect(
      screen.queryByText(
        "Y a-t-il eu des périodes d'alternance à temps plein et à temps partiel durant le contrat de travail ?"
      )
    ).not.toBeInTheDocument();
  });

  test("vérifier qu'on affiche pas la notif sur le congé parental", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Assistant maternel'" },
    });
    fireEvent.click(ui.information.agreement3239.congeMatSuspension.non.get());
    fireEvent.change(ui.information.agreement3239.salaryInput.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2000" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(
      screen.queryByText(
        /Depuis le 11 mars 2023 les périodes d’absence pour congé paternité ne sont plus retirées/
      )
    ).not.toBeInTheDocument();
  });

  test("vérifier le calcul pour un salarié du particulier employeur", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Salarié du particulier employeur'" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2012" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2024" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/01/2024" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "2100" },
    });
    fireEvent.click(ui.next.get());

    expect(ui.result.resultat.get()).toHaveTextContent("6651,92 €");

    expect(ui.result.sources.queryAll()).toHaveLength(8);
    expect(ui.result.source(0).get()).toHaveTextContent("Article 47-1");
    expect(ui.result.source(1).get()).toHaveTextContent("Article 47-2");
    expect(ui.result.source(2).get()).toHaveTextContent("Article 48-1-3-1-1");
    expect(ui.result.source(3).get()).toHaveTextContent("Article 48-1-3-4");
    expect(ui.result.source(4).get()).toHaveTextContent("Article 49");
    expect(ui.result.source(5).get()).toHaveTextContent("Article 60");
    expect(ui.result.source(6).get()).toHaveTextContent("Article 142");
    expect(ui.result.source(7).get()).toHaveTextContent("Article 163-1");

    expect(ui.result.notifications.queryAll()).toHaveLength(1);
  });

  test("vérifier le calcul pour un assistant maternelle", async () => {
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Assistant maternel'" },
    });
    fireEvent.click(ui.information.agreement3239.congeMatSuspension.non.get());
    fireEvent.change(ui.information.agreement3239.salaryInput.get(), {
      target: { value: "5000" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2020" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/09/2024" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/09/2024" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());

    expect(ui.result.resultat.get()).toHaveTextContent("62,5 €");

    expect(ui.result.sources.queryAll()).toHaveLength(8);
    expect(ui.result.source(0).get()).toHaveTextContent("Article 47-1");
    expect(ui.result.source(1).get()).toHaveTextContent("Article 47-2");
    expect(ui.result.source(2).get()).toHaveTextContent("Article 48-1-3-1-1");
    expect(ui.result.source(3).get()).toHaveTextContent("Article 48-1-3-4");
    expect(ui.result.source(4).get()).toHaveTextContent("Article 49");
    expect(ui.result.source(5).get()).toHaveTextContent("Article 60");
    expect(ui.result.source(6).get()).toHaveTextContent("Article 90-1");
    expect(ui.result.source(7).get()).toHaveTextContent("Article 121-1");

    expect(ui.result.notifications.queryAll()).toHaveLength(2);
    expect(ui.result.notification(1).get()).toHaveTextContent(
      "Le retrait de l'enfant met fin au contrat de travail de l’assistant maternel"
    );
  });
});
