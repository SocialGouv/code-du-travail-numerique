import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContributionRating } from "../ContributionRating";
import { trackContributionRating } from "../tracking";

jest.mock("../tracking", () => ({
  trackContributionRating: jest.fn().mockResolvedValue(undefined),
}));

const mockTrack = trackContributionRating as jest.MockedFunction<
  typeof trackContributionRating
>;

const props = {
  contributionSlug: "conges-payes-1234",
};

const star = (name: string) => screen.getByRole("radio", { name });

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ContributionRating", () => {
  it("shows 5 unselected stars and a disabled Valider button", () => {
    render(<ContributionRating {...props} />);

    const stars = screen.getAllByRole("radio");
    expect(stars).toHaveLength(5);
    stars.forEach((input) => expect(input).not.toBeChecked());
    expect(
      screen.getByRole("group", {
        name: "Notez la clarté du contenu de cette page",
      })
    ).toBeInTheDocument();
    // No default score: the user has to pick a star before submitting.
    expect(screen.getByRole("button", { name: "Valider" })).toBeDisabled();
    expect(screen.queryByText("Merci !")).not.toBeInTheDocument();
  });

  it("gives each star an accessible name with its score and label", () => {
    render(<ContributionRating {...props} />);

    expect(star("1 étoile sur 5 : Trop compliqué")).toBeInTheDocument();
    expect(star("5 étoiles sur 5 : Très clair")).toBeInTheDocument();
  });

  it("shows the selected star label and enables the Valider button", () => {
    render(<ContributionRating {...props} />);

    fireEvent.click(star("2 étoiles sur 5 : Compliqué"));

    expect(star("2 étoiles sur 5 : Compliqué")).toBeChecked();
    expect(screen.getByText("Compliqué")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Valider" })).toBeEnabled();
  });

  it("shows the hint under the question", () => {
    render(<ContributionRating {...props} />);

    expect(
      screen.getByText("Sélectionnez de 1 à 5 étoiles pour noter la page.")
    ).toBeInTheDocument();
  });

  it("sends the score on Valider, shows « Merci ! » and moves focus", async () => {
    render(<ContributionRating {...props} />);

    fireEvent.click(star("4 étoiles sur 5 : Clair"));
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));

    expect(mockTrack).toHaveBeenCalledWith({
      contributionSlug: "conges-payes-1234",
      value: 4,
    });

    const confirmation = await screen.findByText("Merci !");
    expect(confirmation).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Valider" })
    ).not.toBeInTheDocument();
    // Stars stay visible but can no longer be changed.
    screen
      .getAllByRole("radio")
      .forEach((input) => expect(input).toBeDisabled());
    // Focus is set on the wrapping <p> (the text lives in a <span>).
    const confirmationParagraph = confirmation.closest("p");
    await waitFor(() => expect(confirmationParagraph).toHaveFocus());
  });

  it("shows a ratable widget again after remount (no persistence, GDPR-friendly)", async () => {
    const { unmount } = render(<ContributionRating {...props} />);
    fireEvent.click(star("4 étoiles sur 5 : Clair"));
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));
    await screen.findByText("Merci !");
    expect(mockTrack).toHaveBeenCalledTimes(1);
    unmount();

    // Simulated reload: nothing is kept client side (no localStorage), the
    // widget starts over and the user can rate again.
    render(<ContributionRating {...props} />);

    expect(screen.queryByText("Merci !")).not.toBeInTheDocument();
    fireEvent.click(star("5 étoiles sur 5 : Très clair"));
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));
    await screen.findByText("Merci !");
    expect(mockTrack).toHaveBeenCalledTimes(2);
    expect(mockTrack).toHaveBeenLastCalledWith({
      contributionSlug: "conges-payes-1234",
      value: 5,
    });
  });
});
