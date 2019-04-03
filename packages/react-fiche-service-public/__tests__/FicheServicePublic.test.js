import React from "react";
import { render } from "react-testing-library";
import FicheServicePublic from "../src";
import ficheDataMock from "./ficheData.mock.json";

describe("<FicheServicePublic />", () => {
  it("should render", () => {
    const { container } = render(<FicheServicePublic data={ficheDataMock.$} />);
    expect(container).toMatchSnapshot();
  });
});
