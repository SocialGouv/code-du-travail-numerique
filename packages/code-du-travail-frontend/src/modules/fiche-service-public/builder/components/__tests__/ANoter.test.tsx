import React from "react";
import { render } from "@testing-library/react";
import data from "./mocks/aNoterData.json";
import ANoter from "../ANoter";
import { FicheSPDataElementWithElementChildren } from "../../type";

describe("<ANoter />", () => {
  it("affiche un encart à noter (alert)", () => {
    const { container } = render(
      <ANoter
        data={data as FicheSPDataElementWithElementChildren}
        headingLevel={0}
      />
    );
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toHaveClass("fr-alert--info");
  });
});
