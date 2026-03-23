import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgreementSelectionModalContent } from "../AgreementSelectionModalContent";

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
        "Convention collective Bureaux d'études techniques (IDCC 1486) enregistrée avec succès"
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

    it("should display the selected agreement card without region role", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const selectedCard = screen.getByTestId("header-selected-agreement-card");
      expect(selectedCard).toBeInTheDocument();
      expect(selectedCard).not.toHaveAttribute("role");
      expect(selectedCard).not.toHaveAttribute("aria-labelledby");
    });

    it("should have a label for the selected agreement", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const label = screen.getByText("Convention collective sélectionnée :");
      expect(label).toHaveAttribute("id", "agreement-selection-label");
      expect(label).toHaveAttribute("tabindex", "-1");
    });

    it("should have Supprimer, Modifier and Fermer buttons with aria-describedby", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const deleteButton = screen.getByRole("button", { name: "Supprimer" });
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveAttribute(
        "aria-describedby",
        "selected-agreement-name"
      );

      const editButton = screen.getByRole("button", { name: "Modifier" });
      expect(editButton).toBeInTheDocument();
      expect(editButton).toHaveAttribute(
        "aria-describedby",
        "selected-agreement-name"
      );

      expect(
        screen.getByRole("button", { name: "Fermer" })
      ).toBeInTheDocument();
    });

    it("should not have aria-label on Supprimer and Modifier buttons", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const deleteButton = screen.getByRole("button", { name: "Supprimer" });
      expect(deleteButton).not.toHaveAttribute("aria-label");

      const editButton = screen.getByRole("button", { name: "Modifier" });
      expect(editButton).not.toHaveAttribute("aria-label");
    });

    it("should have buttons with type=button", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const deleteButton = screen.getByRole("button", { name: "Supprimer" });
      const closeButton = screen.getByRole("button", { name: "Fermer" });
      const editButton = screen.getByRole("button", { name: "Modifier" });

      expect(deleteButton).toHaveAttribute("type", "button");
      expect(closeButton).toHaveAttribute("type", "button");
      expect(editButton).toHaveAttribute("type", "button");
    });

    it("should call clearAgreement and onClose when Supprimer is clicked", async () => {
      const user = userEvent.setup({ delay: null });

      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const deleteButton = screen.getByRole("button", { name: "Supprimer" });
      await user.click(deleteButton);

      expect(mockClearAgreement).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });

    it("should render agreement name as a link inside a container with id for aria-describedby", () => {
      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const link = screen.getByRole("link", {
        name: "Bureaux d'études techniques (IDCC 1486)",
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        "/convention-collective/1486-bureaux-detudes-techniques"
      );

      const card = screen.getByTestId("header-selected-agreement-card");
      expect(card).toHaveAttribute("id", "selected-agreement-name");
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

  describe("Focus management", () => {
    it("should focus selected label after selecting an agreement", async () => {
      const user = userEvent.setup({
        delay: null,
        advanceTimers: jest.advanceTimersByTime,
      });

      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      const selectBtn = screen.getByTestId("select-agreement-btn");

      await act(async () => {
        await user.click(selectBtn);
      });

      // Allow React to process state updates and effects
      await act(async () => {
        jest.advanceTimersByTime(0);
      });

      const selectedLabel = screen.getByText(
        "Convention collective sélectionnée :"
      );
      expect(document.activeElement).toBe(selectedLabel);
    });

    it("should focus modal title after clicking Modifier", async () => {
      currentAgreement = {
        num: 1486,
        shortTitle: "Bureaux d'études techniques",
        id: "1486",
        slug: "1486-bureaux-detudes-techniques",
        title: "Convention collective des bureaux d'études techniques",
        contributions: true,
      };

      // Create the modal title element in the DOM (normally rendered by AgreementModal)
      const modalTitle = document.createElement("h1");
      modalTitle.id = "agreement-modal-title";
      modalTitle.tabIndex = -1;
      document.body.appendChild(modalTitle);

      const user = userEvent.setup({
        delay: null,
        advanceTimers: jest.advanceTimersByTime,
      });

      render(<AgreementSelectionModalContent onClose={mockOnClose} />);

      await act(async () => {
        await user.click(screen.getByRole("button", { name: "Modifier" }));
      });

      // Allow React to process state updates and effects
      await act(async () => {
        jest.advanceTimersByTime(0);
      });

      expect(document.activeElement).toBe(modalTitle);

      // Clean up
      document.body.removeChild(modalTitle);
    });
  });
});
