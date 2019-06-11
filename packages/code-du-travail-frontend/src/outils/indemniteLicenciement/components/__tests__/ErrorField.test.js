import React from "react";
import { render } from "react-testing-library";
import { ErrorField } from "../ErrorField";
import { Form, Field } from "react-final-form";

describe("<ErroField />", () => {
  it("should render error", () => {
    const onSubmit = jest.fn();
    const { container, getByTestId } = render(
      <Form
        initialValues={{ absences: [{ type: "Grève", duration: 3 }] }}
        onSubmit={onSubmit}
        render={() => (
          <>
            <Field
              data-testid="test"
              name="test"
              component="input"
              validate={value => (value ? undefined : "Champ requis")}
            />
            <ErrorField name="test" />
          </>
        )}
      />
    );
    const input = getByTestId("test");
    input.focus();
    input.blur();
    expect(container).toMatchSnapshot();
  });
});
