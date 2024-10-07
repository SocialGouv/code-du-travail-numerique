import { render } from "@testing-library/react";
import React from "react";

import Article from "../Article";

const articleProps = {
  date: "26/07/2018",
  source: { name: "Fiche service public" },
  title:
    "Contrat de travail et formalités d'embauche de l'assistante maternelle",
};

describe("<Article />", () => {
  test("should render", () => {
    const { container } = render(
      <Article {...articleProps}>this is an Article</Article>,
    );
    expect(container).toMatchSnapshot();
  });
});
