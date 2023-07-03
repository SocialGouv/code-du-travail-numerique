import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/fragmentConditionne.json";
import { ElementBuilder } from "../ElementBuilder";

describe("FragmentConditionne", () => {
  it("Should display element within", () => {
    const { container } = render(<ElementBuilder data={dataMock} />);
    expect(container).toMatchSnapshot();
  });
});
