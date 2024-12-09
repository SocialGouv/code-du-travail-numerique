import React from "react";
import { render } from "@testing-library/react";
import dataExemple from "./mocks/exempleData.json";
import { FicheSPDataElementWithElementChildren } from "../../type";
import Exemple from "../Exemple";

describe("<Exemple />", () => {
  it("affiche un encart exemple (highlight)", () => {
    const { container } = render(
      <Exemple
        data={dataExemple as FicheSPDataElementWithElementChildren}
        headingLevel={0}
      />
    );
    expect(container.children[0]).toHaveClass("fr-highlight");
  });
});
