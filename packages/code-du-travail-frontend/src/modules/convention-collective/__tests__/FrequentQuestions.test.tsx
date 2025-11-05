import React from "react";
import { render, screen } from "@testing-library/react";
import { FrequentQuestions } from "../FrequentQuestions";
import { SOURCES, getRouteBySource } from "@socialgouv/cdtn-utils";
import { ElasticAgreement } from "@socialgouv/cdtn-types";

// Mock the external dependencies
jest.mock("@socialgouv/cdtn-utils", () => ({
  SOURCES: {
    CONTRIBUTIONS: "contributions",
  },
  getRouteBySource: jest.fn().mockReturnValue("contributions"),
}));

// Mock the AccordionWithAnchor component
jest.mock("../../common/AccordionWithAnchor", () => ({
  AccordionWithAnchor: ({ items, titleAs, "data-testid": testId }) => (
    <div data-testid={testId || "mock-accordion"} data-title-as={titleAs}>
      {items.map((item, i) => (
        <div key={i} data-testid="accordion-item">
          <h3>{item.title}</h3>
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  ),
}));

describe("FrequentQuestions", () => {
  it("should render nothing when answers is undefined", () => {
    const { container } = render(<FrequentQuestions answers={[]} />, {
      legacyRoot: true,
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("should render nothing when answers is empty", () => {
    const { container } = render(<FrequentQuestions answers={[]} />, {
      legacyRoot: true,
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("should render with answers", () => {
    const answers: ElasticAgreement["answers"] = [
      {
        theme: "Theme 1",
        answers: [
          {
            slug: "slug-1",
            question: "Question 1",
            questionIndex: 1,
            theme: "Theme 1",
          },
          {
            slug: "slug-2",
            question: "Question 2",
            questionIndex: 2,
            theme: "Theme 1",
          },
        ],
      },
      {
        theme: "Theme 2",
        answers: [
          {
            slug: "slug-3",
            question: "Question 3",
            questionIndex: 3,
            theme: "Theme 2",
          },
        ],
      },
    ];

    render(<FrequentQuestions answers={answers} />, {
      legacyRoot: true,
    });

    // Test that the container is rendered
    expect(
      screen.getByTestId("frequent-questions-container")
    ).toBeInTheDocument();
    expect(screen.getByTestId("frequent-questions-title")).toHaveTextContent(
      "Questions-réponses fréquentes"
    );
    expect(
      screen.getByTestId("frequent-questions-description")
    ).toBeInTheDocument();

    // Test that the accordion is rendered
    expect(
      screen.getByTestId("frequent-questions-accordion")
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("accordion-item")).toHaveLength(2);
    expect(screen.getByText("Theme 1")).toBeInTheDocument();
    expect(screen.getByText("Theme 2")).toBeInTheDocument();

    // Check that the accordion is using the correct titleAs prop
    expect(screen.getByTestId("frequent-questions-accordion")).toHaveAttribute(
      "data-title-as",
      "h3"
    );

    // Check that links are present with correct hrefs
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/contributions/slug-1");
    expect(links[1]).toHaveAttribute("href", "/contributions/slug-2");
    expect(links[2]).toHaveAttribute("href", "/contributions/slug-3");
  });
});
