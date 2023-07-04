import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/image.json";
import { ElementBuilder } from "../ElementBuilder";

describe("Image", () => {
  it("should display image and caption", () => {
    const { container } = render(<ElementBuilder data={dataMock} />);
    expect(container).toMatchSnapshot();
  });
});
