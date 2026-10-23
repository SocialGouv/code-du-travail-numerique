import { render, screen } from "@testing-library/react";
import React from "react";
import { NewsList } from "../NewsList";

describe("<NewsList />", () => {
  it("propose le flux RSS sous le titre", () => {
    render(<NewsList news={[]} currentPage={1} totalPages={0} />);

    const link = screen.getByRole("link", { name: /Flux RSS/ });
    expect(link).toHaveAttribute("href", "/actualite/rss.xml");
    expect(
      screen
        .getByRole("heading", { level: 1, name: "Actualités" })
        .compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
