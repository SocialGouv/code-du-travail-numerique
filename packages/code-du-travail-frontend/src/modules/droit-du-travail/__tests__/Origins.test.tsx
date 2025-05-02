import React from "react";
import { render, screen } from "@testing-library/react";
import Origins from "../Origins";

// Mock ExpandableCard component
jest.mock("../ExpandableCard", () => {
  return {
    __esModule: true,
    default: ({
      title,
      children,
      iconSrc,
      backgroundColor,
    }: {
      title: string;
      children: React.ReactNode;
      iconSrc: string;
      backgroundColor?: string;
    }) => (
      <div
        data-testid="mock-expandable-card"
        data-title={title}
        data-icon={iconSrc}
        data-bg={backgroundColor}
      >
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    ),
  };
});

describe("<Origins />", () => {
  it("renders correctly", () => {
    const { container } = render(<Origins />);
    expect(container).toMatchSnapshot();
  });

  it("displays the main title", () => {
    render(<Origins />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Quels sont les textes à l'origine du droit du travail ?"
    );
  });

  it("displays the introduction text", () => {
    render(<Origins />);
    expect(
      screen.getByText(
        /Le droit du travail est construit par de nombreux textes juridiques dont les sources sont diverses/
      )
    ).toBeInTheDocument();
  });

  it("renders all ExpandableCard components with correct titles", () => {
    render(<Origins />);

    // Check all the expected card titles
    const expectedTitles = [
      "Les textes internationaux",
      "Les textes européens",
      "La Constitution française",
      "Lois, ordonnances, décrets et arrêtés",
      "Les conventions et accords collectifs",
      "Les usages et les engagements unilatéraux",
      "Le règlement intérieur de l'entreprise",
      "Le contrat de travail",
    ];

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders all ExpandableCard components with correct background color", () => {
    render(<Origins />);

    // Get all expandable cards
    const cards = screen.getAllByTestId("mock-expandable-card");

    // Check that all cards have the correct background color
    cards.forEach((card) => {
      expect(card).toHaveAttribute("data-bg", "var(--background-default-grey)");
    });
  });

  it("renders the conclusion text about jurisprudence", () => {
    render(<Origins />);
    expect(
      screen.getByText(
        /La jurisprudence de la Cour Européenne des droits de l'Homme, de la Cour de justice de l'Union européenne/
      )
    ).toBeInTheDocument();
  });

  it("renders the correct number of ExpandableCard components", () => {
    render(<Origins />);
    const cards = screen.getAllByTestId("mock-expandable-card");
    expect(cards).toHaveLength(8);
  });

  it("renders ExpandableCard components with correct icons", () => {
    render(<Origins />);

    // Check a few specific icons
    const cards = screen.getAllByTestId("mock-expandable-card");

    // Check the first card (Les textes internationaux)
    expect(cards[0]).toHaveAttribute(
      "data-icon",
      "/static/assets/icons/droit-du-travail/texte-internationaux.svg"
    );

    // Check the Constitution card
    const constitutionCard = screen
      .getByText("La Constitution française")
      .closest("[data-testid='mock-expandable-card']");
    expect(constitutionCard).toHaveAttribute(
      "data-icon",
      "/static/assets/icons/droit-du-travail/constitution-francaise.svg"
    );
  });
});
