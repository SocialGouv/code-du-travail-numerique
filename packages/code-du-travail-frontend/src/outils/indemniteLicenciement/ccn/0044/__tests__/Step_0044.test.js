import React from "react";
import { render } from "react-testing-library";
import Step_0044 from "../Step_0044";
import { Form } from "react-final-form";

describe("<Step_0044 />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Step_0044 />} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should ask for ope and licenciement eco and age", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        initialValues={{ anciennete: 6 }}
        render={() => <Step_0044 />}
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
        render={() => <Step_0044 />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
