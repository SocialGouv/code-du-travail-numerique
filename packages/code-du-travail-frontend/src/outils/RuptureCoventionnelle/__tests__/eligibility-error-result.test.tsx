import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

import { fireEvent, render, screen } from "@testing-library/react";
import { byText } from "testing-library-selector";

describe(`Tests d'éligibilité`, () => {
  beforeEach(() => {
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    fireEvent.click(ui.introduction.startButton.get());
  });

  test("Vérifier l'affichage de l'erreur sur le type de contrat CDD", () => {
    fireEvent.click(ui.contract.type.cdd.get());
    fireEvent.click(ui.next.get());
    expect(ui.result.legalError.cddRupture.query()).toBeInTheDocument();
    expect(
      ui.result.infoWarning.eligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
    expect(
      ui.result.infoWarning.ineligibleInfoWarningblock.query()
    ).not.toBeInTheDocument();
  });
});
