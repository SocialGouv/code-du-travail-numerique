import React from "react";
import { render } from "@testing-library/react";
import { GlossaryList } from "../GlossaryList";
import { GlossaryItem } from "../types";

describe("GlossaryList", () => {
  it("should render the glossary with navigation and terms", () => {
    const glossary: GlossaryItem[] = [
      {
        term: "Accord",
        slug: "accord",
        definition: "Définition",
      } as GlossaryItem,
      {
        term: "Bénéfice",
        slug: "benefice",
        definition: "Définition",
      } as GlossaryItem,
    ];

    const { getByRole, getByText, getAllByRole } = render(
      <GlossaryList glossary={glossary} />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent("Glossaire");
    expect(
      getByText(/Les définitions de ce glossaire, disponibles en surbrillance/i)
    ).toBeInTheDocument();

    // Vérifier que la navigation est rendue avec les bonnes lettres
    expect(getByRole("link", { name: "A" })).toHaveAttribute("href", "#A");
    expect(getByRole("link", { name: "B" })).toHaveAttribute("href", "#B");

    // Vérifier que les termes sont rendus
    const headers = getAllByRole("heading", { level: 2 });
    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveAttribute("id", "A");
    expect(headers[1]).toHaveAttribute("id", "B");
    expect(getByRole("link", { name: "Accord" })).toHaveAttribute(
      "href",
      "/glossaire/accord"
    );
    expect(getByRole("link", { name: "Bénéfice" })).toHaveAttribute(
      "href",
      "/glossaire/benefice"
    );
  });
});
