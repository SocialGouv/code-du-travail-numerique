import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntegrationDetailContent } from "../IntegrationDetailContent";

describe("IntegrationDetailContent", () => {
  it("updates the widget preview link when changing the select (regression)", async () => {
    const user = userEvent.setup();

    (window as any).cdtnLoadWidgets = jest.fn();

    render(
      <IntegrationDetailContent
        id="modeles-de-courriers"
        title="Intégrer les modèles"
        shortTitle="Modèles de documents"
        description={["Desc 1"]}
        url="/widgets/modeles-de-courriers/[value]"
        host="https://code.travail.gouv.fr"
        messages={undefined}
        selectOptions={[
          { value: "id-1", label: "Modèle 1" },
          { value: "id-2", label: "Modèle 2" },
        ]}
      />
    );

    // On mount, the component should trigger the widget loader (even if widget.js isn't actually executed in tests).
    await waitFor(() => {
      expect((window as any).cdtnLoadWidgets).toHaveBeenCalled();
    });

    const link = screen.getByRole("link", { name: "Modèles de documents" });
    expect(link).toHaveAttribute(
      "href",
      "https://code.travail.gouv.fr/widgets/modeles-de-courriers/id-1"
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "id-2");

    expect(
      screen.getByRole("link", { name: "Modèles de documents" })
    ).toHaveAttribute(
      "href",
      "https://code.travail.gouv.fr/widgets/modeles-de-courriers/id-2"
    );

    // Changing the select should re-trigger the widget loader.
    await waitFor(() => {
      expect((window as any).cdtnLoadWidgets).toHaveBeenCalledTimes(2);
    });
  });
});
