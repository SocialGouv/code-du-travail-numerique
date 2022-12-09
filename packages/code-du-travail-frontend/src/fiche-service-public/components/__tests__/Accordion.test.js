import React from "react";
import { render } from "@testing-library/react";
import Accordion from "../Accordion";
import accordionDataMock from "./mocks/accordionData.json";

describe("<Accordion />", () => {
  it("should have two different levels of headings", () => {
    const { container } = render(
      <Accordion data={accordionDataMock} headingLevel={0} />,
    );
    expect(container).toMatchSnapshot();
  });
  it("should render all, siblings included", () => {
    const { container } = render(
      <Accordion data={accordionDataMock} headingLevel={3} />,
    );
    expect(container).toMatchSnapshot();
  });
});
