import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { loadPublicodesRules } from "../../";
import { PublicodesProvider } from "..";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

function renderProviderPreavisRetraite({
  children,
}: {
  children: React.ReactNode;
}) {
  return render(
    <PublicodesProvider
      rules={loadPublicodesRules("preavis-retraite")}
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
    >
      {children}
    </PublicodesProvider>
  );
}

function renderProviderIndemniteLicenciement({
  children,
}: {
  children: React.ReactNode;
}) {
  return render(
    <PublicodesProvider
      rules={loadPublicodesRules("indemnite-licenciement")}
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
    >
      {children}
    </PublicodesProvider>
  );
}

describe("Publicodes Context", () => {
  it("should render the provider Préavis Retraite", () => {
    renderProviderPreavisRetraite({
      children: <p data-testid="text">Hello</p>,
    });
    expect(screen.getByTestId("text")).toHaveTextContent("Hello");
  });

  it("should render the provider Indemnité de licenciement", () => {
    renderProviderIndemniteLicenciement({
      children: <p data-testid="text">Hello</p>,
    });
    expect(screen.getByTestId("text")).toHaveTextContent("Hello");
  });
});
