import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { CADRE } from "../Categorie";
import { Step } from "../Step";

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
  it("should ask detail about retirement", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={{ age: 62 }}>
        {({ form }) => <Step form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
