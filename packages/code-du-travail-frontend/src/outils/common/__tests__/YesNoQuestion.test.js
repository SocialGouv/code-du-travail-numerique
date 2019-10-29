import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { YesNoQuestion } from "../YesNoQuestion";
import { Form } from "react-final-form";

describe("<YesNoQuestion />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        render={() => <YesNoQuestion name="test" label="lorem ipsum ?" />}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Form
        onSubmit={onSubmit}
        render={() => (
          <>
            <YesNoQuestion
              name="test"
              label="lorem ipsum ?"
              onChange={onChange}
            />
          </>
        )}
      />
    );
    const oui = getByLabelText(/oui/i);
    oui.click();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("should render error when form validate", () => {
    const onSubmit = jest.fn();
    const { getByText, getByTestId } = render(
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <YesNoQuestion name="test" label="lorem ipsum ?" />
            <button data-testid="next">suivant</button>
          </form>
        )}
      </Form>
    );
    const bt = getByTestId("next");
    bt.click();
    expect(getByText(/ce champ est requis/i)).toBeDefined();
  });

  it("should render validate error when form subm", () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Form
        onSubmit={onSubmit}
        validate={values =>
          values.test === "oui" ? {} : { test: "mauvaise réponse" }
        }
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <YesNoQuestion name="test" label="lorem ipsum ?" />
            <button data-testid="next">suivant</button>
          </form>
        )}
      </Form>
    );
    const non = getByLabelText(/non/i);
    fireEvent.click(non);
    const bt = getByTestId("next");
    bt.click();
    expect(getByText(/mauvaise réponse/i)).toBeDefined();
  });
});
