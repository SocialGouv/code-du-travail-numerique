import { render, screen } from "@testing-library/react";
import React from "react";
import { References } from "../References";

describe("<References />", () => {
  it("affiche les liens sans introduction comme avant", () => {
    render(
      <References
        label="Références"
        links={[{ title: "Article L1234-9", url: "https://legifrance.fr/a" }]}
      />
    );

    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent(/^Article L1234-9$/);
    expect(
      screen.getByRole("link", { name: "Article L1234-9" })
    ).toHaveAttribute("target", "_blank");
  });

  it("préfixe le lien par son introduction", () => {
    render(
      <References
        label="Références"
        links={[
          {
            title: "Article L1234-9",
            url: "https://legifrance.fr/a",
            intro: "Indemnité de licenciement",
          },
          { title: "Décret", url: "https://legifrance.fr/d" },
        ]}
      />
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent(
      "Indemnité de licenciement : Article L1234-9"
    );
    expect(items[1]).toHaveTextContent(/^Décret$/);
  });
});
