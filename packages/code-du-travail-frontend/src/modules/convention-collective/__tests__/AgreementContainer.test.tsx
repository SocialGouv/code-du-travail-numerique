import React from "react";
import { render, screen } from "@testing-library/react";
import { AgreementContainer } from "../AgreementContainer";
import { ElasticAgreement } from "@socialgouv/cdtn-types";

// Mock all the child components
jest.mock("../../layout/feedback", () => ({
  Feedback: () => <div data-testid="mock-feedback">Feedback Component</div>,
}));

// Mock du Breadcrumb
jest.mock("@codegouvfr/react-dsfr/Breadcrumb", () => {
  const Breadcrumb = ({ currentPageLabel, segments, className }) => (
    <nav data-testid="mock-breadcrumb" className={className}>
      {segments.map((segment, i) => (
        <span key={i} data-testid="breadcrumb-segment">
          {segment.label}
        </span>
      ))}
      <span data-testid="breadcrumb-current">{currentPageLabel}</span>
    </nav>
  );
  Breadcrumb.displayName = "Breadcrumb";
  return { __esModule: true, default: Breadcrumb };
});

// Autres mocks
jest.mock("../FrequentQuestions", () => ({
  FrequentQuestions: ({ answers }) => (
    <div data-testid="mock-frequent-questions">
      {answers ? `Has ${answers.length} answer groups` : "No answers"}
    </div>
  ),
}));

jest.mock("../AgreementArticles", () => ({
  AgreementArticles: ({ articlesByTheme, containerId }) => (
    <div data-testid="mock-agreement-articles">
      {articlesByTheme
        ? `Has articles for container ${containerId}`
        : "No articles"}
    </div>
  ),
}));

jest.mock("../LegiFranceSearch", () => ({
  LegiFranceSearch: ({ idcc, shortTitle }) => (
    <div data-testid="mock-agreement-search">
      Search for {shortTitle} (IDCC: {idcc})
    </div>
  ),
}));

jest.mock("../../common/RelatedItems", () => ({
  RelatedItems: ({ relatedItems }) => (
    <div data-testid="mock-related-items">
      {relatedItems.length} related items
    </div>
  ),
}));

jest.mock("../../common/Share", () => ({
  Share: ({ title, metaDescription }) => (
    <div data-testid="mock-share">Share {title}</div>
  ),
}));

// Mock des fonctions de date pour éviter les problèmes liés au formatage de date
jest.mock("date-fns", () => ({
  format: jest.fn().mockReturnValue("01/01/2022"),
  parseISO: jest.fn().mockReturnValue(new Date("2022-01-01")),
}));

jest.mock("date-fns/locale/fr", () => ({}));

describe("AgreementContainer", () => {
  // Mock data avec toutes les propriétés requises
  const mockAgreement: ElasticAgreement = {
    id: "agreement-123",
    shortTitle: "Test Agreement",
    title: "Full Test Agreement Title",
    num: "1234",
    url: "https://legifrance.gouv.fr/test",
    date_publi: "2022-01-01",
    breadcrumbs: [{ label: "Category", slug: "/category", position: 1 }],
    metaDescription: "Test description",
    answers: [{ theme: "Theme", answers: [] }],
    articlesByTheme: [
      {
        bloc: "1", // String instead of number
        articles: [
          {
            id: "article-id",
            title: "Article Title",
            section: "Section Name",
            cid: "cid-value",
          },
        ],
      },
    ],
    cdtnId: "cdtn-id",
    description: "Test description",
    contributions: false,
    effectif: "effectif",
    excludeFromSearch: false,
    isPublished: true,
    source: "conventions_collectives",
    slug: "slug",
    mtime: "2022-01-01",
    refs: [],
    synonymes: [],
    text: "Test text",
  };

  const mockRelatedItems = [
    { title: "Related", items: [{ title: "Item 1", url: "/item1" }] },
  ] as any;

  it("should render the agreement container with all components", () => {
    // Utiliser un test plus simple qui vérifie les éléments principaux sans trop
    // s'appuyer sur les détails d'implémentation
    render(
      <AgreementContainer
        agreement={mockAgreement}
        relatedItems={mockRelatedItems}
      />
    );

    // Vérifier que le mock du Breadcrumb est rendu
    expect(screen.getByTestId("mock-breadcrumb")).toBeInTheDocument();

    // Vérifier le titre principal (h1)
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Test Agreement");

    // Vérifier que les composants principaux sont rendus
    expect(screen.getByTestId("mock-frequent-questions")).toBeInTheDocument();
    expect(screen.getByTestId("mock-agreement-articles")).toBeInTheDocument();
    expect(screen.getByTestId("mock-agreement-search")).toBeInTheDocument();
    expect(screen.getByTestId("mock-related-items")).toBeInTheDocument();
    expect(screen.getByTestId("mock-share")).toBeInTheDocument();
    expect(screen.getByTestId("mock-feedback")).toBeInTheDocument();

    // Utiliser data-testid pour le lien vers Légifrance au lieu du texte
    const legifranceLink = screen.getByTestId("agreement-legifrance-link");
    expect(legifranceLink).toBeInTheDocument();
    expect(legifranceLink).toHaveAttribute(
      "href",
      "https://legifrance.gouv.fr/test"
    );
  });

  it("should render message when convention collective is not treated by services", () => {
    const agreementWithoutUrl = {
      ...mockAgreement,
      url: undefined,
    };

    render(
      <AgreementContainer
        agreement={agreementWithoutUrl}
        relatedItems={mockRelatedItems}
      />
    );

    expect(
      screen.getByText(/Cette convention collective n'est pas traitée/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-agreement-search")
    ).not.toBeInTheDocument();
  });
});
