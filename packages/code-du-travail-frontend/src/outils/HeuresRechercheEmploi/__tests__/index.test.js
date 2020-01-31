import React from "react";
import { render } from "@testing-library/react";
import { HeuresRechercheEmploi } from "..";

describe("<HeuresRechercheEmploi />", () => {
  it("should render", () => {
    const { container } = render(
      <HeuresRechercheEmploi title="Heures pour recherche d'emploi" />
    );
    expect(container).toMatchSnapshot();
  });
});
