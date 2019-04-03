import React from "react";
import { render } from "react-testing-library";
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
