import React from "react";
import { render } from "react-testing-library";
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

  it("should render error", () => {
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
    const bt = getByText(/validate/i);
    bt.click();
    expect(getByText(/ce champ est requis/i)).toBeDefined();
  });
});
