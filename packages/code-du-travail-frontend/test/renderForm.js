import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

export function renderForm(Component, data) {
  return render(
    <Form initialValues={{ ...data }} onSubmit={jest.fn()}>
      {({ form }) => <Component form={form} />}
    </Form>
  );
}
