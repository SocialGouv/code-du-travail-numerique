import React from "react";
import { render } from "react-testing-library";
import { CategoryPeriod } from "../CategoryPeriod";
import { Form } from "react-final-form";

describe("<CategoryPeriod />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <CategoryPeriod />} />
    );
    expect(container).toMatchSnapshot();
  });
});
