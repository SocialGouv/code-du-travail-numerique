import React from "react";
import { render } from "react-testing-library";
import Article from "../Article";
import { icons } from "@cdt/ui/";

const articleProps = {
  title:
    "Contrat de travail et formalités d'embauche de l'assistante maternelle",
  sourceType: "Fiche service public",
  date: "26/07/2018"
};

describe("<Article />", () => {
  test("should render", () => {
    const { container } = render(
      <Article {...articleProps} icon={icons.Question}>
        this is an Article
      </Article>
    );
    expect(container).toMatchSnapshot();
  });
});
