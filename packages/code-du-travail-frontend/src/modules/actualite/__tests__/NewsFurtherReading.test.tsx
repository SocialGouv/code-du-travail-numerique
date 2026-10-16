import { render, screen } from "@testing-library/react";
import React from "react";
import { NewsFurtherReading } from "../component/NewsFurtherReading";

describe("<NewsFurtherReading />", () => {
  it("n'affiche rien sans lien", () => {
    const { container } = render(<NewsFurtherReading links={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("affiche le titre et une liste à puces avec l'introduction", () => {
    render(
      <NewsFurtherReading
        links={[
          {
            title: "Simulateur",
            url: "/outils/simulateur",
            intro: "Calculez votre indemnité",
            external: false,
          },
          { title: "Service-public.fr", url: "https://sp.fr", external: true },
        ]}
      />
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Pour aller plus loin" })
    ).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Calculez votre indemnité : Simulateur");
    expect(items[1]).toHaveTextContent(/^Service-public\.fr$/);
  });

  it("ouvre les liens externes dans un nouvel onglet", () => {
    render(
      <NewsFurtherReading
        links={[
          { title: "Interne", url: "/outils/simulateur", external: false },
          { title: "Externe", url: "https://sp.fr", external: true },
        ]}
      />
    );

    const internal = screen.getByRole("link", { name: "Interne" });
    expect(internal).toHaveAttribute("href", "/outils/simulateur");
    expect(internal).not.toHaveAttribute("target");

    const external = screen.getByRole("link", { name: /Externe/ });
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noopener noreferrer");
  });
});
