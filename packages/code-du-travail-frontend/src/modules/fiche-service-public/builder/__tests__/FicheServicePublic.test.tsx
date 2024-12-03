import { render } from "@testing-library/react";
import React from "react";

import { FicheServicePublic } from "..";
import ficheDataMock from "./ficheData.mock.json";
import { FicheSPData } from "../type";

describe("<FicheServicePublic />", () => {
  it("should render", () => {
    const { container } = render(
      <FicheServicePublic data={ficheDataMock.children as FicheSPData[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
