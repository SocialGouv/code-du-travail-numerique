import React from "react";
import { render, screen } from "@testing-library/react";
import { ToolTile } from "../ToolTile";

// Mock du composant Tile du DSFR
jest.mock("@codegouvfr/react-dsfr/Tile", () => ({
  Tile: (props: any) => (
    <div data-testid="dsfr-tile">
      <div data-testid="tile-title">{props.title}</div>
      <div data-testid="tile-desc">{props.desc}</div>
      <div data-testid="tile-link">{props.linkProps?.href}</div>
      <div data-testid="tile-image">{props.imageUrl}</div>
    </div>
  ),
}));

describe("ToolTile", () => {
  it("should render a tile with title and description", () => {
    render(
      <ToolTile
        title="Test Tool"
        description="Test Description"
        iconName="test-icon"
        link="/test-link"
      />
    );

    expect(screen.getByTestId("dsfr-tile")).toBeInTheDocument();
    expect(screen.getByTestId("tile-title")).toHaveTextContent("Test Tool");
    expect(screen.getByTestId("tile-desc")).toHaveTextContent(
      "Test Description"
    );
    expect(screen.getByTestId("tile-link")).toHaveTextContent("/test-link");
    expect(screen.getByTestId("tile-image")).toHaveTextContent(
      "/static/assets/icons/tools/test-icon.svg"
    );
  });

  it("should render a tile without link", () => {
    render(
      <ToolTile
        title="Test Tool"
        description="Test Description"
        iconName="test-icon"
      />
    );

    expect(screen.getByTestId("dsfr-tile")).toBeInTheDocument();
    expect(screen.getByTestId("tile-title")).toHaveTextContent("Test Tool");
    expect(screen.getByTestId("tile-desc")).toHaveTextContent(
      "Test Description"
    );
    expect(screen.getByTestId("tile-link")).toHaveTextContent("");
  });

  it("should render with minimal props", () => {
    render(<ToolTile title="Test Tool" />);

    expect(screen.getByTestId("dsfr-tile")).toBeInTheDocument();
    expect(screen.getByTestId("tile-title")).toHaveTextContent("Test Tool");
    expect(screen.getByTestId("tile-desc")).toHaveTextContent("");
    expect(screen.getByTestId("tile-link")).toHaveTextContent("");
    expect(screen.getByTestId("tile-image")).toHaveTextContent("");
  });

  it("should render a tile without icon", () => {
    render(
      <ToolTile
        title="Test Tool"
        description="Test Description"
        link="/test-link"
      />
    );

    expect(screen.getByTestId("dsfr-tile")).toBeInTheDocument();
    expect(screen.getByTestId("tile-title")).toHaveTextContent("Test Tool");
    expect(screen.getByTestId("tile-image")).toHaveTextContent("");
  });
});
