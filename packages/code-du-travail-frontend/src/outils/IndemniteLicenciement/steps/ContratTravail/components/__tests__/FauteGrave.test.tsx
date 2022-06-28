import { render } from "@testing-library/react";
import React from "react";
import FauteGrave from "../FauteGrave";

describe("<FauteGrave />", () => {
  it("should render", () => {
    expect(render(<FauteGrave />)).toBeTruthy();
  });
});
