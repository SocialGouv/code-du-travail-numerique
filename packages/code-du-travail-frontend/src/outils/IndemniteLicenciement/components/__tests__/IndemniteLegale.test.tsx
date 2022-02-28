import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { loadPublicodes } from "../../../api/LoadPublicodes";
import { PublicodesProvider, PublicodesSimulator } from "../../../publicodes";
import { IndemniteLegale } from "../IndemniteLegale";

const initialValues = {
  anciennete: 28,
  hasSameSalaire: false,
  hasTempsPartiel: false,
  primes: [],
  salaire: 2000,
  salairePeriods: [],
  salaires: [],
};
describe("<IndemniteLegale />", () => {
  it("should render", () => {
    const { container } = render(
      <PublicodesProvider
        rules={loadPublicodes("indemnite-licenciement")}
        simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
      >
        <Form initialValues={initialValues} onSubmit={jest.fn()}>
          {({ form }) => <IndemniteLegale form={form} />}
        </Form>
      </PublicodesProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
