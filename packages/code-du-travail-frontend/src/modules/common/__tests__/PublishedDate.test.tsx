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
    // Espaces insécables : la date ne se coupe pas en fin de ligne.
    expect(time.textContent).toBe("18\u00a0septembre\u00a02026");
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

  it("affiche « Mis à jour le » sur la même ligne, dans une seconde <time> ISO", () => {
    const { container, getByText } = render(
      <PublishedDate date="18/09/2026" updatedDate="02/10/2026" />
    );
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(1);
    expect(paragraphs[0]).toHaveTextContent(
      "Publié le 18 septembre 2026 · Mis à jour le 2 octobre 2026"
    );
    const times = paragraphs[0].querySelectorAll("time");
    expect(times).toHaveLength(2);
    const updated = getByText("2 octobre 2026");
    expect(updated.tagName).toBe("TIME");
    expect(updated).toHaveAttribute("dateTime", "2026-10-02");
    expect(updated).not.toHaveTextContent("Mis à jour le");
    expect(updated.textContent).toBe("2\u00a0octobre\u00a02026");
    // Le séparateur garde des espaces normales : coupure possible entre les
    // deux parties.
    expect(paragraphs[0].textContent).toContain("2026 · Mis");
  });

  it.each([undefined, "", "pas une date", "31/02/2026"])(
    "ignore une date de mise à jour invalide (%p)",
    (updatedDate) => {
      const { container } = render(
        <PublishedDate date="18/09/2026" updatedDate={updatedDate} />
      );
      expect(container.querySelector("p")?.textContent).toBe(
        "Publié le 18\u00a0septembre\u00a02026"
      );
      expect(container.querySelectorAll("time")).toHaveLength(1);
    }
  );

  it("n'affiche rien si la date de publication est invalide, même mise à jour", () => {
    const { container } = render(
      <PublishedDate date="pas une date" updatedDate="02/10/2026" />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
