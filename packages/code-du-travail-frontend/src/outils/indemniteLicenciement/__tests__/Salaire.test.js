import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Salaire } from "../Salaire";

describe("<Salaire />", () => {
  it("should render single work period", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      periods: [],
      derniersMois: [1500, 1500, 1500, 1500, 1500, 1500, 1500]
    };
    const { container } = render(<Salaire value={value} onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });

  it("should render mixed work period", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: true,
      periods: [
        { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
        { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
      ],
      derniersMois: [1500, 1500, 1500, 1500, 1500, 1500, 1500]
    };
    const { container } = render(<Salaire value={value} onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });

  it("should switch from single period to mixed period", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      periods: [],
      derniersMois: [1500, 1500, 1500, 1500, 1500, 1500, 1500]
    };
    const { container, getByLabelText } = render(
      <Salaire value={value} onChange={onChange} />
    );
    const input = getByLabelText(/oui/i);
    fireEvent.click(input);
    expect(container).toMatchSnapshot();
  });
});
