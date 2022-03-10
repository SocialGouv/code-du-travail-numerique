import { render } from "@testing-library/react";
import React from "react";

import Recherche from "../pages/recherche.js";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
