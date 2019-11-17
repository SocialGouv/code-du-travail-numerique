import React from "react";
import { render } from "@testing-library/react";
import Recherche from "../pages/recherche.js";

jest.mock("../src/piwik", () => ({
  matopush: jest.fn()
}));

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
