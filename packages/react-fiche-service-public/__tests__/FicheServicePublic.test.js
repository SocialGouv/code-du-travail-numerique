import React from "react";
import { render } from "@testing-library/react";
import FicheServicePublic from "../src";
import ficheDataMock from "./ficheData.mock.json";

describe("<FicheServicePublic />", () => {
  it("should render", () => {
    const { container } = render(
      <FicheServicePublic data={ficheDataMock.children} />
    );
    expect(container).toMatchSnapshot();
  });
});
