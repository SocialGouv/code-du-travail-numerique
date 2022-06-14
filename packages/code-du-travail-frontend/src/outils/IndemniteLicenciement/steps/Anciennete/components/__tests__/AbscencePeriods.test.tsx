import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AbsencePeriods from "../AbsencePeriods";

describe("<AbsencePeriods />", () => {
  it("should render", () => {
    expect(
      render(
        <AbsencePeriods onChange={jest.fn()} absences={[]} error={undefined} />
      )
    ).toBeTruthy();
  });

  it("should select an absence", () => {
    const { getByRole, getAllByRole } = render(
      <AbsencePeriods onChange={jest.fn()} absences={[]} error={undefined} />
    );
    expect(getAllByRole("option").length).toBe(10);
    expect(
      getByRole("option", { name: "Congé pour création d'entreprise" })
    ).toBeInTheDocument();
    expect(
      (
        getByRole("option", {
          name: "Congé pour création d'entreprise",
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);
    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Congé pour création d'entreprise" })
    );
    expect(
      (
        getByRole("option", {
          name: "Congé pour création d'entreprise",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });

  it("should add a new absence line with absences and select one", () => {
    const { getByText, getAllByRole } = render(
      <AbsencePeriods onChange={jest.fn()} absences={[]} error={undefined} />
    );
    expect(getAllByRole("option").length).toBe(10);
    userEvent.click(getByText("Ajouter une absence"));
    expect(getAllByRole("option").length).toBe(20);
  });

  it("should render absences by default", () => {
    const { getByRole, getByLabelText } = render(
      <AbsencePeriods
        onChange={jest.fn()}
        absences={[
          {
            motif: "Congé parental d'éducation",
            durationInMonth: 3,
          },
        ]}
        error={undefined}
      />
    );
    expect(
      (
        getByRole("option", {
          name: "Congé parental d'éducation",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
    expect(
      (
        getByRole("option", {
          name: "Congé pour création d'entreprise",
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);
    const input = getByLabelText("0.duration") as HTMLInputElement;
    expect(input.value).toBe("3");
  });

  it("should render error", () => {
    const { getByText } = render(
      <AbsencePeriods
        onChange={jest.fn()}
        absences={[]}
        error={"Ceci est une erreur"}
      />
    );

    expect(getByText(/Ceci est une erreur/)).toBeInTheDocument();
  });
});
