import React from "react";
import { render, fireEvent } from "react-testing-library";
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
  it("should render the selected echelon", () => {
    const onSubmit = jest.fn();
    const { container, getByLabelText } = render(
      <Form onSubmit={onSubmit} render={() => <Categorie name="cat" />} />
    );
    const select = getByLabelText(/catégorie/i);
    fireEvent.change(select, { target: { value: "tam" } });
    expect(container).toMatchSnapshot();
  });
});
