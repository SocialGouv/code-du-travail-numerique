import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { loadPublicodes } from "../../api/LoadPublicodes";
import { PublicodesContext, PublicodesProvider, PublicodesSimulator } from "..";

function renderProvider({ children }: { children: React.ReactNode }) {
  return render(
    <PublicodesProvider
      rules={loadPublicodes("preavis-retraite")}
      simulator={PublicodesSimulator.PREAVIS_RETRAITE}
    >
      {children}
    </PublicodesProvider>
  );
}

describe("Publicodes Context", () => {
  it("should render the provider", () => {
    const children = <p>Hello</p>;
    const { container } = renderProvider({ children });
    expect(container.getElementsByTagName("p").item(0)).toHaveTextContent(
      "Hello"
    );
  });

  it("should render no result", () => {
    const { container } = renderProvider({
      children: (
        <PublicodesContext.Consumer>
          {(result) => <p>{result?.result.value}</p>}
        </PublicodesContext.Consumer>
      ),
    });
    expect(container.getElementsByTagName("p").item(0)).toHaveTextContent("");
  });

  it("should render a result", () => {
    const { container } = renderProvider({
      children: (
        <PublicodesContext.Consumer>
          {(result) => (
            <>
              <button
                data-testid="setSituation"
                onClick={() => {
                  result?.setSituation({
                    "contrat salarié . ancienneté": "26",
                    "contrat salarié . convention collective": "'IDCC1090'",
                    "contrat salarié . convention collective . automobiles . catégorie professionnelle":
                      "'Cadres'",
                    "contrat salarié . mise à la retraite": "non",
                    "contrat salarié . travailleur handicapé": "non",
                  });
                }}
              />
              <p>
                {
                  result?.execute(
                    "contrat salarié . préavis de retraite collective en jours"
                  )?.value
                }
              </p>
            </>
          )}
        </PublicodesContext.Consumer>
      ),
    });
    expect(container.getElementsByTagName("p").item(0)).toHaveTextContent("0");
    const setButton = screen.getByTestId("setSituation");
    fireEvent.click(setButton);
    expect(container.getElementsByTagName("p").item(0)).toHaveTextContent("3");
  });
});
