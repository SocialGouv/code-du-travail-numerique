import React from "react";
import { render } from "../../../test/utils";
import Article from "../Article";
import { icons } from "@cdt/ui-old/";

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
