import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/fragmentConditionne.json";
import { ElementBuilder } from "../ElementBuilder";

describe("Should display element within FragmentConditionne", () => {
  it("should have two different levels of headings", () => {
    const { container } = render(<ElementBuilder data={dataMock} />);
    expect(container).toMatchSnapshot();
  });
});
