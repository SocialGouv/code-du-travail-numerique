import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/imageData.json";
import { ImageComponent } from "../ImageComponent";
import { FicheSPDataImage } from "../../type";

describe("Image", () => {
  it("should display image and caption", () => {
    const { container } = render(
      <ImageComponent data={dataMock as FicheSPDataImage} headingLevel={2} />
    );
    expect(container).toMatchSnapshot();
  });
});
