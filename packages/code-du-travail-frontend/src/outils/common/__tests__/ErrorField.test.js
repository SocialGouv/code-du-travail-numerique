import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Field, Form } from "react-final-form";

import { ErrorField } from "../ErrorField";

describe("<ErroField />", () => {
  it("should render error", () => {
    const onSubmit = jest.fn();
    const { container, getByTestId } = render(
      <Form
        initialValues={{ test: "a" }}
        onSubmit={onSubmit}
        render={() => (
          <>
            <Field
              data-testid="test"
              name="test"
              component="input"
              validate={(value) => (value ? undefined : "Champ requis")}
            />
            <ErrorField name="test" />
          </>
        )}
      />
    );
    const input = getByTestId("test");
    fireEvent.change(input, { target: { value: "" } });
    input.blur();
    expect(container).toMatchSnapshot();
  });
});
