import { render } from "@testing-library/react";
import { NewsImage } from "../component/NewsImage";

const baseImage = {
  filename: "image.png",
  url: "https://cdn.example.fr/image.png",
  alt: "Une description de l'image",
  width: 800,
  height: 450,
};

describe("<NewsImage />", () => {
  it("affiche « Source : » et un lien quand l'auteur est une URL", () => {
    const { getByRole, getByText } = render(
      <NewsImage
        image={{ ...baseImage, license: "source", author: "https://ex.fr" }}
      />
    );
    const link = getByRole("link", { name: "https://ex.fr" });
    expect(link).toHaveAttribute("href", "https://ex.fr");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(getByText(/Source :/)).toBeInTheDocument();
  });

  it("affiche « Image libre de droit » sans auteur", () => {
    const { container, queryByRole } = render(
      <NewsImage image={{ ...baseImage, license: "free" }} />
    );
    expect(container.querySelector("figcaption")).toHaveTextContent(
      /^Image libre de droit$/
    );
    expect(queryByRole("link")).not.toBeInTheDocument();
  });

  it("rend l'image avec l'alt fourni", () => {
    const { getByRole } = render(
      <NewsImage image={{ ...baseImage, license: "free", author: "Jean" }} />
    );
    const img = getByRole("img");
    expect(img).toHaveAttribute("alt", "Une description de l'image");
    expect(img).toHaveAttribute("src", "https://cdn.example.fr/image.png");
  });
});
