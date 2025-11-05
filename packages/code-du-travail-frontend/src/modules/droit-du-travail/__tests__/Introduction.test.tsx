import React from "react";
import { render, screen } from "@testing-library/react";
import Introduction from "../Introduction";

describe("<Introduction />", () => {
  it("renders correctly", () => {
    const { container } = render(<Introduction />, {
      legacyRoot: true,
    });
    expect(container).toMatchSnapshot();
  });

  it("displays the main title", () => {
    render(<Introduction />, {
      legacyRoot: true,
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Le droit du travail"
    );
  });

  it("displays the subtitle", () => {
    render(<Introduction />, {
      legacyRoot: true,
    });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Qu'est-ce que le droit du travail ?"
    );
  });

  it("displays the introduction text", () => {
    render(<Introduction />, {
      legacyRoot: true,
    });
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          content.includes("Retrouvez la définition du droit du travail")
        );
      })
    ).toBeInTheDocument();
  });

  it("displays the alert with correct title", () => {
    render(<Introduction />, {
      legacyRoot: true,
    });
    expect(
      screen.getByText("Le droit du travail, ce n'est pas...")
    ).toBeInTheDocument();
  });
});
