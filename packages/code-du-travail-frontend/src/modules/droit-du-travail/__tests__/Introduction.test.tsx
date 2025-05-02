import React from "react";
import { render, screen } from "@testing-library/react";
import Introduction from "../Introduction";

// Mock DSFR Alert component
jest.mock("@codegouvfr/react-dsfr/Alert", () => {
  return {
    __esModule: true,
    default: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => (
      <div data-testid="mock-alert">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    ),
  };
});

describe("<Introduction />", () => {
  it("renders correctly", () => {
    const { container } = render(<Introduction />);
    expect(container).toMatchSnapshot();
  });

  it("displays the main title", () => {
    render(<Introduction />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Le droit du travail"
    );
  });

  it("displays the subtitle", () => {
    render(<Introduction />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Qu'est-ce que le droit du travail ?"
    );
  });

  it("displays the introduction text", () => {
    render(<Introduction />);
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
    render(<Introduction />);
    expect(
      screen.getByText("Le droit du travail, ce n'est pas...")
    ).toBeInTheDocument();
  });

  it("displays the alert with correct description", () => {
    render(<Introduction />);
    // Vérifier que le texte de description est passé au composant Alert mocké
    const alertElement = screen.getByTestId("mock-alert");
    const descriptionElement = alertElement.querySelector("p");
    expect(descriptionElement).toHaveTextContent(
      /Le droit du travail ne concerne pas les travailleurs qui sont soumis au droit public/
    );
  });
});
