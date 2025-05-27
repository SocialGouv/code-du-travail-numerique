import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntegrationPageContent } from "../IntegrationPageContent";

// Mock des données d'intégration
jest.mock("../../../integration", () => ({
  integrationData: {
    "moteur-recherche": {
      shortTitle: "Moteur de recherche",
      shortDescription: "Effectuez une recherche depuis votre site",
    },
    "modeles-de-courriers": {
      shortTitle: "Modèles de documents",
      shortDescription: "Téléchargez et personnalisez les modèles",
    },
  },
}));

describe("IntegrationPageContent", () => {
  it("should render the title", () => {
    render(<IntegrationPageContent />);

    const title = screen.getByTestId("integration-page-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Intégrer les outils du Code du travail numérique"
    );
  });

  it("should render the description", () => {
    render(<IntegrationPageContent />);

    const description = screen.getByTestId("integration-page-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "L&apos;équipe du Code du travail numérique"
    );
  });

  it("should render integration tiles", () => {
    render(<IntegrationPageContent />);

    const motorTile = screen.getByTestId("integration-tile-moteur-recherche");
    const modelsTile = screen.getByTestId(
      "integration-tile-modeles-de-courriers"
    );

    expect(motorTile).toBeInTheDocument();
    expect(modelsTile).toBeInTheDocument();

    // Verify tile content
    expect(motorTile).toHaveTextContent("Moteur de recherche");
    expect(motorTile).toHaveTextContent(
      "Effectuez une recherche depuis votre site"
    );
    expect(modelsTile).toHaveTextContent("Modèles de documents");
    expect(modelsTile).toHaveTextContent(
      "Téléchargez et personnalisez les modèles"
    );
  });
});
