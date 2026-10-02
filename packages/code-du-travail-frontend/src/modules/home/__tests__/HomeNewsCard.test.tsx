import { render } from "@testing-library/react";
import { HomeNewsCard } from "../Components/HomeNewsCard";

describe("<HomeNewsCard />", () => {
  it("affiche « Publié le » avec la date dans une balise <time>", () => {
    const { getByText } = render(
      <HomeNewsCard
        title="Mon actualité"
        description="<p>Description</p>"
        link="/actualite/mon-actualite"
        date="07/04/2026"
      />
    );
    const time = getByText("7 avril 2026");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2026-04-07");
    expect(time.parentElement).toHaveTextContent("Publié le 7 avril 2026");
    expect(time.parentElement?.className).toContain("fr-card__detail");
  });
});
