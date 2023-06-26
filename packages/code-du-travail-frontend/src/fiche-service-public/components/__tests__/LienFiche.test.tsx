import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/lienFiche.json";
import { ElementBuilder } from "../ElementBuilder";

describe("LienFiche", () => {
  it("should display link", () => {
    const { container } = render(<ElementBuilder data={dataMock} />);
    expect(container).toMatchSnapshot();
  });
});
