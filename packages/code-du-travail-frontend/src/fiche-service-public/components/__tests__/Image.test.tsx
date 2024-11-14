import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/image.json";
import { ElementBuilder, FicheSPDataElement } from "../ElementBuilder";

describe("Image", () => {
  it("should display image and caption", () => {
    const { container } = render(
      <ElementBuilder data={dataMock as FicheSPDataElement} headingLevel={2} />
    );
    expect(container).toMatchSnapshot();
  });
});
