import { render, screen } from "@testing-library/react";
import React from "react";

import ServiceEnLigne from "../ServiceEnLigne";
import serviceEnLigneDataMock from "./mocks/serviceEnLigneData.json";
import { FicheSPDataElement } from "../ElementBuilder";

describe("<ServiceEnLigne />", () => {
  it("should render", () => {
    const { container } = render(
      <ServiceEnLigne data={serviceEnLigneDataMock as FicheSPDataElement} />
    );

    const title = screen.getByText("Texte qui se retrouve dans le lien");
    expect(title.tagName).toEqual("A");
    expect(title).toHaveAttribute("href", "url à retoruver dans le lien");
  });
});
