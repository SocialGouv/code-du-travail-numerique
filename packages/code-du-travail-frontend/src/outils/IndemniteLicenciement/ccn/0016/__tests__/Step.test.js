import React from "react";
import { render } from "@wrapped-testing-library/react";
import { Step } from "../Step";
import { Form } from "react-final-form";
import { CADRE } from "../Categorie";

describe("<Step />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>{({ form }) => <Step form={form} />}</Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("should ask detail about categories", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        initialValues={{ anciennete: 6, categorie: CADRE }}
      >
        {({ form }) => <Step form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("should ask detail about retirement ", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={{ age: 62 }}>
        {({ form }) => <Step form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
