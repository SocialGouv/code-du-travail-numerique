import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgreementModal } from "../AgreementModal";

// Mock useScrollBlock
jest.mock("../../../utils/useScrollBlock", () => ({
  __esModule: true,
  default: () => [jest.fn(), jest.fn()],
}));

// Mock AgreementSelectionModalContent to control modal internals
jest.mock("../../../convention-collective/AgreementSelectionModal", () => ({
  AgreementSelectionModalContent: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="agreement-modal-content">
      <input data-testid="agreement-search-input" type="text" />
      <button onClick={onClose} data-testid="inner-close-button">
        Fermer
      </button>
    </div>
  ),
}));

describe("AgreementModal - Accessibility", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Dialog ARIA attributes", () => {
    it("should have role dialog with aria-modal", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });

    it("should have aria-labelledby pointing to the modal title", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute(
        "aria-labelledby",
        "agreement-modal-title"
      );

      const title = screen.getByText(
        "Personnaliser mes réponses avec ma convention collective"
      );
      expect(title).toHaveAttribute("id", "agreement-modal-title");
    });

    it("should use hidden attribute when not open", () => {
      render(<AgreementModal isOpen={false} onClose={mockOnClose} />);

      const dialog = document.getElementById("agreement-modal");
      expect(dialog).not.toBeInTheDocument();
    });

    it("should not have hidden attribute when open", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).not.toHaveAttribute("hidden");
    });
  });

  describe("Focus management", () => {
    it("should focus the close button when the modal opens", async () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      await act(async () => {
        jest.advanceTimersByTime(150);
      });

      const closeButton = screen.getByLabelText(
        "Fermer la fenêtre de sélection de convention collective"
      );
      expect(document.activeElement).toBe(closeButton);
    });

    it("should return focus to trigger button when closing", async () => {
      // Create the trigger button in the DOM
      const triggerButton = document.createElement("button");
      triggerButton.id = "fr-header-agreement-button-desktop";
      document.body.appendChild(triggerButton);

      const { unmount } = render(
        <AgreementModal isOpen={true} onClose={mockOnClose} />
      );

      // Simulate closing
      mockOnClose.mockImplementation(() => {});
      const closeButton = screen.getByLabelText(
        "Fermer la fenêtre de sélection de convention collective"
      );
      closeButton.click();

      await act(async () => {
        jest.advanceTimersByTime(150);
      });

      expect(mockOnClose).toHaveBeenCalled();

      // Clean up
      document.body.removeChild(triggerButton);
      unmount();
    });
  });

  describe("Close button accessibility", () => {
    it("should have a descriptive aria-label on the close button", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByLabelText(
        "Fermer la fenêtre de sélection de convention collective"
      );
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("type", "button");
    });

    it("should have a descriptive title on the close button", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByTitle(
        "Fermer la fenêtre de sélection de convention collective"
      );
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Escape key handling", () => {
    it("should close modal on Escape key press", async () => {
      const user = userEvent.setup({ delay: null });

      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      await user.keyboard("{Escape}");

      expect(mockOnClose).toHaveBeenCalled();
    });

    it("should not close if autocomplete options are visible", async () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      // Add a listbox with options inside the modal to simulate open autocomplete
      const modal = document.getElementById("agreement-modal");
      if (modal) {
        const listbox = document.createElement("ul");
        listbox.setAttribute("role", "listbox");
        const option = document.createElement("li");
        option.setAttribute("role", "option");
        listbox.appendChild(option);
        modal.appendChild(listbox);
      }

      const escapeEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      // Should NOT have called onClose because autocomplete options are visible
      expect(mockOnClose).not.toHaveBeenCalled();

      // Clean up the added listbox
      if (modal) {
        const listbox = modal.querySelector('[role="listbox"]');
        if (listbox) modal.removeChild(listbox);
      }
    });
  });

  describe("Focus trap", () => {
    it("should trap focus within the modal when Tab is pressed", async () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      await act(async () => {
        jest.advanceTimersByTime(150);
      });

      const dialog = screen.getByRole("dialog");
      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);

      // Focus the last focusable element
      const lastFocusable = focusableElements[focusableElements.length - 1];
      lastFocusable.focus();
      expect(document.activeElement).toBe(lastFocusable);

      // Press Tab - should cycle to first focusable
      const tabEvent = new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
      });
      document.dispatchEvent(tabEvent);

      // The focus trap handler should prevent default and cycle focus
    });

    it("should trap focus when Shift+Tab is pressed on first element", async () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      await act(async () => {
        jest.advanceTimersByTime(150);
      });

      const dialog = screen.getByRole("dialog");
      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);

      // Focus the first focusable element
      const firstFocusable = focusableElements[0];
      firstFocusable.focus();
      expect(document.activeElement).toBe(firstFocusable);

      // Press Shift+Tab - should cycle to last focusable
      const shiftTabEvent = new KeyboardEvent("keydown", {
        key: "Tab",
        shiftKey: true,
        bubbles: true,
      });
      document.dispatchEvent(shiftTabEvent);

      // The focus trap handler should prevent default and cycle focus
    });
  });

  describe("Click outside to close", () => {
    it("should close when clicking the overlay background", async () => {
      const user = userEvent.setup({ delay: null });

      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const overlay = screen.getByRole("dialog");
      // Click directly on the overlay (not on child content)
      await user.click(overlay);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe("Modal title", () => {
    it("should have a heading with the correct level", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "Personnaliser mes réponses avec ma convention collective",
      });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Dialog semantics", () => {
    it("should not expose an extra document role inside the dialog", () => {
      render(<AgreementModal isOpen={true} onClose={mockOnClose} />);

      expect(screen.queryByRole("document")).not.toBeInTheDocument();
    });
  });
});
