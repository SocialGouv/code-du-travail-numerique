import React from "react";
import { render, fireEvent } from "react-testing-library";
import ConventionTexte from "../ConventionTexte";
import texte from "./texte.json"; // sample text, mock the call made in ConventionText
// with that as an answer

describe("<ConventionTexte />", () => {
  it("should render", () => {
    const { container } = render(<ConventionTexte id={texte.data.id} />);
    expect(container).toMatchSnapshot();
  });

  it("should let you click on a toc item", () => {
    const { container, getByText } = render(
      <ConventionTexte id={texte.data.id} />
    );
    const articleLink = getByText(/Titre Ier : Dispositions générales/);
    fireEvent.click(articleLink);
    fireEvent.scroll(container, { target: { scrollY: 1000 } });

    expect(container).toMatchSnapshot();
  });
});
