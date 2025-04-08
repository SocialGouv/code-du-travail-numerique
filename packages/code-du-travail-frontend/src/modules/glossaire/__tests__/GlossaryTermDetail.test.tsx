import React from "react";
import { render, screen } from "@testing-library/react";
import { GlossaryTermDetail } from "../GlossaryTermDetail";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

// Mock des modules externes
jest.mock("next/link", () => {
  const MockNextLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockNextLink.displayName = "MockNextLink";
  return MockNextLink;
});

jest.mock("@socialgouv/cdtn-utils", () => ({
  getRouteBySource: jest.fn().mockReturnValue("glossaire"),
  SOURCES: {
    GLOSSARY: "glossary",
  },
}));

jest.mock("../../layout/ContainerWithBreadcrumbs", () => ({
  ContainerWithBreadcrumbs: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="breadcrumbs-container">{children}</div>
  ),
}));

jest.mock("../../layout/Container", () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

describe("GlossaryTermDetail", () => {
  it("should render term and definition", () => {
    render(
      <GlossaryTermDetail term="Salaire" definition="Rémunération du travail" />
    );

    expect(screen.getByText("Salaire")).toBeInTheDocument();
    expect(screen.getByText("Rémunération du travail")).toBeInTheDocument();
    expect(screen.getByText("Définition")).toBeInTheDocument();

    // La section Sources ne devrait pas apparaître si aucune référence n'est fournie
    expect(screen.queryByText("Sources")).not.toBeInTheDocument();
  });

  it("should render references when provided", () => {
    const mockReferences = [
      "https://www.example.com/ref1",
      "https://www.example.com/ref2",
    ];

    render(
      <GlossaryTermDetail
        term="Salaire"
        definition="Rémunération du travail"
        references={mockReferences}
      />
    );

    expect(screen.getByText("Sources")).toBeInTheDocument();
    expect(
      screen.getByText("https://www.example.com/ref1")
    ).toBeInTheDocument();
    expect(
      screen.getByText("https://www.example.com/ref2")
    ).toBeInTheDocument();

    // Vérifier que les liens sont corrects
    const links = screen.getAllByRole("link");
    const referenceLinks = links.filter((link) =>
      link.getAttribute("href")?.startsWith("https://www.example.com/")
    );
    expect(referenceLinks).toHaveLength(2);
  });

  it("should render back link to glossary", () => {
    render(
      <GlossaryTermDetail term="Salaire" definition="Rémunération du travail" />
    );

    const backLink = screen.getByText("Glossaire");
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest("a")).toHaveAttribute("href", "/glossaire");
  });
});
