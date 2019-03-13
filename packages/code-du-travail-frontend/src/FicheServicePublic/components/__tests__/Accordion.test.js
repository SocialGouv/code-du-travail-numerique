import React from "react";
import { render } from "react-testing-library";
import Accordion from "../Accordion";
import accordionDataMock from "./accordionData.mock.json";

describe("<Accordion />", () => {
  it("should have two different levels of headings", () => {
    const { container } = render(
      <Accordion data={accordionDataMock} headingLevel={0} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render all, siblings included", () => {
    const { container } = render(
      <Accordion data={accordionDataMock} headingLevel={3} />
    );
    expect(container).toMatchSnapshot();
  });
});
