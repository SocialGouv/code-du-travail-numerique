import React from "react";
import { render } from "react-testing-library";
import Accordion from "../Accordion";
import accordionDataMock from "./accordionData.mock.json";

describe("<Accordion />", () => {
  it("should have three H3 and one H4 if heading is set to 1", () => {
    const headingLevel = 1;
    const { container } = render(
      <Accordion data={accordionDataMock} headingLevel={headingLevel} />
    );
    expect(container.querySelectorAll("h3")).toHaveLength(4);
    expect(container.querySelectorAll("h4")).toHaveLength(1);
  });
  it("should render all, siblings included", () => {
    const { container } = render(
      <Accordion data={accordionDataMock} headingLevel={3} />
    );
    expect(container).toMatchSnapshot();
  });
});
