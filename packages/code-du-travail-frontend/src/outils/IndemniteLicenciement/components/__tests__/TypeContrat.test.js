import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { TypeContrat } from "../TypeContrat";

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
