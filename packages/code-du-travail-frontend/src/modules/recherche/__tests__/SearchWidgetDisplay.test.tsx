import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchWidgetDisplay } from "../SearchWidgetDisplay";
import { MatomoWidgetEvent, useSearchTracking } from "../tracking";

// Mock the useIframeResizer hook
jest.mock("../../utils/useIframeResizer", () => ({
  useIframeResizer: jest.fn(),
}));

// Mock the useSearchTracking hook
jest.mock("../tracking", () => ({
  useSearchTracking: jest.fn(),
  MatomoWidgetEvent: {
    CLICK_LOGO: "click_logo",
    SUBMIT_SEARCH: "submit_search",
  },
}));

describe("SearchWidgetDisplay", () => {
  // Mock the tracking functions
  const mockEmitSearchEvent = jest.fn();
  const mockEmitWidgetEvent = jest.fn();
  const mockPostMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the mock implementation for useSearchTracking
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitSearchEvent: mockEmitSearchEvent,
      emitWidgetEvent: mockEmitWidgetEvent,
    });

    // Mock window.parent.postMessage
    Object.defineProperty(window, "parent", {
      value: {
        postMessage: mockPostMessage,
      },
      writable: true,
    });
  });

  it("should render the search widget correctly", () => {
    render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Check that the logo is rendered
    expect(
      screen.getByAltText("Code du travail numérique")
    ).toBeInTheDocument();

    // Check that the search input is rendered
    expect(screen.getByPlaceholderText("Période d'essai")).toBeInTheDocument();

    // Check that the search button is rendered
    expect(
      screen.getByRole("button", { name: "Rechercher" })
    ).toBeInTheDocument();
  });

  it("should emit widget event and post message when logo is clicked", () => {
    render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Find and click the logo
    const logo = screen.getByAltText("Code du travail numérique");
    fireEvent.click(logo);

    // Check that emitWidgetEvent was called with the correct event
    expect(mockEmitWidgetEvent).toHaveBeenCalledWith(
      MatomoWidgetEvent.CLICK_LOGO
    );

    // Check that postMessage was called with the correct parameters
    expect(mockPostMessage).toHaveBeenCalledWith(
      { name: "logo-link", kind: "click" },
      "*"
    );
  });

  it("should emit widget event and post message when form is submitted", () => {
    // Mock HTMLFormElement.prototype.querySelector
    const originalQuerySelector = HTMLFormElement.prototype.querySelector;
    HTMLFormElement.prototype.querySelector = jest
      .fn()
      .mockImplementation((selector) => {
        if (selector === 'input[name="query"]') {
          return { value: "" };
        }
        return null;
      });

    const { container } = render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Find the form
    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    // Create a mock for form.submit to prevent actual submission
    const mockSubmit = jest.fn();
    if (form) {
      form.submit = mockSubmit;
    }

    // Trigger the form submission
    fireEvent.submit(form as HTMLFormElement);

    // Check that emitWidgetEvent was called with the correct event
    expect(mockEmitWidgetEvent).toHaveBeenCalledWith(
      MatomoWidgetEvent.SUBMIT_SEARCH
    );

    // Check that postMessage was called with the correct parameters
    expect(mockPostMessage).toHaveBeenCalledWith(
      { name: "button-search", kind: "click" },
      "*"
    );

    // Restore original querySelector
    HTMLFormElement.prototype.querySelector = originalQuerySelector;
  });

  it("should emit search event when form is submitted with a query", () => {
    // Mock HTMLFormElement.prototype.querySelector
    const originalQuerySelector = HTMLFormElement.prototype.querySelector;
    HTMLFormElement.prototype.querySelector = jest
      .fn()
      .mockImplementation((selector) => {
        if (selector === 'input[name="query"]') {
          return { value: "test query" };
        }
        return null;
      });

    const { container } = render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Find the form
    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    // Create a mock for form.submit to prevent actual submission
    const mockSubmit = jest.fn();
    if (form) {
      form.submit = mockSubmit;
    }

    // Trigger the form submission
    fireEvent.submit(form as HTMLFormElement);

    // Check that emitSearchEvent was called with the query
    expect(mockEmitSearchEvent).toHaveBeenCalledWith("test query");

    // Restore original querySelector
    HTMLFormElement.prototype.querySelector = originalQuerySelector;
  });

  it("should not emit search event when form is submitted without a query", () => {
    // Mock HTMLFormElement.prototype.querySelector
    const originalQuerySelector = HTMLFormElement.prototype.querySelector;
    HTMLFormElement.prototype.querySelector = jest
      .fn()
      .mockImplementation((selector) => {
        if (selector === 'input[name="query"]') {
          return { value: "" };
        }
        return null;
      });

    const { container } = render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Find the form
    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    // Create a mock for form.submit to prevent actual submission
    const mockSubmit = jest.fn();
    if (form) {
      form.submit = mockSubmit;
    }

    // Trigger the form submission
    fireEvent.submit(form as HTMLFormElement);

    // Check that emitSearchEvent was not called
    expect(mockEmitSearchEvent).not.toHaveBeenCalled();

    // Restore original querySelector
    HTMLFormElement.prototype.querySelector = originalQuerySelector;
  });

  it("should call form.submit when form is submitted", () => {
    // Create a spy on HTMLFormElement.prototype.submit
    const submitSpy = jest
      .spyOn(HTMLFormElement.prototype, "submit")
      .mockImplementation(() => {});

    const { container } = render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Find the input and type a search query
    const input = screen.getByPlaceholderText("Période d'essai");
    fireEvent.change(input, { target: { value: "test query" } });

    // Find the form and submit it
    const form = container.querySelector("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    // Check that form.submit was called
    expect(submitSpy).toHaveBeenCalled();

    // Restore the original implementation
    submitSpy.mockRestore();
  });

  it("should trim the query before emitting search event", () => {
    // Mock HTMLFormElement.prototype.querySelector
    const originalQuerySelector = HTMLFormElement.prototype.querySelector;
    HTMLFormElement.prototype.querySelector = jest
      .fn()
      .mockImplementation((selector) => {
        if (selector === 'input[name="query"]') {
          return { value: "  test query  " };
        }
        return null;
      });

    const { container } = render(<SearchWidgetDisplay />, {
      legacyRoot: true,
    });

    // Find the form
    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    // Create a mock for form.submit to prevent actual submission
    const mockSubmit = jest.fn();
    if (form) {
      form.submit = mockSubmit;
    }

    // Trigger the form submission
    fireEvent.submit(form as HTMLFormElement);

    // Check that emitSearchEvent was called with the trimmed query
    expect(mockEmitSearchEvent).toHaveBeenCalledWith("test query");

    // Restore original querySelector
    HTMLFormElement.prototype.querySelector = originalQuerySelector;
  });
});
