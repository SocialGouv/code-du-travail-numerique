import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { DureePreavisDemission } from "../..";
import { ui } from "./ui";

jest.mock("../../../conventions/Search/api/agreements.service");

describe("Vérification que l'étape recherche convention collective fonctionne bien en mockant l'API", () => {
  beforeEach(() => {
    render(<DureePreavisDemission icon="" title="" displayTitle="" />);
  });

  test("Vérification qu'on arrive bien sur l'étape résultat en cherchant la CC", async () => {
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.agreement.agreement.get());
    fireEvent.focus(ui.agreement.agreementInput.get());
    fireEvent.change(ui.agreement.agreementInput.get(), {
      target: { value: "1351" },
    });
    await waitFor(() =>
      expect(ui.agreement1351.searchResult.query()).toBeInTheDocument()
    );
    fireEvent.click(ui.agreement1351.searchResult.get());
    fireEvent.click(ui.next.get());

    fireEvent.change(ui.agreement1351.categoryProInput.get(), {
      target: {
        value:
          "20| Agents d'exploitation, employés administratifs et techniciens",
      },
    });
    fireEvent.change(ui.agreement1351.levelInput.get(), {
      target: { value: "1| I" },
    });
    fireEvent.change(ui.agreement1351.seniorityInput.get(), {
      target: { value: "1| Moins de 15 jours" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.print.get()).toBeInTheDocument();
  });
});
