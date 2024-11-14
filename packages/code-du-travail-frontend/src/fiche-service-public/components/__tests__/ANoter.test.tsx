import React from "react";
import { render } from "@testing-library/react";
import data from "./mocks/aNoterData.json";
import ANoter from "../ANoter";

describe("<ANoter />", () => {
  it("affiche un encart à noter", () => {
    const { container } = render(<ANoter data={data} headingLevel={0} />);
    expect(container).toMatchSnapshot();
  });
});
