import { render, screen } from "@testing-library/react";
import { IntegrationList } from "../IntegrationList";

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
    "convention-collective": {
      shortTitle: "Convention collective",
      shortDescription: "Trouvez votre convention collective",
    },
  },
}));

describe("IntegrationList", () => {
  it("should render all integration tiles by default", () => {
    render(<IntegrationList />);

    expect(
      screen.getByTestId("integration-tile-moteur-recherche")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("integration-tile-modeles-de-courriers")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("integration-tile-convention-collective")
    ).toBeInTheDocument();
  });

  it("should render only specified integration tiles", () => {
    const keys = ["moteur-recherche", "convention-collective"];
    render(<IntegrationList keys={keys} />);

    expect(
      screen.getByTestId("integration-tile-moteur-recherche")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("integration-tile-convention-collective")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("integration-tile-modeles-de-courriers")
    ).not.toBeInTheDocument();
  });

  it("should render empty list when no keys provided", () => {
    render(<IntegrationList keys={[]} />);

    expect(screen.queryByTestId(/integration-tile-/)).not.toBeInTheDocument();
  });

  it("should render tiles with correct titles", () => {
    render(<IntegrationList />);

    expect(screen.getByText("Moteur de recherche")).toBeInTheDocument();
    expect(screen.getByText("Modèles de documents")).toBeInTheDocument();
    expect(screen.getByText("Convention collective")).toBeInTheDocument();
  });

  it("should render tiles with correct descriptions", () => {
    render(<IntegrationList />);

    expect(
      screen.getByText("Effectuez une recherche depuis votre site")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Téléchargez et personnalisez les modèles")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Trouvez votre convention collective")
    ).toBeInTheDocument();
  });
});
