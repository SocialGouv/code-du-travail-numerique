import React from "react";
import { render } from "@testing-library/react";
import FicheContribution from "../pages/fiche-ministere-travail/[slug]";

describe("<FicheContribution />", () => {
  it("should render with external content", () => {
    const { container } = render(
      <FicheContribution
        query={{
          slug:
            "arret-maladie-pendant-la-periode-dessai-quelles-sont-les-regles"
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render without external content", () => {
    const { container } = render(
      <FicheContribution
        query={{
          slug: "la-periode-dessai-peut-elle-etre-renouvelee"
        }}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
