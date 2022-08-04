import { fireEvent, render } from "@testing-library/react";
import React from "react";
import SalaireTempsPlein from "../SalaireTempsPlein";

describe("<SalaireTempsPlein />", () => {
  it("should render", () => {
    expect(
      render(
        <SalaireTempsPlein
          title="Yo"
          onSalariesChange={jest.fn()}
          salaryPeriods={[]}
          error={undefined}
        />
      )
    ).toBeTruthy();
  });

  it("should render salaries period by default", () => {
    const { queryByText } = render(
      <SalaireTempsPlein
        title="Indiquez le montant des salaires mensuels brut blabla"
        onSalariesChange={jest.fn()}
        salaryPeriods={[
          {
            month: "janvier",
            value: 2000,
          },
        ]}
      />
    );
    const item = queryByText("Indiquez le montant des salaires mensuels brut", {
      exact: false,
    });
    expect(item).toBeTruthy();
  });

  it("should modify a value of the month", () => {
    let initObject = [
      {
        month: "janvier",
        value: 2000,
      },
    ];
    const onSalariesChange = (salaries: any) => {
      initObject = salaries;
    };
    const { getByTitle } = render(
      <SalaireTempsPlein
        title="Yo"
        onSalariesChange={onSalariesChange}
        salaryPeriods={initObject}
      />
    );
    const input1 = getByTitle(
      /Salaire mensuel brut pour le mois/i
    ) as HTMLInputElement;
    fireEvent.change(input1, { target: { value: "1500" } });
    expect(initObject[0].value).toBe(1500);
  });

  it("should add a prime", () => {
    let initObject = [
      {
        month: "janvier",
        value: 2000,
        prime: undefined,
      },
    ];
    const onSalariesChange = (salaries: any) => {
      initObject = salaries;
    };
    const { getByTitle } = render(
      <SalaireTempsPlein
        title="Yo"
        onSalariesChange={onSalariesChange}
        salaryPeriods={initObject}
      />
    );
    const input1 = getByTitle(
      /Renseignez la prime exceptionnelle pour le mois 1 ici/i
    ) as HTMLInputElement;
    expect(input1).toBeTruthy();
    fireEvent.change(input1, { target: { value: "6000" } });
    expect(initObject[0].prime).toBe(6000);
  });

  it("should render error", () => {
    const { getByText } = render(
      <SalaireTempsPlein
        title="Yo"
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
