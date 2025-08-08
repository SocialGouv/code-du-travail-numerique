import React from "react";
import { render } from "@testing-library/react";
import DefaultLayout from "../DefaultLayout";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock other components
jest.mock("../MatomoAnalytics", () => ({
  MatomoAnalytics: () => <div data-testid="matomo-analytics" />,
}));

jest.mock("../StartDsfrLight", () => {
  const actual = jest.requireActual("../StartDsfrLight");
  const spy = jest.fn((props: any) => <actual.StartDsfrLight {...props} />);
  return { StartDsfrLight: spy };
});

// Importez le composant mocké (qui est maintenant le spy)
import { StartDsfrLight } from "../StartDsfrLight";

jest.mock("../../sentry", () => ({
  SentryTest: () => <div data-testid="sentry-test" />,
}));

jest.mock("../../cookie-consent", () => ({
  ConsentManager: () => <div data-testid="consent-manager" />,
}));

describe("DefaultLayout with localStorage access denied", () => {
  // Store original console.error
  const originalConsoleError = console.error;
  // Store original localStorage descriptor
  const originalLocalStorageDescriptor = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  );

  beforeEach(() => {
    // Mock console.error to prevent test output noise
    console.error = jest.fn();

    // Mock localStorage to throw an error when accessed
    const localStorageError = new Error(
      "Failed to read the 'localStorage' property from 'Window': Access is denied for this document."
    );

    // @ts-ignore -- Ignore TS error for delete on non-optional property
    delete window.localStorage;

    // Replace localStorage with a getter that throws
    Object.defineProperty(window, "localStorage", {
      get: () => {
        process.stdout.write(
          "LocalStorage accessed! Caller stack: " + new Error().stack + "\n"
        );
        throw localStorageError;
      },
      configurable: true,
      enumerable: true,
    });
  });

  afterEach(() => {
    // Restore original implementations
    jest.clearAllMocks();
    console.error = originalConsoleError;

    // Restore original localStorage descriptor
    // @ts-ignore -- Ignore TS error for delete on non-optional property
    delete window.localStorage;
    if (originalLocalStorageDescriptor) {
      Object.defineProperty(
        window,
        "localStorage",
        originalLocalStorageDescriptor
      );
    }
  });

  it("should not render StartDsfrLight for widget pages", () => {
    // Mock usePathname to return a widget path
    const { usePathname } = require("next/navigation");
    usePathname.mockReturnValue("/widgets/search");

    render(
      <DefaultLayout nonce="test-nonce" defaultColorScheme="light">
        <div>Test Content</div>
      </DefaultLayout>
    );

    // StartDsfrLight ne devrait pas avoir été appelé
    expect(StartDsfrLight).not.toHaveBeenCalled();
  });

  it("should render StartDsfrLight for non-widget pages", () => {
    // Mock usePathname to return a non-widget path
    const { usePathname } = require("next/navigation");
    usePathname.mockReturnValue("/recherche");

    render(
      <DefaultLayout nonce="test-nonce" defaultColorScheme="light">
        <div>Test Content</div>
      </DefaultLayout>
    );

    // StartDsfrLight devrait avoir été appelé
    expect(StartDsfrLight).toHaveBeenCalled();
  });
});
