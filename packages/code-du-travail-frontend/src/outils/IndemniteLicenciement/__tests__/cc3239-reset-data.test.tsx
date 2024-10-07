import { render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../index";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";
import { UserAction } from "../../../common";

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
`,
);

describe("Indemnité licenciement - CC 3239 - changement de convention collective", () => {
  let userAction: UserAction;
  beforeEach(async () => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />,
    );
    userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    userAction.setInput(
      ui.information.agreement3239.proCategory.get(),
      "'Salarié du particulier employeur'",
    );
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2020");
    userAction.setInput(ui.seniority.notificationDate.get(), "15/09/2022");
    userAction.setInput(ui.seniority.endDate.get(), "15/09/2022");
    userAction.click(ui.seniority.hasAbsence.oui.get());
    userEvent.selectOptions(
      ui.seniority.absences.motif(0).get(),
      "Congé pour convenance personnelle",
    );
    userAction.setInput(ui.seniority.absences.duration(0).get(), "6");
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());
    expect(
      screen.queryByText("Congé pour convenance personnelle"),
    ).toBeInTheDocument();
    userAction.click(ui.previous.get());
    userAction.click(ui.previous.get());
    userAction.click(ui.previous.get());
    userAction.click(ui.previous.get());
    userAction.click(ui.agreement.noAgreement.get());
    userAction.click(ui.next.get());
  });
  test("vérifier que la question sur la question sur le temps partiel soit affichée et que l'absence spécifique à la 3239 a été supprimée", async () => {
    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(ui.seniority.absences.motifs.queryAll()).toHaveLength(1);
    expect(ui.seniority.absences.motif(0).get()).not.toHaveValue(
      "Congé pour convenance personnelle",
    );
    expect(ui.seniority.absences.duration(0).get()).toHaveValue(null);

    userAction.click(ui.next.get());
    expect(
      screen.queryByText("Vous devez renseigner tous les champs"),
    ).toBeInTheDocument();

    userAction.setInput(ui.seniority.absences.duration(0).get(), "6");
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    expect(ui.salary.hasPartialTime.non.query()).toBeInTheDocument();
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.absences.motif.queryAll()).toHaveLength(1);
    expect(ui.result.absences.motif.queryAll()[0]).not.toHaveTextContent(
      "Congé pour convenance personnelle",
    );
    expect(
      screen.queryByText(/Alternance temps plein \/ temps partiel : Non/i),
    ).toBeInTheDocument();
  });
});
