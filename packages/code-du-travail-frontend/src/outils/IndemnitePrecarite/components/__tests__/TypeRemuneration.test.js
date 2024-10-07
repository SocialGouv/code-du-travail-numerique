import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { TypeRemuneration } from "../TypeRemuneration";

describe("<TypeRemuneration />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        render={() => (
          <>
            <TypeRemuneration name="typeRemuneration" />
          </>
        )}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
