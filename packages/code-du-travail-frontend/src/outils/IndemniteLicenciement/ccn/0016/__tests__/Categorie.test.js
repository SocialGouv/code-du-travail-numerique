import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { Categorie } from "../Categorie";

describe("<Categorie />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Categorie name="cat" />} />
    );
    expect(container).toMatchSnapshot();
  });
});
