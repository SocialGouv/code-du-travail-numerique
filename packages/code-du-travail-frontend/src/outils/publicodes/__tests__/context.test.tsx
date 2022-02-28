import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { loadPublicodes } from "../../api/LoadPublicodes";
import { PublicodesContext, PublicodesProvider, PublicodesSimulator } from "..";

function renderProviderPreavisRetraite({
  children,
}: {
  children: React.ReactNode;
}) {
  return render(
    <PublicodesProvider
      rules={loadPublicodes("preavis-retraite")}
      simulator={PublicodesSimulator.PREAVIS_RETRAITE}
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
      rules={loadPublicodes("indemnite-licenciement")}
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

  it("should render no result", () => {
    renderProviderPreavisRetraite({
      children: (
        <PublicodesContext.Consumer>
          {(result) => (
            <p data-testid="text">
              {
                result?.execute(
                  "contrat salarié . préavis de retraite collective en jours"
                )?.value
              }
            </p>
          )}
        </PublicodesContext.Consumer>
      ),
    });
    expect(screen.getByTestId("text")).toHaveTextContent("0");
  });

  it("should render a result for préavis de retraite CC", () => {
    renderProviderPreavisRetraite({
      children: (
        <PublicodesContext.Consumer>
          {(result) => (
            <>
              <button
                data-testid="setSituation"
                onClick={() => {
                  result?.setSituation({
                    "contrat salarié . ancienneté": "26",
                    "contrat salarié . convention collective": "'IDCC0086'",
                    "contrat salarié . convention collective . publicité française . catégorie professionnelle":
                      "'Cadres (à partir du coefficient 400)'",
                    "contrat salarié . mise à la retraite": "oui",
                    "contrat salarié . travailleur handicapé": "non",
                    "préavis de retraite": "oui",
                  });
                }}
              />
              <p data-testid="text">
                {
                  result?.execute(
                    "contrat salarié . préavis de retraite collective en jours"
                  )?.value
                }
              </p>
              <p data-testid="references">
                {result
                  ?.getReferences()
                  .map((ref) => ref.article)
                  .join(", ")}
              </p>
              <p data-testid="notifications">
                {result
                  ?.getNotifications()
                  .map((ref) => ref.description)
                  .join(", ")
                  .toString()}
              </p>
            </>
          )}
        </PublicodesContext.Consumer>
      ),
    });
    expect(screen.getByTestId("text")).toHaveTextContent("0");
    const setButton = screen.getByTestId("setSituation");
    fireEvent.click(setButton);
    expect(screen.getByTestId("text")).toHaveTextContent("3");
    expect(screen.getByTestId("references")).toHaveTextContent(
      "Article L1237-6, Article L1234-1, Article 70.2, Article 68"
    );
    expect(screen.getByTestId("notifications")).toHaveTextContent(
      "Pour le préavis de mise à la retraite, la convention collective indique une durée minimale et maximale. Il convient donc de se reporter vers l'employeur ou son représentant (ex : service RH) pour déterminer la durée applicable au préavis."
    );
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
                    "contrat salarié . ancienneté": "28",
                    "contrat salarié . convention collective": "''",
                    "contrat salarié . salaire de référence": "2000",
                    "contrat salarié . travailleur handicapé": "non",
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
    expect(screen.getByTestId("text")).toHaveTextContent("0");
    const setButton = screen.getByTestId("setSituation");
    fireEvent.click(setButton);
    expect(screen.getByTestId("text")).toHaveTextContent("1166.67");
  });
});
