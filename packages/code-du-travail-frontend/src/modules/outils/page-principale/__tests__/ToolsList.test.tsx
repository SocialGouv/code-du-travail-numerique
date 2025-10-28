import React from "react";
import { render } from "@testing-library/react";
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

    const { getByRole, getAllByRole } = render(
      <ToolsList tools={tools} externalTools={[]} />
    );

    // Vérifier le titre
    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Liste des simulateurs et des services"
    );

    const subtitleLevel = getAllByRole("heading", { level: 2 });
    expect(subtitleLevel.length).toBe(2);

    // Vérifier que les simulateurs CDTN sont rendus
    const toolTiles = getAllByRole("heading", { level: 3 });
    expect(toolTiles.length).toBe(2);

    // Vérifier les titres des simulateurs
    expect(toolTiles[0]).toHaveTextContent("Simulator 1");
    expect(toolTiles[1]).toHaveTextContent("Simulator 2");

    // Vérifier les liens des simulateurs
    expect(getByRole("link", { name: "Simulator 1" })).toHaveAttribute(
      "href",
      "/outils/simulator-1"
    );
    expect(getByRole("link", { name: "Simulator 2" })).toHaveAttribute(
      "href",
      "/outils/simulator-2"
    );
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

    const { queryByText } = render(
      <ToolsList tools={tools} externalTools={[]} />
    );

    expect(queryByText("Description")).toBeInTheDocument();
    expect(queryByText("Second Meta Description")).toBeInTheDocument();
  });
});
