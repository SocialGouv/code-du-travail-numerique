import { render, screen } from "@testing-library/react";
import React from "react";

import OuSAdresser from "../OuSAdresser";
import classicData from "./mocks/ouSAdresserClassicData.json";
import ressourceWebData from "./mocks/ouSAdresserWebData.json";

describe("<OuSAdresser />", () => {
  it("should render a simple case", () => {
    const { container } = render(
      <OuSAdresser data={classicData} headingLevel={1} />
    );
    expect(container).toMatchSnapshot();
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.textContent).toEqual("Nom du centre");
  });

  it("should render a ressource web component", () => {
    const { container } = render(
      <OuSAdresser data={ressourceWebData} headingLevel={1} />
    );
    expect(container).toMatchSnapshot();
  });
});
