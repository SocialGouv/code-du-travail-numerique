import { render } from "@testing-library/react";
import React from "react";

import Recherche from "../pages/recherche";

jest.mock("../src/piwik", () => ({
  matopush: jest.fn(),
}));

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
