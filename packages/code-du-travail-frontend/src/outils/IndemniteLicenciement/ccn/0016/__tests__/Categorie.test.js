import React from "react";
import { render } from "react-testing-library";
import { Categorie } from "../Categorie";
import { Form } from "react-final-form";

describe("<Categorie />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Categorie name="cat" />} />
    );
    expect(container).toMatchSnapshot();
  });
});
