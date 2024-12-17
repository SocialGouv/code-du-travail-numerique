import { render, screen } from "@testing-library/react";
import React from "react";

import OuSAdresser from "../OuSAdresser";
import classicData from "./mocks/ouSAdresserClassicData.json";
import ressourceWebData from "./mocks/ouSAdresserWebData.json";
import { FicheSPDataOuSAdresser } from "../../type";

describe("<OuSAdresser />", () => {
  it("should render a simple case", () => {
    const { container } = render(
      <OuSAdresser
        data={classicData as FicheSPDataOuSAdresser}
        headingLevel={1}
      />
    );
    expect(container).toMatchSnapshot();
    const h3 = screen.getByRole("heading", { level: 3 });
    expect(h3.textContent).toEqual("Nom du centre");
  });

  it("should render a ressource web component", () => {
    const { container } = render(
      <OuSAdresser
        data={ressourceWebData as FicheSPDataOuSAdresser}
        headingLevel={0}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
