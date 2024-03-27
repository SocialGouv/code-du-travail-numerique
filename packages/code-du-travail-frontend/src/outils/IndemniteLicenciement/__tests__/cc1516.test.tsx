import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018773893",
  "id": "KALICONT000018773893",
  "num": 1516,
  "shortTitle": "Formation Organismes",
  "slug": "1516-formation-organismes",
  "title": "Formation Organismes"
}
`
);

describe("Indemnité licenciement - CC 1516", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(() => {
    rendering = render(
      <CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />
    );
    userAction = new UserAction();

    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get());
  });
  test("user is asked for the notice salary", () => {
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2018" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/06/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "2500" },
    });

    expect(
      rendering.queryByText(
        "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
      )
    ).toBeInTheDocument();
    fireEvent.click(
      ui.salary.agreementWithNoticeSalary.knowingLastSalary.oui.get()
    );
    expect(
      rendering.queryByText(
        "Salaires perçus pendant les 3 derniers mois du préavis"
      )
    ).toBeInTheDocument();
    fireEvent.change(ui.salary.agreementWithNoticeSalary.salaries.getAll()[0], {
      target: { value: "4000" },
    });
    fireEvent.change(ui.salary.agreementWithNoticeSalary.primes.getAll()[0], {
      target: { value: "200" },
    });

    fireEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("3548,06 €");
    expect(ui.result.resultTableRows.getAll().length).toBe(3);
    expect(ui.result.resultTableRows.getAll()[0]).toHaveTextContent(
      "mai 20224000 €"
    );
    userAction.click(ui.previous.get());

    expect(
      ui.salary.agreementWithNoticeSalary.salaries.getAll()[0]
    ).toHaveValue(4000);
    expect(ui.salary.agreementWithNoticeSalary.primes.getAll()[0]).toHaveValue(
      200
    );

    userAction
      .click(ui.salary.agreementWithNoticeSalary.knowingLastSalary.non.get())
      .click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("2760,42 €");
    expect(ui.result.resultTableRows.queryAll().length).toBe(0);
  });

  test(`user avec arret de travail is not asked for salary`, () => {
    userAction
      .click(ui.previous.get())
      .click(ui.previous.get())
      .click(ui.contract.arretTravail.oui.get());

    fireEvent.change(ui.contract.dateArretTravail.get(), {
      target: { value: "01/01/2022" },
    });
    userAction.click(ui.next.get()).click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2018" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/06/2022" },
    });
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Salaires");

    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "2500" },
    });
    expect(
      rendering.queryByText(
        "Connaissez-vous le montant des salaires perçus pendant le préavis ?"
      )
    ).not.toBeInTheDocument();
  });
});
