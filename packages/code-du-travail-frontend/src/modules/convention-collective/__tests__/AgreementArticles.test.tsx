import React from "react";
import { render, screen } from "@testing-library/react";
import { AgreementArticles } from "../AgreementArticles";
import { ElasticAgreement } from "@socialgouv/cdtn-types";

// Mock the AccordionWithAnchor component
jest.mock("../../common/AccordionWithAnchor", () => ({
  AccordionWithAnchor: ({ items, "data-testid": testId }) => (
    <div data-testid={testId || "mock-accordion"}>
      {items.map((item, i) => (
        <div key={i} data-testid="accordion-item">
          <h3>{item.title}</h3>
          <div data-testid="accordion-content">{item.content}</div>
        </div>
      ))}
    </div>
  ),
}));

describe("AgreementArticles", () => {
  const containerId = "container-123";

  it("should render nothing when articlesByTheme is undefined", () => {
    const { container } = render(
      <AgreementArticles articlesByTheme={[]} containerId={containerId} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render nothing when articlesByTheme is empty", () => {
    const { container } = render(
      <AgreementArticles articlesByTheme={[]} containerId={containerId} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render accordion with articles by theme", () => {
    const articlesByTheme: ElasticAgreement["articlesByTheme"] = [
      {
        bloc: "1", // Salaires minima hiérarchiques
        articles: [
          {
            id: "art-1",
            title: "Article 1",
            section: "Section 1",
            cid: "cid-1",
          },
          {
            id: "art-2",
            title: "Article 2",
            section: "Section 2",
            cid: "cid-2",
          },
        ],
      },
      {
        bloc: "2", // Classifications
        articles: [
          {
            id: "art-3",
            title: "Article 3",
            section: "Section 3",
            cid: "cid-3",
          },
        ],
      },
    ];

    render(
      <AgreementArticles
        articlesByTheme={articlesByTheme}
        containerId={containerId}
      />
    );

    expect(
      screen.getByTestId("agreement-articles-container")
    ).toBeInTheDocument();
    expect(screen.getByTestId("agreement-articles-title")).toHaveTextContent(
      "Articles de la convention collective"
    );
    expect(
      screen.getByTestId("agreement-articles-description")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("agreement-articles-highlight")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("agreement-articles-accordion")
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("accordion-item")).toHaveLength(2);

    // Verify the titles match the BLOCKS labels for the given bloc ids
    expect(
      screen.getByText("Salaires minima hiérarchiques")
    ).toBeInTheDocument();
    expect(screen.getByText("Classifications")).toBeInTheDocument();
  });

  it("should handle important blocks correctly", () => {
    // Use bloc 14 which has important: true
    const articlesByTheme: ElasticAgreement["articlesByTheme"] = [
      {
        bloc: "14", // Risques professionnels: prévention (important)
        articles: [
          { id: "art-1", title: "Article 1", section: "Section 1", cid: "cid" },
        ],
      },
    ];

    const { container } = render(
      <AgreementArticles
        articlesByTheme={articlesByTheme}
        containerId={containerId}
      />
    );

    // Render the component
    expect(
      screen.getByTestId("agreement-articles-container")
    ).toBeInTheDocument();

    // Check title
    expect(
      screen.getByText("Risques professionnels : prévention")
    ).toBeInTheDocument();

    // Check the important notice is displayed (via the mock)
    const content = screen.getByTestId("accordion-content");
    expect(content).toBeInTheDocument();
    expect(screen.getByText("Important")).toBeInTheDocument();
  });
});
