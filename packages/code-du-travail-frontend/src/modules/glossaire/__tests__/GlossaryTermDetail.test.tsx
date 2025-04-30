import React from "react";
import { getByRole, render } from "@testing-library/react";
import { GlossaryTermDetail } from "../GlossaryTermDetail";

jest.mock("../../layout/ContainerWithBreadcrumbs", () => ({
  ContainerWithBreadcrumbs: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="breadcrumbs-container">{children}</div>
  ),
}));

describe("GlossaryTermDetail", () => {
  it("should render term and definition", () => {
    const { getByText, queryByText, getByRole } = render(
      <GlossaryTermDetail term="Salaire" definition="Rémunération du travail" />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Salaire");
    expect(getByText("Définition")).toBeInTheDocument();
    expect(getByText("Rémunération du travail")).toBeInTheDocument();
    expect(queryByText("Sources")).not.toBeInTheDocument();
  });

  it("should render references when provided", () => {
    const mockReferences = [
      "https://www.example.com/ref1",
      "https://www.example.com/ref2",
    ];

    const { getByText, getAllByRole } = render(
      <GlossaryTermDetail
        term="Salaire"
        definition="Rémunération du travail"
        references={mockReferences}
      />
    );

    expect(getByText("Sources")).toBeInTheDocument();
    const sourceListItems = getAllByRole("listitem");
    expect(sourceListItems).toHaveLength(2);
    expect(sourceListItems[0]).toHaveTextContent(
      "https://www.example.com/ref1"
    );
    expect(getByRole(sourceListItems[0], "link")).toHaveAttribute(
      "href",
      "https://www.example.com/ref1"
    );
    expect(sourceListItems[1]).toHaveTextContent(
      "https://www.example.com/ref2"
    );
    expect(getByRole(sourceListItems[1], "link")).toHaveAttribute(
      "href",
      "https://www.example.com/ref2"
    );
  });

  it("should render back link to glossary", () => {
    const { getByRole } = render(
      <GlossaryTermDetail term="Salaire" definition="Rémunération du travail" />
    );

    const backLink = getByRole("link", { name: "Glossaire" });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/glossaire");
  });
});
