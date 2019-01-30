import React from "react";
import { render, fireEvent } from "react-testing-library";
import { WorkPeriodForm } from "../WorkPeriodForm";

describe("<WorkPeriodForm />", () => {
  it("should render single work period", () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const period = {
      type: "temps-plein",
      duree: "10",
      salaire: "1000"
    };
    const ref = React.createRef();
    const { container } = render(
      <WorkPeriodForm
        period={period}
        onChange={onChange}
        onSubmit={onSubmit}
        ref={ref}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should call onChange", () => {
    const props = {
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      period: {
        type: "temps-plein",
        duree: "10",
        salaire: "1000"
      }
    };
    const ref = React.createRef();
    const { getByLabelText } = render(<WorkPeriodForm {...props} ref={ref} />);

    const salaireInput = getByLabelText(/salaire/i);
    fireEvent.change(salaireInput, { target: { value: 1500 } });
    expect(props.onChange).toHaveBeenCalled();
  });

  it("should call onSubmit when data are valid", () => {
    const props = {
      onChange: jest.fn(),
      // HACK(lionelb): needed to avoid jsdom error about submit
      // @see https://github.com/jsdom/jsdom/issues/1937
      onSubmit: jest.fn().mockImplementation(event => event.preventDefault()),
      period: {
        type: "temps-plein",
        duree: "10",
        salaire: "1000",
        isValid: true
      }
    };
    const ref = React.createRef();
    const { getByText } = render(<WorkPeriodForm {...props} ref={ref} />);

    const addButton = getByText(/ajouter la période/i);
    addButton.click();
    expect(props.onSubmit).toHaveBeenCalled();
  });
  it("should not call onSubmit when data are not valid", () => {
    const props = {
      onChange: jest.fn(),
      // HACK(lionelb): needed to avoid jsdom error about submit
      // @see https://github.com/jsdom/jsdom/issues/1937
      onSubmit: jest.fn().mockImplementation(event => event.preventDefault()),
      period: {
        type: "temps-plein",
        duree: "10",
        salaire: "0",
        isValid: false
      }
    };
    const ref = React.createRef();
    const { getByText } = render(<WorkPeriodForm {...props} ref={ref} />);

    const addButton = getByText(/ajouter la période/i);
    addButton.click();
    expect(props.onSubmit).not.toHaveBeenCalled();
  });
});
