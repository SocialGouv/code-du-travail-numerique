import React from "react";
import { render, fireEvent } from "react-testing-library";
import { SalaireTempsPartiel } from "../SalaireTempsPartiel";

describe("<SalaireTempsPartiel />", () => {
  it("should render work periods", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      periods: [
        { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ]
    };
    const { container } = render(
      <SalaireTempsPartiel value={value} onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should add a new work period", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      periods: [
        { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ]
    };
    const { getByLabelText, getByText } = render(
      <SalaireTempsPartiel value={value} onChange={onChange} />
    );
    const typeInput = getByLabelText(/type/i);
    const dureeInput = getByLabelText(/durée/i);
    const salaireInput = getByLabelText(/salaire/i);
    const button = getByText(/ajouter la période/i);
    fireEvent.change(typeInput, { target: { value: "temps-plein" } });
    fireEvent.change(dureeInput, { target: { value: "12" } });
    fireEvent.change(salaireInput, { target: { value: "2000" } });
    button.click();
    expect(onChange).toHaveBeenCalledWith({
      ...value,
      periods: [
        ...value.periods,
        expect.objectContaining({
          salaire: "2000",
          type: "temps-plein",
          duree: "12"
        })
      ]
    });
  });
  it("should update an existing work period", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      periods: [
        { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ]
    };
    const { getByLabelText, getByText, getAllByText } = render(
      <SalaireTempsPartiel value={value} onChange={onChange} />
    );

    const [updateButton] = getAllByText(/modifier/i);
    updateButton.click();

    const salaireInput = getByLabelText(/salaire/i);
    fireEvent.change(salaireInput, { target: { value: "2000" } });

    const button = getByText(/modifier la période/i);
    button.click();

    expect(onChange).toHaveBeenCalledWith({
      ...value,
      periods: [
        { uid: "1", salaire: "2000", type: "temps-plein", duree: "10" },
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ]
    });
  });

  it("should remove an existing work period", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      periods: [
        { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ]
    };
    const { getAllByText } = render(
      <SalaireTempsPartiel value={value} onChange={onChange} />
    );

    const [delButton] = getAllByText(/supprimer/i);
    delButton.click();

    expect(onChange).toHaveBeenCalledWith({
      ...value,
      periods: [
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ]
    });
  });
});
