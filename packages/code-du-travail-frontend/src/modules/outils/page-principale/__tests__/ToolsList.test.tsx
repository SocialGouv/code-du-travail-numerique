import React from "react";
import { render, screen } from "@testing-library/react";
import { ToolsList } from "../ToolsList";
import { ToolItem } from "../../../../../app/outils/page";

describe("ToolsList", () => {
  it("should render the tools list with CDTN simulators", () => {
    const tools = [
      {
        id: "1",
        title: "Simulator 1",
        description: "Description 1",
        metaDescription: "Meta Description 1",
        icon: "icon1",
        url: "/outils/simulator-1",
      } as ToolItem,
      {
        id: "2",
        title: "Simulator 2",
        description: "Description 2",
        metaDescription: "Meta Description 2",
        icon: "icon2",
        url: "/outils/simulator-2",
      } as ToolItem,
    ];

    render(<ToolsList tools={tools} />);

    // Vérifier le titre
    expect(screen.getByText("Simulateurs")).toBeInTheDocument();

    // Vérifier que les simulateurs CDTN sont rendus
    const toolTiles = screen.getAllByTestId("tool-tile");
    expect(toolTiles.length).toBe(2);

    // Vérifier les titres des simulateurs
    expect(screen.getByText("Simulator 1")).toBeInTheDocument();
    expect(screen.getByText("Simulator 2")).toBeInTheDocument();

    // Vérifier les liens des simulateurs
    const toolLinks = screen.getAllByTestId("tool-link");
    expect(toolLinks[0]).toHaveTextContent("/outils/simulator-1");
    expect(toolLinks[1]).toHaveTextContent("/outils/simulator-2");
  });

  it("should handle empty simulators", () => {
    render(<ToolsList tools={[]} />);

    // Vérifier que le titre est toujours présent
    expect(screen.getByText("Simulateurs")).toBeInTheDocument();

    // Vérifier qu'aucun outil n'est rendu
    const toolTiles = screen.queryAllByTestId("tool-tile");
    expect(toolTiles.length).toBe(0);
  });

  it("should handle missing descriptions and use metaDescription as fallback", () => {
    const tools = [
      {
        id: "1",
        title: "Simulator with description",
        description: "Description",
        metaDescription: "First Meta Description",
        icon: "icon1",
        url: "/outils/simulator-1",
      } as ToolItem,
      {
        id: "2",
        title: "Simulator with metaDescription",
        metaDescription: "Second Meta Description",
        icon: "icon2",
        url: "/outils/simulator-1",
      } as ToolItem,
    ];

    render(<ToolsList tools={tools} />);

    // Vérifier que les descriptions sont correctement affichées
    const toolDescriptions = screen.getAllByTestId("tool-description");
    expect(toolDescriptions[0]).toHaveTextContent("Description");
    expect(toolDescriptions[1]).toHaveTextContent("Second Meta Description");
  });
});
