import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemnite } from "../index";
import { ui } from "./ui";
import userEvent from "@testing-library/user-event";

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

describe("Indemnité licenciement - CC 3239 - changement de convention collective", () => {
  beforeEach(async () => {
    render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        slug={"indemnite-licenciement"}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.contract.type.cdi.get());
    fireEvent.click(ui.contract.fauteGrave.non.get());
    fireEvent.click(ui.contract.inaptitude.non.get());
    fireEvent.click(ui.contract.arretTravail.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.information.agreement3239.proCategory.get(), {
      target: { value: "'Salarié du particulier employeur'" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2020" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "15/09/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.oui.get());
    userEvent.selectOptions(
      ui.seniority.absences.motif(0).get(),
      "Congé pour convenance personnelle"
    );
    fireEvent.change(ui.seniority.absences.duration(0).get(), {
      target: { value: "6" },
    });
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "3000" },
    });
    fireEvent.click(ui.next.get());
    expect(
      screen.queryByText("Congé pour convenance personnelle")
    ).toBeInTheDocument();
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.previous.get());
    fireEvent.click(ui.agreement.noAgreement.get());
    fireEvent.click(ui.next.get());
  });
  test("vérifier que la question sur la question sur le temps partiel soit affichée et que l'absence spécifique à la 3239 a été supprimée", async () => {
    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(ui.seniority.absences.motifs.queryAll()).toHaveLength(1);
    expect(ui.seniority.absences.motif(0).get()).not.toHaveValue(
      "Congé pour convenance personnelle"
    );
    expect(ui.seniority.absences.duration(0).get()).toHaveValue(null);

    fireEvent.click(ui.next.get());
    expect(
      screen.queryByText("Vous devez renseigner tous les champs")
    ).toBeInTheDocument();

    fireEvent.change(ui.seniority.absences.duration(0).get(), {
      target: { value: "6" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    expect(ui.salary.hasPartialTime.non.query()).toBeInTheDocument();
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.absences.motif.queryAll()).toHaveLength(1);
    expect(ui.result.absences.motif.queryAll()[0]).not.toHaveTextContent(
      "Congé pour convenance personnelle"
    );
    expect(
      screen.queryByText(/Alternance temps plein \/ temps partiel : Non/i)
    ).toBeInTheDocument();
  });
});
