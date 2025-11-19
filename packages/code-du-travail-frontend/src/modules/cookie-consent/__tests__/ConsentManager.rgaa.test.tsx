import { render, screen, waitFor, act } from "@testing-library/react";
import { ConsentManager } from "../ConsentManager";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
}));

jest.mock("../../utils/consent", () => ({
  initConsent: jest.fn(),
  DEFAULT_CONSENT: { matomo: true, sea: false, matomoHeatmap: false },
  getStoredConsent: jest.fn().mockImplementation(() => ({
    matomo: true,
    sea: false,
    matomoHeatmap: false,
  })),
  saveConsent: jest.fn(),
  ConsentType: {},
}));

describe("ConsentManager with manage cookies button", () => {
  beforeEach(() => {
    localStorage.setItem("cdtn-cookie-consent-given", "true");
    jest.useFakeTimers();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders the manage cookies button with visually hidden text for accessibility", async () => {
    render(<ConsentManager heatmapEnabled={true} adsEnabled={true} />);

    await act(async () => {
      jest.advanceTimersByTime(1500);
    });

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /Ouvrir les paramètres des cookies/i,
        })
      ).toBeInTheDocument();
    });

    const hiddenText = screen.getByText("Gérer les cookies");
    expect(hiddenText).toHaveClass("fr-sr-only");
    expect(hiddenText.tagName).toBe("SPAN");

    const button = screen.getByRole("button", {
      name: /Ouvrir les paramètres des cookies/i,
    });
    expect(button).toHaveAttribute(
      "title",
      "Ouvrir les paramètres des cookies"
    );
    expect(button).toHaveAttribute(
      "aria-label",
      "Ouvrir les paramètres des cookies"
    );
  });
});
