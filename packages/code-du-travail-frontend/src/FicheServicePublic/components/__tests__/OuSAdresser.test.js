import React from "react";
import { render } from "react-testing-library";
import OuSAdresser from "../OuSAdresser";
import { classicData, ressourceWebData } from "./ouSAdresserData.mock.js";

describe("<OuSAdresser />", () => {
  it("should render a simple case", () => {
    const { container } = render(
      <OuSAdresser data={classicData} headingLevel={1} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render a complex case", () => {
    const { container } = render(
      <OuSAdresser data={ressourceWebData} headingLevel={1} />
    );
    expect(container).toMatchSnapshot();
  });
});
