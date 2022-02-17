import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { loadPublicodes } from "../../../api/LoadPublicodes";
import { PublicodesProvider, PublicodesSimulator } from "../../../publicodes";
import { StepIndemnite } from "../Indemnite";

const initialValues = {
  anciennete: 15 / 12,
  dateNotification: "2018-10-22",
  hasTempsPartiel: false,
  inaptitude: true,
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
};

describe("<StepIndemnite />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ form }) => (
          <PublicodesProvider
            rules={loadPublicodes("indemnite-licenciement")}
            simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
          >
            <StepIndemnite form={form} />
          </PublicodesProvider>
        )}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
