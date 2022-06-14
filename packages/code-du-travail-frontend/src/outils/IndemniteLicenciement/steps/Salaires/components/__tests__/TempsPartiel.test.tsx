import { render } from "@testing-library/react";
import React from "react";
import TempsPartiel from "../TempsPartiel";

describe("<TempsPartiel />", () => {
  it("should render", () => {
    expect(render(<TempsPartiel />)).toBeTruthy();
  });
});
