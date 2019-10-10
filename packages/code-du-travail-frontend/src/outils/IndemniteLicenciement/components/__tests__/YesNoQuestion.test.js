import React from "react";
import { render, fireEvent } from "@wrapped-testing-library/react";
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
    const { getByText } = render(
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <YesNoQuestion name="test" label="lorem ipsum ?" />
            <button>validate</button>
          </form>
        )}
      </Form>
    );
    const non = getByText(/validate/i);
    fireEvent.click(non);
    expect(getByText(/ce champ est requis/i)).toBeDefined();
  });

  it("should render error when radio change", () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByText } = render(
      <Form
        onSubmit={onSubmit}
        validate={values =>
          values.test === "oui" ? {} : { test: "mauvaise réponse" }
        }
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <YesNoQuestion name="test" label="lorem ipsum ?" />
            <button>validate</button>
          </form>
        )}
      </Form>
    );
    const non = getByLabelText(/non/i);
    fireEvent.click(non);
    expect(getByText(/mauvaise réponse/i)).toBeDefined();
  });
});
