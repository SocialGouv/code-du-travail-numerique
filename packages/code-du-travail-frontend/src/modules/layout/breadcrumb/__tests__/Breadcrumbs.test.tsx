import { render, screen } from "@testing-library/react";
import React from "react";

import { Breadcrumbs } from "../Breadcrumbs";

jest.mock("next/navigation", () => ({
  usePathname: () => "/contribution/ma-fiche",
}));

const readJsonLd = (container: HTMLElement) => {
  const script = container.querySelector("#jsonld-breadcrumbs");
  return JSON.parse(script?.textContent ?? "{}");
};

describe("<Breadcrumbs />", () => {
  const segments = [
    { label: "Fiches pratiques", href: "/contribution" },
    { label: "Congés", href: "/themes/conges" },
  ];

  it("rend les maillons, précédés d'Accueil, et marque la page courante", () => {
    render(<Breadcrumbs currentPageLabel="Ma fiche" segments={segments} />);

    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(
      screen.getByRole("link", { name: "Fiches pratiques" })
    ).toHaveAttribute("href", "/contribution");
    expect(screen.getByRole("link", { name: "Congés" })).toHaveAttribute(
      "href",
      "/themes/conges"
    );
    expect(screen.getByText("Ma fiche")).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("décrit le même chemin dans le JSON-LD, en URLs absolues", () => {
    const { container } = render(
      <Breadcrumbs currentPageLabel="Ma fiche" segments={segments} />
    );

    expect(readJsonLd(container).itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "http://api.url/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Fiches pratiques",
        item: "http://api.url/contribution",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Congés",
        item: "http://api.url/themes/conges",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Ma fiche",
        item: "http://api.url/contribution/ma-fiche",
      },
    ]);
  });

  it("n'écrit jamais de ReactNode sérialisé dans le JSON-LD", () => {
    const { container } = render(
      <Breadcrumbs currentPageLabel="Ma fiche" segments={segments} />
    );

    // Non-régression : les segments transitaient auparavant par le type DSFR
    // (label: ReactNode) avant d'être repassés en string pour le JSON-LD, ce
    // qui produisait "[object Object]" dès qu'un appelant passait un fragment.
    expect(
      container.querySelector("#jsonld-breadcrumbs")?.textContent
    ).not.toContain("[object Object]");
  });

  it("réduit le JSON-LD à Accueil et la page courante sans segment", () => {
    const { container } = render(<Breadcrumbs currentPageLabel="Ma fiche" />);

    expect(readJsonLd(container).itemListElement).toHaveLength(2);
  });

  it("n'émet qu'un seul script de fil d'Ariane", () => {
    const { container } = render(
      <Breadcrumbs currentPageLabel="Ma fiche" segments={segments} />
    );

    // Deux <script> de même id seraient un HTML invalide et un signal ambigu
    // pour Google : le composant ne doit jamais être monté en double sur une
    // page (ex. un conteneur ET la page qui le rendraient tous les deux).
    expect(container.querySelectorAll("#jsonld-breadcrumbs")).toHaveLength(1);
  });

  it("n'ajoute aucun élément englobant", () => {
    const { container } = render(
      <Breadcrumbs currentPageLabel="Ma fiche" segments={segments} />
    );

    // Plusieurs conteneurs rendent le fil d'Ariane en enfant direct d'un
    // `fr-grid-row` : un <div> de regroupement casserait leur mise en page.
    expect(container.querySelector(":scope > div")).toBeNull();
  });

  it("transmet la className au composant DSFR", () => {
    const { container } = render(
      <Breadcrumbs
        currentPageLabel="Ma fiche"
        segments={segments}
        className="fr-mb-2v"
      />
    );

    expect(container.querySelector("nav.fr-breadcrumb")).toHaveClass(
      "fr-mb-2v"
    );
  });
});
