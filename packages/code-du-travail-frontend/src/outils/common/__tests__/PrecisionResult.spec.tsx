import { render } from "@testing-library/react";
import React from "react";
import { PrecisionResult, Simulator } from "../PrecisionResult";

describe("<PrecisionResult />", () => {
  it.each`
    simulator                            | expected
    ${Simulator.PREAVIS_DEMISSION}       | ${/lettre de démission/}
    ${Simulator.PREAVIS_LICENCIEMENT}    | ${/notification du licenciement/}
    ${Simulator.PREAVIS_DEPART_RETRAITE} | ${/départ à la retraite/}
    ${Simulator.PREAVIS_MISE_RETRAITE}   | ${/mise à la retraite/}
  `(
    "should render a precision for simulator $simulator",
    ({ simulator, expected }) => {
      const { getByText } = render(
        <PrecisionResult simulator={simulator} period={"1 mois"} />
      );
      expect(getByText(expected)).toBeInTheDocument();
    }
  );

  it.each`
    simulator
    ${Simulator.PREAVIS_DEMISSION}
    ${Simulator.PREAVIS_LICENCIEMENT}
  `("should render an example for simulator $simulator", ({ simulator }) => {
    const { getByText } = render(
      <PrecisionResult simulator={simulator} period={"1 mois"} />
    );
    expect(getByText(/Exemple/)).toBeInTheDocument();
  });

  it.each`
    simulator
    ${Simulator.PREAVIS_DEPART_RETRAITE}
    ${Simulator.PREAVIS_MISE_RETRAITE}
  `(
    "should not render an example for simulator $simulator",
    ({ simulator }) => {
      const { getByText } = render(
        <PrecisionResult simulator={simulator} period={"1 mois"} />
      );
      expect(() => getByText(/Exemple/)).toThrow("Unable to find an element");
    }
  );

  it.each`
    period                        | expected
    ${"1 mois"}                   | ${/22 mai/}
    ${"6 mois"}                   | ${/22 octobre/}
    ${"2 jours"}                  | ${/24 avril/}
    ${"1 jour"}                   | ${/23 avril/}
    ${"2 semaines"}               | ${/6 mai/}
    ${"15 jours"}                 | ${/6 mai/}
    ${"2 jours ouvrés"}           | ${/25 avril/}
    ${"1 semaine"}                | ${/29 avril/}
    ${"7 jours calendaires"}      | ${/29 avril/}
    ${"1 semaine de date à date"} | ${/29 avril/}
    ${"1 mois et demi"}           | ${/5 juin/}
  `("should render a precision for $period", ({ period, expected }) => {
    const { getByText } = render(
      <PrecisionResult
        simulator={Simulator.PREAVIS_DEMISSION}
        period={period}
        fromDate={new Date("2022-04-22")}
      />
    );
    expect(getByText(expected)).toBeInTheDocument();
  });

  it.each`
    period
    ${"blabla"}
    ${"1 moi"}
    ${"2"}
    ${"blabla jours"}
    ${"Entre 1 et 3 mois"}
    ${"Durée fixée dans le contrat sans pouvoir être inférieure à 3 mois"}
  `("should not render an example for $period", ({ period }) => {
    const { getByText } = render(
      <PrecisionResult
        simulator={Simulator.PREAVIS_DEMISSION}
        period={period}
        fromDate={new Date("2022-04-22")}
      />
    );
    expect(() => getByText(/Exemple/)).toThrow("Unable to find an element");
  });
});
