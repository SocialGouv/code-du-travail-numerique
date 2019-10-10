import React from "react";
import { render } from "@wrapped-testing-library/react";
import { Form } from "react-final-form";
import { CATEGORIE_KEY } from "../Categorie";
import { Anciennete } from "../Anciennete";

describe("<Anciennete />", () => {
  it("renders AncienneteETAMIC component", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        {({ form }) => <Anciennete form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders AncienneteCE component with initialValues CATEGORIE_KEY=CEI", () => {
    const onSubmit = jest.fn();
    const initialValues = {};
    initialValues[CATEGORIE_KEY] = "CEI";
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Anciennete form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders AncienneteCE component with initialValues CATEGORIE_KEY=CENI", () => {
    const onSubmit = jest.fn();
    const initialValues = {};
    initialValues[CATEGORIE_KEY] = "CENI";
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Anciennete form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
