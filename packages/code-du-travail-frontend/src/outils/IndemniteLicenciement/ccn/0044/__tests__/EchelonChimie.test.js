import React from "react";
import { render, fireEvent } from "@wrapped-testing-library/react";
import { EchelonChimie } from "../EchelonChimie";
import { Form } from "react-final-form";

describe("<EchelonChimie />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        render={() => <EchelonChimie name="groupe" />}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render the selected echelon", () => {
    const onSubmit = jest.fn();
    const { container, getByLabelText } = render(
      <Form
        onSubmit={onSubmit}
        render={() => <EchelonChimie name="groupe" />}
      />
    );
    const select = getByLabelText(/échelon/i);
    fireEvent.change(select, { target: { value: 130 } });
    expect(container).toMatchSnapshot();
  });
});
