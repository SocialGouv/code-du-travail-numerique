import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
    const { container, getAllByText } = render(
      <ConventionTexte id={texte.data.id} preloadedTexte={texte} />
    );
    const [articleLink] = getAllByText(/Titre Ier : Dispositions générales/i);
    fireEvent.click(articleLink);
    fireEvent.scroll(container, { target: { scrollY: 1000 } });

    expect(container).toMatchSnapshot();
  });
});
