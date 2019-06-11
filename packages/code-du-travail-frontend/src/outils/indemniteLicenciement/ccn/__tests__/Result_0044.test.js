import React from "react";
import { render } from "react-testing-library";
import Result_0044 from "../Result_0044";
import { Form } from "react-final-form";
import data from "../../__tests__/form.mock.json";

const form = {
  getState: () => data
};

describe("<Result_0044 />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Result_0044 form={form} />} />
    );
    expect(container).toMatchSnapshot();
  });
});
