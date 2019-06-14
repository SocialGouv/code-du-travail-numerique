import React from "react";
import { render, fireEvent } from "react-testing-library";
import ConventionTexte from "../ConventionTexte";
import texte from "./texte.json";

describe("<ConventionTexte />", () => {
  it("should render", () => {
    const { container } = render(
      <ConventionTexte id={texte.data.id} preloadedTexte={texte} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should let you click on a toc item", () => {
    const { container, getByText } = render(
      <ConventionTexte id={texte.data.id} preloadedTexte={texte} />
    );
    const articleLink = getByText(/Titre Ier : Dispositions générales/);
    fireEvent.click(articleLink);

    expect(container).toMatchSnapshot();
  });
});
