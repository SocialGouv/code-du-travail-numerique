import { render } from "@testing-library/react";
import React from "react";

import ServiceEnLigne from "../ServiceEnLigne";
import serviceEnLigneDataMock from "./mocks/serviceEnLigneData.json";

describe("<ServiceEnLigne />", () => {
  it("should render", () => {
    const { container } = render(
      <ServiceEnLigne data={serviceEnLigneDataMock} />
    );
    expect(container).toMatchSnapshot();
  });
});
