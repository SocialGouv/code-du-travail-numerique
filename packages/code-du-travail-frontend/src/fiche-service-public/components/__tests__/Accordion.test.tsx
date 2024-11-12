import React from "react";
import { render } from "@testing-library/react";
import Accordion from "../Accordion";
import accordionDataMock from "./mocks/accordionData.json";
import {FicheSPData, FicheSPDataElement} from "../ElementBuilder";

describe("<Accordion />", () => {
  it("should have two different levels of headings", () => {
    const { container } = render(
      <Accordion data={accordionDataMock as FicheSPDataElement} headingLevel={0} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render all, siblings included", () => {
    const { container } = render(
      <Accordion data={accordionDataMock as FicheSPDataElement} headingLevel={3} />
    );
    expect(container).toMatchSnapshot();
  });
});
