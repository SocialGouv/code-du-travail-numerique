import { render, screen } from "@testing-library/react";
import { IntegrationPageContent } from "../IntegrationPageContent";

jest.mock("../data", () => ({
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
      "Intégrer les contenus du Code du travail numérique"
    );
  });

  it("should render the description", () => {
    render(<IntegrationPageContent />);

    const description = screen.getByTestId("integration-page-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "L'équipe du Code du travail numérique vous propose d'intégrer son moteur de recherche, ses modèles de courriers ainsi que certains de ses simulateurs sur votre site grâce à un module (widget)."
    );
  });

  it("should render integration cards", () => {
    render(<IntegrationPageContent />);

    const motorCard = screen.getByTestId("integration-card-moteur-recherche");
    const modelsCard = screen.getByTestId(
      "integration-card-modeles-de-courriers"
    );

    expect(motorCard).toBeInTheDocument();
    expect(modelsCard).toBeInTheDocument();

    expect(motorCard).toHaveTextContent("Moteur de recherche");
    expect(motorCard).toHaveTextContent(
      "Effectuez une recherche depuis votre site"
    );
    expect(modelsCard).toHaveTextContent("Modèles de documents");
    expect(modelsCard).toHaveTextContent(
      "Téléchargez et personnalisez les modèles"
    );
  });
});
