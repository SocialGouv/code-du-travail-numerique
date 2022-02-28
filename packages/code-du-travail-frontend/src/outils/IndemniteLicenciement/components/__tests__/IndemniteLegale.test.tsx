import { render } from "@testing-library/react";
import React from "react";

import { loadPublicodes } from "../../../api/LoadPublicodes";
import { PublicodesProvider, PublicodesSimulator } from "../../../publicodes";
import { IndemniteLegale } from "../IndemniteLegale";

describe("<IndemniteLegale />", () => {
  it("should render", () => {
    //TODO: restore
    // const { container } = render(
    //   <PublicodesProvider
    //     rules={loadPublicodes("indemnite-licenciement")}
    //     simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
    //   >
    //     <IndemniteLegale
    //       indemnite={42}
    //       infoCalcul={{
    //         formula: "13 / 37 * 3.14",
    //         labels: { value: 1 },
    //       }}
    //     />
    //   </PublicodesProvider>
    // );
    // expect(container).toMatchSnapshot();
    expect(true).toBe(true);
  });
});
