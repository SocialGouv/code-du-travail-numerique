import React from "react";
import { render, screen } from "@testing-library/react";
import Origins from "../Origins";

describe("<Origins />", () => {
  it("renders correctly", () => {
    const { container } = render(<Origins />, {
      legacyRoot: true,
    });
    expect(container).toMatchSnapshot();
  });

  it("displays the main title", () => {
    render(<Origins />, {
      legacyRoot: true,
    });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Quels sont les textes à l'origine du droit du travail ?"
    );
  });

  it("displays the introduction text", () => {
    render(<Origins />, {
      legacyRoot: true,
    });
    expect(
      screen.getByText(
        /Le droit du travail est construit par de nombreux textes juridiques dont les sources sont diverses/
      )
    ).toBeInTheDocument();
  });

  it("renders the conclusion text about jurisprudence", () => {
    render(<Origins />, {
      legacyRoot: true,
    });
    expect(
      screen.getByText(
        /La jurisprudence de la Cour Européenne des droits de l'Homme, de la Cour de justice de l'Union européenne/
      )
    ).toBeInTheDocument();
  });
});
