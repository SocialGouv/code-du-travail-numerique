import { render } from "@testing-library/react";
import { PublishedDate } from "../PublishedDate";

describe("<PublishedDate />", () => {
  it("affiche « Publié le » et la date dans une balise <time> ISO", () => {
    const { container, getByText } = render(
      <PublishedDate date="18/09/2026" className="ma-classe" />
    );
    const paragraph = container.querySelector("p.ma-classe");
    expect(paragraph).toHaveTextContent("Publié le 18 septembre 2026");
    const time = getByText("18 septembre 2026");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2026-09-18");
    // Le libellé reste hors de <time>.
    expect(time).not.toHaveTextContent("Publié le");
  });

  it("tolère une date saisie sans zéros ni siècle", () => {
    const { getByText } = render(<PublishedDate date="1/9/26" />);
    expect(getByText("1 septembre 2026")).toHaveAttribute(
      "dateTime",
      "2026-09-01"
    );
  });

  it.each([undefined, "", "pas une date", "31/02/2026"])(
    "n'affiche rien pour une date invalide (%p)",
    (date) => {
      const { container } = render(<PublishedDate date={date} />);
      expect(container).toBeEmptyDOMElement();
    }
  );
});
