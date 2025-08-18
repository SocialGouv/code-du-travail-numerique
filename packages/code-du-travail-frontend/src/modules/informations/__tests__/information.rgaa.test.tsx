import { render, screen } from "@testing-library/react";
import { Information } from "../Information";
import { EditorialContentType } from "@socialgouv/cdtn-types/build/hasura/editorial-content";

describe("Information Component with Infographic", () => {
  const mockProps = {
    date: "2025-08-14",
    title: "Test Information Page",
    breadcrumbs: [{ label: "Home", url: "/", position: 1, slug: "home" }],
    description: "Description of the information page",
    intro: "<p>Introduction content</p>",
    relatedItems: [{ items: [], title: "Related Items" }],
    contents: [
      {
        title: "Content Section",
        name: "content-section",
        blocks: [
          {
            type: EditorialContentType.graphic,
            imgUrl: "/static/images/test-infographic.png",
            fileUrl: "/static/pdfs/test-infographic.pdf",
            size: "1.2 Mo",
            altText: "Test infographic description",
            html: "<p>Description of the infographic</p>",
            markdown: "Description of the infographic",
            htmlWithGlossary: "<p>Description of the infographic</p>",
          },
        ],
      },
    ],
    references: [],
    slug: "test-information",
    dismissalProcess: false,
  };

  it("renders InfographicWrapper with correct accessibility attributes in Lightbox", async () => {
    //@ts-ignore
    render(<Information {...mockProps} />);

    // Vérifier que l'image de l'infographie est rendue
    const infographicImages = screen.getAllByRole("img", { hidden: true });
    const infographicImage = infographicImages[0];
    expect(infographicImage).toBeInTheDocument();
    expect(infographicImage).toHaveAttribute(
      "src",
      expect.stringContaining("test-infographic.png")
    );

    // Simuler le clic pour ouvrir la Lightbox
    infographicImage.click();

    // Vérifier que la Lightbox est rendue avec les bons labels d'accessibilité
    const lightboxTitle = await screen.findByText("La procédure - Infographie");
    expect(lightboxTitle).toBeInTheDocument();

    // Vérifier les labels de la Lightbox
    expect(screen.getByLabelText("Fermer")).toBeInTheDocument();
    expect(screen.getByLabelText("Zoomer")).toBeInTheDocument();
    expect(screen.getByLabelText("Dézoomer")).toBeInTheDocument();
  });
});
