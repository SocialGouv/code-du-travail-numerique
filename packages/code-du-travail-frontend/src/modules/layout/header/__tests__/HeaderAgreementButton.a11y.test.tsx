import React from "react";
import { render, screen, within } from "@testing-library/react";
import { HeaderAgreementButton } from "../HeaderAgreementButton";

// Mock useBreakpoints
jest.mock("../../../common/useBreakpoints", () => ({
  useBreakpoints: () => ({
    isBelow: () => false,
  }),
}));

// Mock useAgreementStorageSync
const mockAgreement = {
  num: 1486,
  shortTitle: "Bureaux d'études techniques",
  id: "1486",
  slug: "1486-bureaux-detudes-techniques",
  title: "Convention collective des bureaux d'études techniques",
};

let agreementValue: typeof mockAgreement | undefined = undefined;

jest.mock("../../../convention-collective/AgreementSelectionModal", () => ({
  useAgreementStorageSync: () => ({
    agreement: agreementValue,
  }),
}));

describe("HeaderAgreementButton - Accessibility", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    agreementValue = undefined;
  });

  describe("ARIA attributes", () => {
    it("should have aria-haspopup=dialog to indicate it opens a dialog", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(button).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("should not have aria-expanded (not appropriate for dialog triggers)", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(button).not.toHaveAttribute("aria-expanded");
    });

    it("should have aria-controls pointing to the agreement modal", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(button).toHaveAttribute("aria-controls", "agreement-modal");
    });

    it("should have type=button to prevent form submission", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(button).toHaveAttribute("type", "button");
    });

    it("should have aria-describedby pointing to the tooltip", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(button).toHaveAttribute("aria-describedby", "test-button-tooltip");
    });

    it("should not have a title attribute (redundant with visible text)", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(button).not.toHaveAttribute("title");
    });
  });

  describe("Tooltip", () => {
    it("should render a tooltip with instructions when no agreement selected", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const tooltip = document.getElementById("test-button-tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveAttribute("role", "tooltip");
      expect(tooltip).toHaveTextContent(
        "Renseignez votre convention collective pour personnaliser nos contenus"
      );
    });

    it("should render tooltip with modify action and agreement details when selected", () => {
      agreementValue = mockAgreement;

      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const tooltip = document.getElementById("test-button-tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(
        "Modifier ma convention collective : IDCC 1486 - Bureaux d'études techniques"
      );
    });
  });

  describe("Icon accessibility", () => {
    it("should mark the decorative icon as aria-hidden", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const img = document.querySelector('img[src*="search_agreement"]');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("aria-hidden", "true");
      expect(img).toHaveAttribute("alt", "");
    });
  });

  describe("Agreement text display", () => {
    it("should display 'Ma convention collective' when no agreement is set", () => {
      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(
        within(button).getByText("Ma convention collective")
      ).toBeInTheDocument();
    });

    it("should display IDCC number and short title when agreement is set", () => {
      agreementValue = mockAgreement;

      render(<HeaderAgreementButton id="test-button" onClick={mockOnClick} />);

      const button = screen.getByTestId("header-agreement-button");
      expect(within(button).getByText("IDCC 1486")).toBeInTheDocument();
      expect(
        within(button).getByText("Bureaux d'études techniques")
      ).toBeInTheDocument();
    });
  });
});
