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

// Mock @socialgouv/modeles-social
jest.mock("@socialgouv/modeles-social", () => ({
  supportedCcn: [{ idcc: 1486, indpiTempsPartiel: "FULLY_SUPPORTED" }],
  SupportedTypes: {
    FULLY_SUPPORTED: "FULLY_SUPPORTED",
  },
}));

// Mock AccessibleAlert
jest.mock("../../../outils/common/components/AccessibleAlert", () => ({
  AccessibleAlert: ({
    severity,
    description,
    ...props
  }: {
    severity: string;
    description: string;
    "data-testid"?: string;
  }) => (
    <div role="alert" data-severity={severity} {...props}>
      {description}
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
        contributions: true,
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

      const label = screen.getByText("Convention collective sélectionnée :");
      expect(label).toHaveAttribute("id", "agreement-selection-label");
    });

    it("should have Supprimer, Modifier and Fermer buttons", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      expect(
        screen.getByRole("button", {
          name: /Supprimer la convention collective sélectionnée/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: /Modifier la convention collective sélectionnée/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Fermer" })
      ).toBeInTheDocument();
    });

    it("should have buttons with type=button", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const deleteButton = screen.getByRole("button", {
        name: /Supprimer la convention collective sélectionnée/i,
      });
      const closeButton = screen.getByRole("button", { name: "Fermer" });
      const editButton = screen.getByRole("button", {
        name: /Modifier la convention collective sélectionnée/i,
      });

      expect(deleteButton).toHaveAttribute("type", "button");
      expect(closeButton).toHaveAttribute("type", "button");
      expect(editButton).toHaveAttribute("type", "button");
    });

    it("should call clearAgreement and onClose when Supprimer is clicked", async () => {
      const user = userEvent.setup({ delay: null });

      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const deleteButton = screen.getByRole("button", {
        name: /Supprimer la convention collective sélectionnée/i,
      });
      await user.click(deleteButton);

      expect(mockClearAgreement).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("should render agreement name as a link when slug is defined", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const link = screen.getByRole("link", {
        name: "Bureaux d'études techniques (IDCC 1486)",
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        "/convention-collective/1486-bureaux-detudes-techniques"
      );
    });

    it("should not show warning alert when CC is supported by a simulator", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      expect(
        screen.queryByTestId("agreement-not-treated-warning")
      ).not.toBeInTheDocument();
    });

    it("should show warning alert when CC is not supported by any simulator", () => {
      currentAgreement = {
        num: 9999,
        shortTitle: "Convention non traitée",
        id: "9999",
        slug: "9999-convention-non-traitee",
        title: "Convention collective non traitée",
        contributions: false,
      };

      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      expect(
        screen.getByTestId("agreement-not-treated-warning")
      ).toBeInTheDocument();
    });
  });
});
