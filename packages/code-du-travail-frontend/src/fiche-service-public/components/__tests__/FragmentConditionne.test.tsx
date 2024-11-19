import React from "react";
import { render } from "@testing-library/react";
import dataMock from "./mocks/fragmentConditionne.json";
import { ElementBuilder } from "../ElementBuilder";
import { FicheSPData } from "../../type";

describe("FragmentConditionne", () => {
  it("Should display element within", () => {
    const { container } = render(
      <ElementBuilder data={dataMock as FicheSPData} />
    );
    expect(container).toMatchSnapshot();
  });
});
