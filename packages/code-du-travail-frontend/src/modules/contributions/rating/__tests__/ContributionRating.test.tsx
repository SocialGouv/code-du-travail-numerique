import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContributionRating } from "../ContributionRating";
import {
  trackRatingReasons,
  trackRatingRemark,
  trackRatingScore,
  trackRatingSuggestion,
} from "../tracking";
import {
  RATING_CONFIRMATION_TEXT,
  RATING_REASON_LABELS,
  RATING_REASONS_ERROR,
  RATING_REASONS_TITLE,
  RATING_REMARK_BUTTON,
  RATING_REMARK_TITLE,
  RATING_SUGGESTION_ERROR,
  RATING_SUGGESTION_LABEL,
  RATING_SUGGESTION_WITH_REASONS_ERROR,
  RATING_WIDGET_TITLE,
  RatingReason,
} from "../constants";

jest.mock("../tracking", () => ({
  trackRatingScore: jest.fn().mockResolvedValue(undefined),
  trackRatingReasons: jest.fn().mockResolvedValue(undefined),
  trackRatingRemark: jest.fn().mockResolvedValue(undefined),
  trackRatingSuggestion: jest.fn().mockResolvedValue(undefined),
}));

const mockTrackScore = trackRatingScore as jest.MockedFunction<
  typeof trackRatingScore
>;
const mockTrackReasons = trackRatingReasons as jest.MockedFunction<
  typeof trackRatingReasons
>;
const mockTrackRemark = trackRatingRemark as jest.MockedFunction<
  typeof trackRatingRemark
>;
const mockTrackSuggestion = trackRatingSuggestion as jest.MockedFunction<
  typeof trackRatingSuggestion
>;

const contributionSlug = "conges-payes-1234";

const star = (name: string) => screen.getByRole("button", { name });
const STAR_1 = "1 étoile sur 3 : Pas clair";
const STAR_2 = "2 étoiles sur 3 : En partie";
const STAR_3 = "3 étoiles sur 3 : Très clair";

const remarkButton = () =>
  screen.queryByRole("button", { name: RATING_REMARK_BUTTON });
const sendButton = () => screen.getByRole("button", { name: "Envoyer" });
const reasonCheckbox = (reason: RatingReason) =>
  screen.getByRole("checkbox", { name: RATING_REASON_LABELS[reason] });

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ContributionRating", () => {
  it("shows the heading, 3 unpressed stars with visible labels and the remark button", () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);

    expect(screen.getByText("Aidez-nous à nous améliorer")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /est-il clair/ })
    ).toBeInTheDocument();
    const group = screen.getByRole("group", { name: RATING_WIDGET_TITLE });
    expect(group).toBeInTheDocument();

    [STAR_1, STAR_2, STAR_3].forEach((name) => {
      expect(star(name)).toHaveAttribute("aria-pressed", "false");
      expect(star(name)).not.toHaveAttribute("aria-disabled");
    });
    ["Pas clair", "En partie", "Très clair"].forEach((label) =>
      expect(screen.getByText(label)).toBeVisible()
    );
    expect(remarkButton()).toBeInTheDocument();
    expect(
      screen.queryByText(RATING_CONFIRMATION_TEXT)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Valider" })
    ).not.toBeInTheDocument();
  });

  it("records a score of 3 immediately, locks the stars and shows the thank-you message", async () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);

    fireEvent.click(star(STAR_3));

    expect(mockTrackScore).toHaveBeenCalledTimes(1);
    expect(mockTrackScore).toHaveBeenCalledWith({ contributionSlug, value: 3 });
    expect(star(STAR_3)).toHaveAttribute("aria-pressed", "true");
    [STAR_1, STAR_2, STAR_3].forEach((name) => {
      expect(star(name)).toHaveAttribute("aria-disabled", "true");
      // aria-disabled, not disabled: the chosen state stays reachable.
      expect(star(name)).toBeEnabled();
    });
    expect(
      screen.queryByRole("heading", { name: RATING_REASONS_TITLE })
    ).not.toBeInTheDocument();

    const confirmation = await screen.findByText(RATING_CONFIRMATION_TEXT);
    // Focus is set on the wrapping <p> (the text lives in a <span>).
    await waitFor(() => expect(confirmation.closest("p")).toHaveFocus());
    // The remark button stays available after the thank-you message.
    expect(remarkButton()).toBeInTheDocument();
  });

  it("never records a second score once locked", () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);

    fireEvent.click(star(STAR_3));
    fireEvent.click(star(STAR_3));
    fireEvent.click(star(STAR_1));

    expect(mockTrackScore).toHaveBeenCalledTimes(1);
    expect(star(STAR_1)).toHaveAttribute("aria-pressed", "false");
    expect(star(STAR_3)).toHaveAttribute("aria-pressed", "true");
  });

  it.each([
    [1, STAR_1],
    [2, STAR_2],
  ])(
    "opens the reasons panel with focus on its heading after a score of %i",
    async (value, name) => {
      render(<ContributionRating contributionSlug={contributionSlug} />);

      fireEvent.click(star(name));

      expect(mockTrackScore).toHaveBeenCalledWith({ contributionSlug, value });
      const panelHeading = screen.getByRole("heading", {
        level: 3,
        name: RATING_REASONS_TITLE,
      });
      await waitFor(() => expect(panelHeading).toHaveFocus());
      Object.values(RatingReason).forEach((reason) =>
        expect(reasonCheckbox(reason)).not.toBeChecked()
      );
      expect(
        screen.getByRole("textbox", { name: RATING_SUGGESTION_LABEL })
      ).toBeInTheDocument();
      expect(screen.getByText("500 caractères restants")).toBeInTheDocument();
      // No thank-you yet, and the remark button is hidden while a panel is open.
      expect(
        screen.queryByText(RATING_CONFIRMATION_TEXT)
      ).not.toBeInTheDocument();
      expect(remarkButton()).not.toBeInTheDocument();
    }
  );

  it("uses the next heading level for the panel heading", () => {
    render(
      <ContributionRating contributionSlug={contributionSlug} level={3} />
    );

    fireEvent.click(star(STAR_1));

    expect(
      screen.getByRole("heading", { level: 4, name: RATING_REASONS_TITLE })
    ).toBeInTheDocument();
  });

  it("shows DSFR errors and sends nothing when the reasons panel is empty", () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);
    fireEvent.click(star(STAR_2));

    fireEvent.click(sendButton());

    expect(screen.getByText(RATING_REASONS_ERROR)).toBeInTheDocument();
    expect(
      screen.getByText(RATING_SUGGESTION_WITH_REASONS_ERROR)
    ).toBeInTheDocument();
    expect(mockTrackReasons).not.toHaveBeenCalled();
    expect(mockTrackSuggestion).not.toHaveBeenCalled();
    expect(
      screen.queryByText(RATING_CONFIRMATION_TEXT)
    ).not.toBeInTheDocument();
  });

  it("sends the checked reasons and the trimmed suggestion, then thanks", async () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);
    fireEvent.click(star(STAR_1));

    fireEvent.click(reasonCheckbox(RatingReason.DIFFICULT_TEXT));
    fireEvent.click(reasonCheckbox(RatingReason.WRONG_INFORMATION));
    const textarea = screen.getByRole("textbox", {
      name: RATING_SUGGESTION_LABEL,
    });
    fireEvent.change(textarea, { target: { value: "  Trop long  " } });
    expect(screen.getByText("487 caractères restants")).toBeInTheDocument();
    fireEvent.click(sendButton());

    expect(mockTrackReasons).toHaveBeenCalledTimes(1);
    expect(mockTrackReasons).toHaveBeenCalledWith({
      contributionSlug,
      reasons: [RatingReason.DIFFICULT_TEXT, RatingReason.WRONG_INFORMATION],
    });
    expect(mockTrackSuggestion).toHaveBeenCalledWith({
      contributionSlug,
      text: "Trop long",
    });
    expect(
      screen.queryByRole("heading", { name: RATING_REASONS_TITLE })
    ).not.toBeInTheDocument();
    const confirmation = await screen.findByText(RATING_CONFIRMATION_TEXT);
    await waitFor(() => expect(confirmation.closest("p")).toHaveFocus());
    expect(remarkButton()).toBeInTheDocument();
  });

  it("accepts reasons only (no suggestion event without text)", () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);
    fireEvent.click(star(STAR_1));

    fireEvent.click(reasonCheckbox(RatingReason.HOW_TO_APPLY));
    fireEvent.click(sendButton());

    expect(mockTrackReasons).toHaveBeenCalledWith({
      contributionSlug,
      reasons: [RatingReason.HOW_TO_APPLY],
    });
    expect(mockTrackSuggestion).not.toHaveBeenCalled();
    expect(screen.getByText(RATING_CONFIRMATION_TEXT)).toBeInTheDocument();
  });

  it("opens the suggestion-only remark panel, validates it and hides the button once sent", async () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);

    fireEvent.click(remarkButton()!);

    expect(mockTrackRemark).toHaveBeenCalledWith({ contributionSlug });
    const panelHeading = screen.getByRole("heading", {
      level: 3,
      name: RATING_REMARK_TITLE,
    });
    await waitFor(() => expect(panelHeading).toHaveFocus());
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(remarkButton()).not.toBeInTheDocument();
    const textarea = screen.getByRole("textbox", { name: RATING_REMARK_TITLE });
    expect(textarea).toHaveAccessibleDescription(/Donnez-nous votre avis/);

    // Empty text: error, nothing sent.
    fireEvent.click(sendButton());
    expect(screen.getByText(RATING_SUGGESTION_ERROR)).toBeInTheDocument();
    expect(mockTrackSuggestion).not.toHaveBeenCalled();

    fireEvent.change(textarea, { target: { value: "Ajoutez un exemple" } });
    fireEvent.click(sendButton());

    expect(mockTrackSuggestion).toHaveBeenCalledWith({
      contributionSlug,
      text: "Ajoutez un exemple",
    });
    expect(mockTrackReasons).not.toHaveBeenCalled();
    expect(
      await screen.findByText(RATING_CONFIRMATION_TEXT)
    ).toBeInTheDocument();
    expect(remarkButton()).not.toBeInTheDocument();
    // No score was given: the stars are still usable.
    expect(star(STAR_3)).not.toHaveAttribute("aria-disabled");
  });

  it("keeps the stars usable while the remark panel is open and switches to the reasons panel on a low score", async () => {
    render(<ContributionRating contributionSlug={contributionSlug} />);
    fireEvent.click(remarkButton()!);
    fireEvent.change(
      screen.getByRole("textbox", { name: RATING_REMARK_TITLE }),
      { target: { value: "Mon texte" } }
    );

    fireEvent.click(star(STAR_2));

    expect(mockTrackScore).toHaveBeenCalledWith({ contributionSlug, value: 2 });
    const panelHeading = screen.getByRole("heading", {
      name: RATING_REASONS_TITLE,
    });
    await waitFor(() => expect(panelHeading).toHaveFocus());
    // The text already typed is kept.
    expect(
      screen.getByRole("textbox", { name: RATING_SUGGESTION_LABEL })
    ).toHaveValue("Mon texte");
  });

  it("shows a ratable widget again after remount (no persistence, GDPR-friendly)", () => {
    const { unmount } = render(
      <ContributionRating contributionSlug={contributionSlug} />
    );
    fireEvent.click(star(STAR_3));
    expect(mockTrackScore).toHaveBeenCalledTimes(1);
    unmount();

    // Simulated reload: nothing is kept client side (no localStorage), the
    // widget starts over and the user can rate again.
    render(<ContributionRating contributionSlug={contributionSlug} />);
    fireEvent.click(star(STAR_1));

    expect(mockTrackScore).toHaveBeenCalledTimes(2);
    expect(mockTrackScore).toHaveBeenLastCalledWith({
      contributionSlug,
      value: 1,
    });
  });
});
