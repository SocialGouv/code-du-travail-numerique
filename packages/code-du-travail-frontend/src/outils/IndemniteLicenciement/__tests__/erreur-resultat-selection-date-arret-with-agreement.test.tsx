import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
  "id": "2216",
  "num": 2216,
  "shortTitle": "Commerce de détail et de gros à prédominance alimentaire",
  "slug": "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
  "title": "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
  "contributions": true
}

`
);

describe("Page salaires: vérification de la liste affichée", () => {
  beforeEach(async () => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
  });

  test("should display with the good number of months at the 'Salaires' step when seniority < 8 month with agreement selected", async () => {
    const userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.oui.get());
    userAction.setInput(ui.contract.dateArretTravail.get(), "03/12/2024");
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    userAction.click(ui.information.agreement2216.licenciementEco.non.get());
    userAction.changeInputList(
      ui.information.agreement2216.proCategory.get(),
      "'Cadres'"
    );
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/12/2024");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/08/2025");
    userAction.setInput(ui.seniority.endDate.get(), "01/09/2025");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.legalError.title.get()).toBeDefined();
  });
});
