import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Primes from "../Primes";

describe("<Primes />", () => {
  it("should render", () => {
    expect(
      render(
        <Primes
          title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
          onChange={jest.fn()}
          primes={[]}
          error={undefined}
        />
      )
    ).toBeTruthy();
  });

  it("should add a new primes", () => {
    const { getByText, getAllByTitle } = render(
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
        onChange={jest.fn()}
        primes={[]}
      />
    );
    expect(getAllByTitle(/Renseignez votre prime/i)).toHaveLength(1);
    userEvent.click(getByText("Ajouter une prime"));
    expect(getAllByTitle(/Renseignez votre prime/i)).toHaveLength(2);
  });

  it("should delete a prime", () => {
    const { getAllByText, getByText, getAllByTitle } = render(
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
        onChange={jest.fn()}
        primes={[]}
      />
    );
    userEvent.click(getByText("Ajouter une prime"));
    expect(getAllByTitle(/Renseignez votre prime/i)).toHaveLength(2);
    userEvent.click(getAllByText("Supprimer")[0]);
    expect(getAllByTitle(/Renseignez votre prime/i)).toHaveLength(1);
  });

  it("should render primes by default", () => {
    const { getAllByTitle } = render(
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
        onChange={jest.fn()}
        primes={[2000, 3000]}
      />
    );
    const input = getAllByTitle(
      /Renseignez votre prime/i
    )[0] as HTMLInputElement;
    expect(input.value).toBe("2000");
    const input2 = getAllByTitle(
      /Renseignez votre prime/i
    )[1] as HTMLInputElement;
    expect(input2.value).toBe("3000");
  });

  it("should modify prime", () => {
    const onAddPrime = jest.fn();
    const { getByTitle } = render(
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
        onChange={onAddPrime}
        primes={[]}
      />
    );
    const input1 = getByTitle(/Renseignez votre prime/i) as HTMLInputElement;
    fireEvent.change(input1, { target: { value: "2300" } });
    expect(input1.value).toBe("2300");
    expect(onAddPrime).toHaveBeenCalledTimes(1);
    expect(onAddPrime).toHaveBeenCalledWith([2300]);
  });

  it("should render error", () => {
    const { getByText } = render(
      <Primes
        title="Primes annuelles ou exceptionnelles perçues au cours des 3 derniers mois"
        onChange={jest.fn()}
        primes={[]}
        error={"Ceci est une erreur"}
      />
    );
    expect(getByText(/Ceci est une erreur/)).toBeInTheDocument();
  });
});
