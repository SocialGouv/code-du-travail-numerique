import { render } from "@testing-library/react";
import React from "react";
import { NoticeExample, Simulator } from "../NoticeExample";

describe("<NoticeExample />", () => {
  it.each`
    simulator                            | expected
    ${Simulator.PREAVIS_DEMISSION}       | ${/lettre de démission/}
    ${Simulator.PREAVIS_LICENCIEMENT}    | ${/notification du licenciement/}
    ${Simulator.PREAVIS_DEPART_RETRAITE} | ${/départ à la retraite/}
    ${Simulator.PREAVIS_MISE_RETRAITE}   | ${/mise à la retraite/}
  `(
    "should render a precision for simulator $simulator",
    ({ simulator, expected }) => {
      const { queryByText } = render(
        <NoticeExample simulator={simulator} period={"1 mois"} />
      );
      expect(queryByText(expected)).toBeInTheDocument();
    }
  );

  it.each`
    simulator
    ${Simulator.PREAVIS_DEMISSION}
    ${Simulator.PREAVIS_LICENCIEMENT}
  `("should render an example for simulator $simulator", ({ simulator }) => {
    const { queryByText } = render(
      <NoticeExample simulator={simulator} period={"1 mois"} />
    );
    expect(queryByText(/Exemple/)).toBeInTheDocument();
  });

  it.each`
    simulator
    ${Simulator.PREAVIS_DEPART_RETRAITE}
    ${Simulator.PREAVIS_MISE_RETRAITE}
  `(
    "should not render an example for simulator $simulator",
    ({ simulator }) => {
      const { queryByText } = render(
        <NoticeExample simulator={simulator} period={"1 mois"} />
      );
      expect(queryByText(/Exemple/)).toBeNull();
    }
  );

  it.each`
    period                        | expected
    ${"1 mois"}                   | ${/22 mai/}
    ${"6 mois"}                   | ${/22 octobre/}
    ${"2 jours"}                  | ${/23 avril/}
    ${"2 semaines"}               | ${/5 mai/}
    ${"15 jours"}                 | ${/6 mai/}
    ${"15 jours calendaires"}     | ${/6 mai/}
    ${"1 semaine"}                | ${/28 avril/}
    ${"7 jours calendaires"}      | ${/28 avril/}
    ${"1 semaine de date à date"} | ${/29 avril/}
    ${"1 mois et demi"}           | ${/5 juin/}
  `("should render a precision for $period", ({ period, expected }) => {
    const { queryByText } = render(
      <NoticeExample
        simulator={Simulator.PREAVIS_LICENCIEMENT}
        period={period}
        fromDate={new Date("2022-04-22")}
      />
    );
    expect(queryByText(expected)).toBeInTheDocument();
  });

  it.each`
    period
    ${"blabla"}
    ${"1 moi"}
    ${"2"}
    ${"blabla jours"}
    ${"Entre 1 et 3 mois"}
    ${"1 jour"}
    ${"Durée fixée dans le contrat sans pouvoir être inférieure à 3 mois"}
  `("should not render an example for $period", ({ period }) => {
    const { queryByText } = render(
      <NoticeExample
        simulator={Simulator.PREAVIS_DEMISSION}
        period={period}
        fromDate={new Date("2022-04-22")}
      />
    );
    expect(queryByText(/Exemple/)).toBeNull();
  });

  it.each`
    period                   | expected
    ${"1 jour ouvré"}        | ${/On en compte 5 par semaine/}
    ${"2 jours ouvrés"}      | ${/On en compte 5 par semaine/}
    ${"7 jours calendaires"} | ${/du 1er janvier au 31 décembre/}
  `("should render a precision for $period", ({ period, expected }) => {
    const { queryByText } = render(
      <NoticeExample
        simulator={Simulator.PREAVIS_DEMISSION}
        period={period}
        fromDate={new Date("2022-04-22")}
      />
    );
    expect(queryByText(expected)).toBeInTheDocument();
  });

  it.each`
    period
    ${"7 jours"}
    ${"1 mois"}
    ${"1 mois de date à date"}
    ${"1 mois et demi"}
    ${"blabla jours"}
    ${"Entre 1 et 3 mois"}
    ${"Durée fixée dans le contrat sans pouvoir être inférieure à 3 mois"}
  `("should not render a precision for $period", ({ period }) => {
    const { queryByText } = render(
      <NoticeExample
        simulator={Simulator.PREAVIS_DEMISSION}
        period={period}
        fromDate={new Date("2022-04-22")}
      />
    );
    expect(queryByText(/On en compte 5 par semaine/)).toBeNull();
    expect(queryByText(/du 1er janvier au 31 décembre/)).toBeNull();
  });

  it("should render an example an other example", () => {
    const { queryByText } = render(
      <NoticeExample
        simulator={Simulator.PREAVIS_DEMISSION}
        period={"1 mois"}
      />
    );
    expect(queryByText(/précédent/)).toBeInTheDocument();
  });

  it("should not render an example an other example", () => {
    const { queryByText } = render(
      <NoticeExample
        simulator={Simulator.PREAVIS_DEMISSION}
        period={"1 jour"}
      />
    );
    expect(queryByText(/précédent/)).toBeNull();
  });
});
