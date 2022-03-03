import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { MatomoActionEvent } from "../../../lib";
import { StepInformations } from "../StepInformations";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = render(
      <Form initialValues={{}} onSubmit={jest.fn()}>
        {({ form }) => (
          <StepInformations
            actionEvent={MatomoActionEvent.PREAVIS_DEMISSION}
            form={form}
          />
        )}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
