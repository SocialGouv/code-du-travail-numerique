import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntegrationDetailContent } from "../IntegrationDetailContent";

describe("IntegrationDetailContent", () => {
  it("updates the widget preview link when changing the select", async () => {
    const user = userEvent.setup();

    // Simulate an already-injected iframe (widget already rendered on the page)
    const iframe = document.createElement("iframe");
    iframe.id = "cdtn-iframe-modeles-de-courriers-option1";
    iframe.src = "https://example.com/widgets/modeles-de-courriers/option1";
    document.body.appendChild(iframe);

    try {
      render(
        <IntegrationDetailContent
          description={["Description"]}
          title="Intégrer les modèles de documents"
          shortTitle="Modèles de documents"
          url="/widgets/modeles-de-courriers/[value]"
          host="https://example.com"
          messages={undefined}
          id="modeles-de-courriers"
          selectOptions={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
          ]}
        />
      );

      const getPreviewHref = () =>
        screen
          .getByTestId("integration-detail-preview")
          .querySelector("a")
          ?.getAttribute("href");

      expect(getPreviewHref()).toBe(
        "https://example.com/widgets/modeles-de-courriers/option1"
      );

      const select = screen
        .getByTestId("integration-detail-select")
        .querySelector("select") as HTMLSelectElement | null;

      expect(select).toBeInTheDocument();

      await user.selectOptions(select as HTMLSelectElement, "option2");

      await waitFor(() => {
        expect(getPreviewHref()).toBe(
          "https://example.com/widgets/modeles-de-courriers/option2"
        );
        expect(iframe).toHaveAttribute(
          "src",
          "https://example.com/widgets/modeles-de-courriers/option2"
        );
      });
    } finally {
      iframe.remove();
    }
  });

  it("widget.js injects an iframe with clipboard-write permission", () => {
    document.body.innerHTML =
      '<a href="http://localhost:3000/widgets/search">Search widget</a>';

    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("../../../../public/widget.js");
    });

    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("allow", "clipboard-write");
  });
});
