import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { loadPublicodesRules } from "../../";
import { PublicodesContext, PublicodesProvider, PublicodesSimulator } from "..";

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

  it("should render a result for indemnité de licenciement", () => {
    renderProviderIndemniteLicenciement({
      children: (
        <PublicodesContext.Consumer>
          {(result) => (
            <>
              <button
                data-testid="setSituation"
                onClick={() => {
                  result?.setSituation({
                    "contrat salarié . ancienneté en année": "2.333333333",
                    "contrat salarié . convention collective": "''",
                    "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
                      "non",
                    "contrat salarié . salaire de référence": "2000",
                    "indemnité de licenciement": "oui",
                  });
                }}
              />
              <p data-testid="text">
                {
                  result?.execute("contrat salarié . indemnité de licenciement")
                    ?.value
                }
              </p>
            </>
          )}
        </PublicodesContext.Consumer>
      ),
    });
    expect(screen.getByTestId("text")).toHaveTextContent("");
    const setButton = screen.getByTestId("setSituation");
    fireEvent.click(setButton);
    expect(screen.getByTestId("text")).toHaveTextContent("1166.667");
  });
});
