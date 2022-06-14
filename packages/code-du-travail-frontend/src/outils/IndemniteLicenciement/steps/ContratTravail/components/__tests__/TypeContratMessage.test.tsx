import { render } from "@testing-library/react";
import React from "react";
import TypeContratMessage from "../TypeContratMessage";

describe("<TypeContratMessage />", () => {
  it("should render", () => {
    expect(render(<TypeContratMessage />)).toBeTruthy();
  });
});
