import React from "react";
import { render } from "react-testing-library";
import ConventionTexte from "../ConventionTexte";
import texte from "./texte.json";

describe("<ConventionTexte />", () => {
  it("should render", () => {
    const { container } = render(
      <ConventionTexte id={texte.data.id} preloadedTexte={texte} />
    );
    expect(container).toMatchSnapshot();
  });
});
