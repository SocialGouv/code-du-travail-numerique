import React from "react";
import { render } from "react-testing-library";
import { Form } from "react-final-form";
import { Salaire } from "../Salaire";

describe("<Salaire />", () => {
  it("renders", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>{({ form }) => <Salaire form={form} />}</Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a question asking about income's regularity", () => {
    const onSubmit = jest.fn();
    const initialValues = { hasBrancheNewSalaire: true };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Salaire form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders an input field of type number", () => {
    const onSubmit = jest.fn();
    const initialValues = {
      hasBrancheNewSalaire: true,
      hasBrancheNewRegularSalaire: true
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Salaire form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders a table of fields of type number", () => {
    const onSubmit = jest.fn();
    const initialValues = {
      hasBrancheNewSalaire: true,
      hasBrancheNewRegularSalaire: false,
      brancheNewIrregularSalaire: [
        {
          label: "juillet 2019",
          salary: null
        },
        {
          label: "juin 2019",
          salary: null
        }
      ]
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Salaire form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
