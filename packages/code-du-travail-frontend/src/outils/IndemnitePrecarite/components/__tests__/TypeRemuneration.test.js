import React from "react";
import { render } from "../../../../../test/utils";
import { TypeRemuneration } from "../TypeRemuneration";
import { Form } from "react-final-form";

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
      />
    );
    expect(container).toMatchSnapshot();
  });
});
