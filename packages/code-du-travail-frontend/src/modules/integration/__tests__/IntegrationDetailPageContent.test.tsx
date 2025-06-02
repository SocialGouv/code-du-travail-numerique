import { render, screen } from "@testing-library/react";
import { IntegrationDetailPageContent } from "../IntegrationDetailPageContent";
import { Widget } from "../types";

const mockWidget: Widget = {
  id: "test-widget",
  title: "Test Widget Title",
  shortTitle: "Test Widget",
  description: ["Description line 1", "Description line 2"],
  url: "/widgets/test",
  metaTitle: "Meta Title",
  metaDescription: "Meta Description",
  shortDescription: "Short Description",
  messages: undefined,
};

describe("IntegrationDetailPageContent", () => {
  const defaultProps = {
    widget: mockWidget,
    host: "https://example.com",
    selectOptions: null,
  };

  it("should render the breadcrumb", () => {
    render(<IntegrationDetailPageContent {...defaultProps} />);

    const homeLink = screen.getByText("Accueil");
    const integrationLink = screen.getByText(
      "Intégrer les outils du Code du travail numérique"
    );

    expect(homeLink).toBeInTheDocument();
    expect(integrationLink).toBeInTheDocument();
  });

  it("should render breadcrumb with correct links", () => {
    render(<IntegrationDetailPageContent {...defaultProps} />);

    const homeLink = screen.getByText("Accueil").closest("a");
    const integrationLink = screen
      .getByText("Intégrer les outils du Code du travail numérique")
      .closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(integrationLink).toHaveAttribute("href", "/integration");
  });

  it("should render the IntegrationDetailContent with correct props", () => {
    render(<IntegrationDetailPageContent {...defaultProps} />);

    const title = screen.getByTestId("integration-detail-title");
    expect(title).toHaveTextContent("Test Widget Title");

    const description = screen.getByTestId("integration-detail-description");
    expect(description).toHaveTextContent("Description line 1");
    expect(description).toHaveTextContent("Description line 2");
  });

  it("should render with select options when provided", () => {
    const selectOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(
      <IntegrationDetailPageContent
        {...defaultProps}
        selectOptions={selectOptions}
      />
    );

    const selectContainer = screen.getByTestId("integration-detail-select");
    expect(selectContainer).toBeInTheDocument();
  });

  it("should render with messages when provided", () => {
    const widgetWithMessages = {
      ...mockWidget,
      messages: {
        click: [
          {
            name: "test-click",
            description: "Test click event",
          },
        ],
      },
    };

    render(
      <IntegrationDetailPageContent
        {...defaultProps}
        widget={widgetWithMessages}
      />
    );

    const tracking = screen.getByTestId("integration-tracking");
    expect(tracking).toBeInTheDocument();
  });

  it("should use ContainerList layout", () => {
    render(<IntegrationDetailPageContent {...defaultProps} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
