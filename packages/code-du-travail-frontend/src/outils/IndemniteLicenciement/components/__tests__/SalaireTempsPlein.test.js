import React from "react";
import { render, fireEvent } from "@wrapped-testing-library/react";
import { SalaireTempsPlein } from "../SalaireTempsPlein";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

describe("<SalaireTempsPlein />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{
          periods: [
            { label: "janvier", salary: 2000 },
            { label: "février", salary: 1000 }
          ]
        }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPlein name="periods" />}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should autofill blank input", () => {
    const onSubmit = jest.fn();
    const { container, getByLabelText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{
          periods: [
            { label: "janvier", salary: null },
            { label: "février", salary: null }
          ]
        }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPlein name="periods" />}
      />
    );
    const input = getByLabelText("janvier");
    input.click();
    fireEvent.change(input, { target: { value: 2000 } });
    fireEvent.blur(input);
    expect(container).toMatchSnapshot();
  });
});
