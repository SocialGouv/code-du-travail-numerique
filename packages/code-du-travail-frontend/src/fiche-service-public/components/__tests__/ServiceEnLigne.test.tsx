import { render, screen } from "@testing-library/react";
import React from "react";

import ServiceEnLigne from "../ServiceEnLigne";
import serviceEnLigneDataMock from "./mocks/serviceEnLigneData.json";
import { FicheSPDataServiceEnLigne } from "../../type";

describe("<ServiceEnLigne />", () => {
  it("should render", () => {
    render(
      <ServiceEnLigne
        data={serviceEnLigneDataMock as FicheSPDataServiceEnLigne}
      />
    );

    const title = screen.getByText("Texte qui se retrouve dans le lien");
    expect(title.tagName).toEqual("A");
    expect(title).toHaveAttribute("href", "url à retoruver dans le lien");
  });
});
