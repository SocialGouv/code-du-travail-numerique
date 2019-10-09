import React from "react";
import { render } from "../../../../../test/utils";
import { TypeContrat } from "../TypeContrat";
import { Form } from "react-final-form";

describe("<TypeContrat />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        render={() => (
          <>
            <TypeContrat name="contrat" />
          </>
        )}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
