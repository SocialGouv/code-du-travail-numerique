import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { Anciennete } from "../Anciennete";
import { CATEGORIE_KEY } from "../Categorie";

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
