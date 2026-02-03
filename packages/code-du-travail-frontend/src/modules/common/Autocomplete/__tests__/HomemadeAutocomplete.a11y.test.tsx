import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomemadeAutocomplete, A11Y_MESSAGES } from "../HomemadeAutocomplete";

describe("HomemadeAutocomplete - Accessibility", () => {
  const mockSearch = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should have a live region with role status for screen readers", () => {
    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
      />
    );

    const liveRegion = screen.getByRole("status");
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveAttribute("aria-atomic", "true");
    expect(liveRegion).toHaveAttribute("aria-relevant", "additions text");
  });

  it("should announce the number of results when results are available", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1", "résultat 2", "résultat 3"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole("combobox");

    await act(async () => {
      await user.type(input, "test");
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe(A11Y_MESSAGES.RESULT_COUNT(3));
  });

  it("should announce when there are no results", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue([]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        displayNoResult={true}
      />
    );

    const input = screen.getByRole("combobox");

    await act(async () => {
      await user.type(input, "test");
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe(A11Y_MESSAGES.NO_RESULTS);
  });

  it("should announce when an item is selected", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1", "résultat 2"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByRole("combobox");

    await act(async () => {
      await user.type(input, "test");
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(
      screen.getByRole("option", { name: /résultat 1/i })
    ).toBeInTheDocument();

    const option = screen.getByRole("option", { name: /résultat 1/i });
    await user.click(option);

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe(A11Y_MESSAGES.SELECTED("résultat 1"));
  });

  it("should use external status message when provided", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        a11yExternalStatusMessage="Nous recherchons les bons résultats"
      />
    );

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe("Nous recherchons les bons résultats");
  });

  it("should clear live region message when external status is empty", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        a11yExternalStatusMessage=""
      />
    );

    const input = screen.getByRole("combobox");

    await act(async () => {
      await user.type(input, "test");
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe(A11Y_MESSAGES.RESULT_COUNT(1));
  });

  it("should announce navigation instructions when results are highlighted", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1", "résultat 2"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
      />
    );

    const input = screen.getByRole("combobox");

    await act(async () => {
      await user.type(input, "test");
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(
      screen.getByRole("option", { name: /résultat 1/i })
    ).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe(
      A11Y_MESSAGES.RESULT_COUNT_WITH_HINT(2)
    );
  });

  it("should have proper combobox ARIA attributes", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        id="test-autocomplete"
      />
    );

    const input = screen.getByRole("combobox");

    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-controls", "test-autocomplete-listbox");

    await user.type(input, "test");

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("should update aria-activedescendant when navigating with keyboard", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue(["résultat 1", "résultat 2"]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        id="test-autocomplete"
      />
    );

    const input = screen.getByRole("combobox");

    await act(async () => {
      await user.type(input, "test");
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(
      screen.getByRole("option", { name: /résultat 1/i })
    ).toBeInTheDocument();

    expect(input).not.toHaveAttribute("aria-activedescendant");

    await user.keyboard("{ArrowDown}");

    expect(input).toHaveAttribute(
      "aria-activedescendant",
      "test-autocomplete-listbox-option-0"
    );

    await user.keyboard("{ArrowDown}");

    expect(input).toHaveAttribute(
      "aria-activedescendant",
      "test-autocomplete-listbox-option-1"
    );
  });

  it("should respect minQueryLengthForNoResultsA11y prop", async () => {
    const user = userEvent.setup({ delay: null });
    mockSearch.mockResolvedValue([]);

    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        minQueryLengthForNoResultsA11y={3}
      />
    );

    const input = screen.getByRole("combobox");

    // Type only 2 characters (below threshold)
    await user.type(input, "te");

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    const liveRegion = screen.getByRole("status");
    expect(liveRegion.textContent).toBe("");

    // Type 3 characters (at threshold)
    await user.type(input, "s");

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(liveRegion.textContent).toBe(A11Y_MESSAGES.NO_RESULTS);
  });

  it("should properly link input to label with disableNativeLabelAssociation", () => {
    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        id="test-input"
        disableNativeLabelAssociation={true}
        listboxAriaLabelledby="custom-label-id"
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("id", "test-input");

    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveAttribute("aria-labelledby", "custom-label-id");
  });

  it("should connect input to external describedby elements", () => {
    render(
      <HomemadeAutocomplete
        search={mockSearch}
        displayLabel={(item: string | null) => item ?? ""}
        label="Test input"
        ariaDescribedby="hint-id error-id"
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-describedby", "hint-id error-id");
  });
});
