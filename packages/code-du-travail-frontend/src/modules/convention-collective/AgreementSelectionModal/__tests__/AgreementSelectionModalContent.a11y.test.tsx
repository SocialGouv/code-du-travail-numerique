import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AgreementSelectionModalContent,
  AGREEMENT_A11Y_MESSAGES,
} from "../AgreementSelectionModalContent";

// Mock AgreementSelectionForm
jest.mock("../AgreementSelectionForm", () => ({
  AgreementSelectionForm: ({
    onAgreementSelect,
  }: {
    onAgreementSelect: (agreement: any) => void;
  }) => (
    <div data-testid="agreement-selection-form">
      <button
        data-testid="select-agreement-btn"
        onClick={() =>
          onAgreementSelect({
            num: 1486,
            shortTitle: "Bureaux d'études techniques",
            id: "1486",
            slug: "1486-bureaux-detudes-techniques",
            title: "Convention collective des bureaux d'études techniques",
          })
        }
      >
        Sélectionner
      </button>
    </div>
  ),
}));

// Mock useAgreementStorageSync
const mockSetAgreement = jest.fn();
const mockClearAgreement = jest.fn();
let currentAgreement: any = undefined;

jest.mock("../useAgreementStorageSync", () => ({
  useAgreementStorageSync: () => ({
    agreement: currentAgreement,
    setAgreement: (agreement: any) => {
      mockSetAgreement(agreement);
      currentAgreement = agreement;
    },
    clearAgreement: () => {
      mockClearAgreement();
      currentAgreement = undefined;
    },
  }),
}));

describe("AgreementSelectionModalContent - Accessibility", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    currentAgreement = undefined;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Live region", () => {
    it("should always have a live region present in the DOM", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const liveRegion = screen.getByRole("status");
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute("aria-live", "polite");
      expect(liveRegion).toHaveAttribute("aria-atomic", "true");
    });

    it("should announce when an agreement is selected", async () => {
      const user = userEvent.setup({ delay: null });

      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const selectBtn = screen.getByTestId("select-agreement-btn");
      await user.click(selectBtn);

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      const liveRegion = screen.getByRole("status");
      expect(liveRegion.textContent).toBe(
        AGREEMENT_A11Y_MESSAGES.AGREEMENT_SAVED(
          "Bureaux d'études techniques (IDCC 1486)"
        )
      );
    });
  });

  describe("Form view (no agreement selected)", () => {
    it("should render the selection form", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      expect(
        screen.getByTestId("agreement-selection-form")
      ).toBeInTheDocument();
    });

    it("should have a Fermer button", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const closeButton = screen.getByRole("button", { name: "Fermer" });
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("type", "button");
    });
  });

  describe("Selected view (agreement already selected)", () => {
    beforeEach(() => {
      currentAgreement = {
        num: 1486,
        shortTitle: "Bureaux d'études techniques",
        id: "1486",
        slug: "1486-bureaux-detudes-techniques",
        title: "Convention collective des bureaux d'études techniques",
      };
    });

    it("should display the selected agreement with proper semantics", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const selectedCard = screen.getByTestId("header-selected-agreement-card");
      expect(selectedCard).toBeInTheDocument();
      expect(selectedCard).toHaveAttribute("role", "region");
      expect(selectedCard).toHaveAttribute(
        "aria-labelledby",
        "agreement-selection-label"
      );
    });

    it("should have a label for the selected agreement region", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const label = screen.getByText(
        "Les réponses seront personnalisées pour la convention collective :"
      );
      expect(label).toHaveAttribute("id", "agreement-selection-label");
    });

    it("should have Fermer and Modifier buttons", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      expect(
        screen.getByRole("button", { name: "Fermer" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Modifier/i })
      ).toBeInTheDocument();
    });

    it("should have buttons with type=button", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const closeButton = screen.getByRole("button", { name: "Fermer" });
      const editButton = screen.getByRole("button", { name: /Modifier/i });

      expect(closeButton).toHaveAttribute("type", "button");
      expect(editButton).toHaveAttribute("type", "button");
    });
  });
});
