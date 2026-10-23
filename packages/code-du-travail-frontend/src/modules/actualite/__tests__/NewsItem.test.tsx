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
    expect(getByRole("link", { name: /Lire l'actualité/ })).toHaveAttribute(
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
});
