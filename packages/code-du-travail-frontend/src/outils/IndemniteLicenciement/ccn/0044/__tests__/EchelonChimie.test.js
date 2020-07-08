import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { EchelonChimie } from "../EchelonChimie";

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
