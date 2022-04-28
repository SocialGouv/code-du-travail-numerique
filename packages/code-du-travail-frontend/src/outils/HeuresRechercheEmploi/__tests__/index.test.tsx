import { render } from "@testing-library/react";
import React from "react";

import { HeuresRechercheEmploi } from "..";

describe("<HeuresRechercheEmploi />", () => {
  it("should render", () => {
    const { container } = render(
      <HeuresRechercheEmploi
        title="Heures d'absence pour rechercher un emploi"
        displayTitle="Heures pour recherche d'emploi"
        icon=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
