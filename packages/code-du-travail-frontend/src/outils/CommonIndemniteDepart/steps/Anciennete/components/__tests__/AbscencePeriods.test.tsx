import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AbsencePeriods from "../AbsencePeriods";
import { motif1, sampleMotifs } from "./AbscencePeriod.data";

describe("<AbsencePeriods />", () => {
  it("should render", () => {
    expect(
      render(
        <AbsencePeriods
          onChange={jest.fn()}
          absences={[]}
          motifs={sampleMotifs}
          error={undefined}
          informationData={{}}
          messageMotifExample="Ceci est un exemple"
        />,
      ),
    ).toBeTruthy();
  });

  it("should add a new absence line with absences and select one", () => {
    const { getByText, getAllByRole } = render(
      <AbsencePeriods
        onChange={jest.fn()}
        absences={[]}
        motifs={sampleMotifs}
        error={undefined}
        informationData={{}}
        messageMotifExample="Ceci est un exemple"
      />,
    );
    expect(getAllByRole("option").length).toBe(2);
    userEvent.click(getByText("Ajouter une absence"));
    expect(getAllByRole("option").length).toBe(4);
  });

  it("should render absences by default", () => {
    const { getByRole, getByLabelText } = render(
      <AbsencePeriods
        onChange={jest.fn()}
        motifs={sampleMotifs}
        absences={[
          {
            motif: motif1,
            durationInMonth: 3,
          },
        ]}
        error={undefined}
        informationData={{}}
        messageMotifExample="Ceci est un exemple"
      />,
    );
    expect(
      (
        getByRole("option", {
          name: "Motif 1",
        }) as HTMLOptionElement
      ).selected,
    ).toBe(true);
    expect(
      (
        getByRole("option", {
          name: "Motif 2",
        }) as HTMLOptionElement
      ).selected,
    ).toBe(false);
    const input = getByLabelText(/\.duration/) as HTMLInputElement;
    expect(input.value).toBe("3");
  });

  it("should render error", () => {
    const { getByText } = render(
      <AbsencePeriods
        onChange={jest.fn()}
        motifs={sampleMotifs}
        absences={[]}
        error={{ absences: [{ errorDuration: "Ceci est une erreur" }] }}
        informationData={{}}
        messageMotifExample="Ceci est un exemple"
      />,
    );

    expect(getByText(/Ceci est une erreur/)).toBeInTheDocument();
  });
});
