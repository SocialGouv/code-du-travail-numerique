import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntegrationDetailContent } from "../IntegrationDetailContent";

// Mock du script widget.js
global.document.body.appendChild = jest.fn();
global.document.body.removeChild = jest.fn();

// Mock document.createElement and getElementById
global.document.createElement = jest.fn().mockReturnValue({
  src: "",
  async: false,
});

global.document.getElementById = jest.fn().mockReturnValue({
  contentWindow: {},
  after: jest.fn(),
  remove: jest.fn(),
});

// Mock window.addEventListener and removeEventListener
global.window.addEventListener = jest.fn();
global.window.removeEventListener = jest.fn();

describe("IntegrationDetailContent", () => {
  const defaultProps = {
    id: "test-widget",
    title: "Test Widget",
    shortTitle: "Test",
    description: ["Description line 1", "Description line 2"],
    url: "/widgets/test",
    host: "https://example.com",
    messages: undefined,
    selectOptions: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the title", () => {
    render(<IntegrationDetailContent {...defaultProps} />);

    const title = screen.getByTestId("integration-detail-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Test Widget");
  });

  it("should render the description", () => {
    render(<IntegrationDetailContent {...defaultProps} />);

    const description = screen.getByTestId("integration-detail-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Description line 1");
    expect(description).toHaveTextContent("Description line 2");
  });

  it("should render select options when provided", () => {
    const selectOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(
      <IntegrationDetailContent
        {...defaultProps}
        selectOptions={selectOptions}
      />
    );

    const selectContainer = screen.getByTestId("integration-detail-select");
    expect(selectContainer).toBeInTheDocument();

    const option1 = screen.getByText("Option 1");
    const option2 = screen.getByText("Option 2");
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("should render preview link", () => {
    render(<IntegrationDetailContent {...defaultProps} />);

    const preview = screen.getByTestId("integration-detail-preview");
    const link = preview.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/widgets/test");
    expect(link).toHaveTextContent("Test");
  });

  it("should render installation instructions", () => {
    render(<IntegrationDetailContent {...defaultProps} />);

    const instructions = screen.getByTestId("integration-instructions");
    expect(instructions).toBeInTheDocument();
    expect(instructions).toHaveTextContent("Intégrez ce module à votre site");
  });

  it("should render tracking section when messages are provided", () => {
    const messages = {
      click: [
        {
          name: "test-click",
          description: "Test click event",
        },
      ],
    };

    render(<IntegrationDetailContent {...defaultProps} messages={messages} />);

    const tracking = screen.getByTestId("integration-tracking");
    expect(tracking).toBeInTheDocument();
    expect(tracking).toHaveTextContent("Messages");
    expect(tracking).toHaveTextContent("test-click");
  });

  it("should not render tracking section when messages are not provided", () => {
    render(<IntegrationDetailContent {...defaultProps} />);

    const tracking = screen.queryByTestId("integration-tracking");
    expect(tracking).not.toBeInTheDocument();
  });

  it("should update URL when select option changes", async () => {
    const selectOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ];

    render(
      <IntegrationDetailContent
        {...defaultProps}
        url="/widgets/test/[value]"
        selectOptions={selectOptions}
      />
    );

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "option2");

    await waitFor(() => {
      const preview = screen.getByTestId("integration-detail-preview");
      const link = preview.querySelector("a");
      expect(link).toHaveAttribute(
        "href",
        "https://example.com/widgets/test/option2"
      );
    });
  });

  it("should render help alert", () => {
    render(<IntegrationDetailContent {...defaultProps} />);

    const helpText = screen.getByText(/Besoin d'aide/);
    expect(helpText).toBeInTheDocument();

    const emailLink = screen.getByText(
      "codedutravailnumerique@travail.gouv.fr"
    );
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:codedutravailnumerique@travail.gouv.fr"
    );
  });
});
