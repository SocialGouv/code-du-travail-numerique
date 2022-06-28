import { fireEvent, render } from "@testing-library/react";
import React from "react";
import SalaireTempsPlein from "../SalaireTempsPlein";

describe("<SalaireTempsPlein />", () => {
  it("should render", () => {
    expect(
      render(
        <SalaireTempsPlein
          onSalariesChange={jest.fn()}
          salaryPeriods={[]}
          error={undefined}
        />
      )
    ).toBeTruthy();
  });

  it("should render salaries period by default", () => {
    const { getAllByTitle } = render(
      <SalaireTempsPlein
        onSalariesChange={jest.fn()}
        salaryPeriods={[
          {
            month: "janvier",
            value: 2000,
          },
        ]}
      />
    );
    expect(getAllByTitle(/Salaire mensuel brut pour le mois/i)).toHaveLength(1);
  });

  it("should modify a value of the month", () => {
    const onSalariesChange = jest.fn();
    const { getByTitle } = render(
      <SalaireTempsPlein
        onSalariesChange={onSalariesChange}
        salaryPeriods={[
          {
            month: "janvier",
            value: 2000,
          },
        ]}
      />
    );
    const input1 = getByTitle(
      /Salaire mensuel brut pour le mois/i
    ) as HTMLInputElement;
    fireEvent.change(input1, { target: { value: "1500" } });
    expect(input1.value).toBe("1500");
    expect(onSalariesChange).toHaveBeenCalledTimes(1);
    expect(onSalariesChange).toHaveBeenCalledWith([
      {
        month: "janvier",
        value: 1500,
      },
    ]);
  });

  it("should render error", () => {
    const { getByText } = render(
      <SalaireTempsPlein
        onSalariesChange={jest.fn()}
        salaryPeriods={[
          {
            month: "janvier",
            value: 2000,
          },
        ]}
        error={"Ceci est une erreur"}
      />
    );

    expect(getByText(/Ceci est une erreur/)).toBeInTheDocument();
  });
});
