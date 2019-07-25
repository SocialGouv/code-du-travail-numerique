/* global jest */
import React from "react";
import { render } from "react-testing-library";
import { Form } from "react-final-form";

export function renderForm(Component, data) {
  return render(
    <Form initialValues={{ ...data }} onSubmit={jest.fn()}>
      {({ form }) => <Component form={form} />}
    </Form>
  );
}
