import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { CategoriePeriod } from "../CategoriePeriod";

describe("<CategoryPeriod />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <CategoriePeriod />} />
    );
    expect(container).toMatchSnapshot();
  });
});
