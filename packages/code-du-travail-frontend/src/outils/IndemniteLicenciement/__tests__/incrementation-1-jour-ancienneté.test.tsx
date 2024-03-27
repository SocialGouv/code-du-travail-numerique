import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

jest.mock("../../../conventions/Search/api/agreements.service");
jest.mock("../../../conventions/Search/api/enterprises.service");

describe("Page salaire: vérification l'affichage des salaires mensuels", () => {
  test("should show 12 month", async () => {
    const { getByText } = render(
      <CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />
    );
    userEvent.click(ui.introduction.startButton.get());
    userEvent.click(ui.contract.type.cdi.get());
    userEvent.click(ui.contract.fauteGrave.non.get());
    userEvent.click(ui.contract.inaptitude.non.get());
    userEvent.click(ui.contract.arretTravail.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.agreement.noAgreement.get());
    userEvent.click(ui.next.get());
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2022" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "31/12/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "31/12/2022" },
    });

    userEvent.click(ui.seniority.hasAbsence.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.salary.hasPartialTime.non.get());
    userEvent.click(ui.salary.hasSameSalary.non.get());
    expect(
      getByText(/Salaires mensuels bruts des 12 derniers mois/)
    ).toBeInTheDocument();
    expect(getByText(/décembre 2022/)).toBeInTheDocument();
  });
});
