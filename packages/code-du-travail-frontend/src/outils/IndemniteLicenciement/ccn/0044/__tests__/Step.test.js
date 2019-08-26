import React from "react";
import { render } from "@testing-library/react";
import { Step } from "../Step";
import { Form } from "react-final-form";

describe("<Step />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Step />} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should ask for ope and licenciement eco and age", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        initialValues={{ anciennete: 6 }}
        render={() => <Step />}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should ask for ope and licenciement eco", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        initialValues={{ anciennete: 1.5 }}
        render={() => <Step />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
