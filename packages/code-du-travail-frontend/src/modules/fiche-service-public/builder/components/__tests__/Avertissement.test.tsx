import React from "react";
import { render } from "@testing-library/react";
import data from "./mocks/avertissementData.json";
import Avertissement from "../Avertissement";
import { FicheSPDataAvertissement } from "../../type";

describe("<Avertissement />", () => {
  it("affiche un avertissement", () => {
    const { container } = render(
      <Avertissement data={data as FicheSPDataAvertissement} headingLevel={0} />
    );
    expect(container).toMatchSnapshot();
  });
});
