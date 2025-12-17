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

  it("widget.js injects an iframe with clipboard-write permission (regression)", () => {
    // Minimal DOM setup (no React render needed): widget.js should replace a /widgets link by an iframe.
    document.head.innerHTML = "";
    document.body.innerHTML = "";

    // Make host detection work (widget.js reads its own <script src=".../widget.js"> origin).
    const script = document.createElement("script");
    script.src = "https://code.travail.gouv.fr/widget.js";
    document.head.appendChild(script);

    const link = document.createElement("a");
    link.href =
      "https://code.travail.gouv.fr/widgets/modeles-de-courriers/id-1";
    link.textContent = "Modèles de documents";
    document.body.appendChild(link);

    // widget.js is an IIFE; isolateModules ensures it runs for this test even if required elsewhere.
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("../../../../public/widget.js");
    });

    const iframe = document.querySelector("iframe") as HTMLIFrameElement | null;
    expect(iframe).not.toBeNull();
    expect(iframe?.allow).toContain("clipboard-write");
  });
});
