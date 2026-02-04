import { render, screen } from "@testing-library/react";
import React from "react";
import { IntegrationInstructions } from "../IntegrationInstructions";

describe("IntegrationInstructions", () => {
  it("should generate integration snippets using the provided host (review branches)", () => {
    render(
      <IntegrationInstructions
        host="https://code-du-travail-numerique-123.ovh.fabrique.social.gouv.fr/"
        parsedUrl="/widgets/search"
        shortTitle="Moteur de recherche"
      />
    );

    const container = screen.getByTestId("integration-instructions");
    expect(container).toBeInTheDocument();

    // The first <pre> contains the <script> snippet.
    const pres = container.querySelectorAll("pre");
    expect(pres.length).toBeGreaterThanOrEqual(2);

    expect(pres[0].textContent).toContain(
      "https://code-du-travail-numerique-123.ovh.fabrique.social.gouv.fr/widget-loader.js"
    );
    expect(pres[1].textContent).toContain(
      '<a href="https://code-du-travail-numerique-123.ovh.fabrique.social.gouv.fr/widgets/search">Moteur de recherche</a>'
    );
  });
});
