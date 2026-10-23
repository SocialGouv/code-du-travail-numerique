import { render } from "@testing-library/react";
import { NewsItem } from "../component/NewsItem";

describe("<NewsItem />", () => {
  it("affiche « Publié le » avec la date dans une balise <time>", () => {
    const { getByText, getByRole } = render(
      <NewsItem
        title="Mon actualité"
        content="<p>Contenu</p>"
        date="07/04/2026"
        slug="mon-actualite"
      />
    );
    const time = getByText("7 avril 2026");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2026-04-07");
    expect(time.parentElement).toHaveTextContent("Publié le 7 avril 2026");
    expect(getByRole("link", { name: /Lire la suite/ })).toHaveAttribute(
      "href",
      "/actualite/mon-actualite"
    );
  });

  it("n'affiche pas de date invalide", () => {
    const { queryByText, container } = render(
      <NewsItem
        title="Mon actualité"
        content="<p>Contenu</p>"
        date="pas une date"
        slug="mon-actualite"
      />
    );
    expect(queryByText(/Publié le/)).toBeNull();
    expect(container.querySelector("time")).toBeNull();
  });

  it("affiche l'image entre le titre et le contenu", () => {
    const { getByRole, getByAltText } = render(
      <NewsItem
        title="Mon actualité"
        content="<p>Contenu</p>"
        date="07/04/2026"
        slug="mon-actualite"
        image={{
          filename: "actu.webp",
          url: "https://cdn/actu.webp",
          alt: "Une salariée à son bureau",
          license: "free",
          sizeOctet: 10318,
        }}
      />
    );
    const image = getByAltText("Une salariée à son bureau");
    expect(image).toHaveAttribute("src", "https://cdn/actu.webp");
    expect(image).toHaveAttribute("loading", "lazy");
    const heading = getByRole("heading", { name: "Mon actualité" });
    expect(
      heading.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      image.compareDocumentPosition(getByRole("link")) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("ne charge pas en différé l'image prioritaire", () => {
    const { getByAltText } = render(
      <NewsItem
        title="Mon actualité"
        content="<p>Contenu</p>"
        date="07/04/2026"
        slug="mon-actualite"
        imagePriority
        image={{
          filename: "actu.webp",
          url: "https://cdn/actu.webp",
          alt: "Image",
          license: "free",
          sizeOctet: 10318,
        }}
      />
    );
    expect(getByAltText("Image")).not.toHaveAttribute("loading");
  });

  it("n'affiche pas d'image quand l'actualité n'en a pas", () => {
    const { queryByRole } = render(
      <NewsItem
        title="Mon actualité"
        content="<p>Contenu</p>"
        date="07/04/2026"
        slug="mon-actualite"
      />
    );
    expect(queryByRole("img")).toBeNull();
  });
});
