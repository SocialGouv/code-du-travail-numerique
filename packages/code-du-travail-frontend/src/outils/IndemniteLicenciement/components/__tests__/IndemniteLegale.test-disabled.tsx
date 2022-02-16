import { render } from "@testing-library/react";
import React from "react";

import { loadPublicodes } from "../../../api/LoadPublicodes";
import {
  PublicodesProvider,
  PublicodesSupportedSimulator,
} from "../../../publicodes";
import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    const { container } = render(
      <PublicodesProvider
        rules={loadPublicodes("indemnite-licenciement")}
        targetRule="contrat salarié . indemnité de licenciement"
        simulator={PublicodesSupportedSimulator.IndemniteLicenciement}
      >
        <IndemniteLegale
          indemnite={42}
          infoCalcul={{
            formula: "13 / 37 * 3.14",
            labels: { value: 1 },
          }}
        />
      </PublicodesProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
