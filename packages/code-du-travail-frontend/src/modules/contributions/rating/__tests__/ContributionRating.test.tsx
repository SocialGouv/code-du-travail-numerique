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

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ContributionRating", () => {
  it("affiche la position par défaut « Neutre » et le bouton Valider actif", () => {
    render(<ContributionRating {...props} />);

    expect(screen.getByText("Neutre")).toBeInTheDocument();
    // Le bouton est actif d'emblée : l'usager peut valider la position par
    // défaut « Neutre » sans avoir à bouger le curseur.
    expect(screen.getByRole("button", { name: "Valider" })).toBeEnabled();
    expect(screen.queryByText("Merci !")).not.toBeInTheDocument();
  });

  it("met à jour le libellé visible et aria-valuetext au déplacement", () => {
    render(<ContributionRating {...props} />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-valuetext", "Neutre");

    fireEvent.change(slider, { target: { value: "2" } });

    expect(slider).toHaveAttribute("aria-valuetext", "Compliqué");
    expect(screen.getByText("Compliqué")).toBeInTheDocument();
  });

  it("affiche le texte d'aide sous la question", () => {
    render(<ContributionRating {...props} />);

    expect(
      screen.getByText("Faites bouger le curseur pour noter la page.")
    ).toBeInTheDocument();
  });

  it("transmet la note au clic sur Valider, affiche « Merci ! » et déplace le focus", async () => {
    render(<ContributionRating {...props} />);

    fireEvent.change(screen.getByRole("slider"), { target: { value: "4" } });
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
    // Le focus est posé sur le <p> conteneur (le texte est dans un <span>).
    const confirmationParagraph = confirmation.closest("p");
    await waitFor(() => expect(confirmationParagraph).toHaveFocus());
  });

  it("au remontage (rechargement), ré-affiche le widget notable (aucune persistance, RGPD-friendly)", async () => {
    const { unmount } = render(<ContributionRating {...props} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));
    await screen.findByText("Merci !");
    expect(mockTrack).toHaveBeenCalledTimes(1);
    unmount();

    // Rechargement simulé : aucune trace côté client (pas de localStorage), le
    // widget repart de zéro et l'usager peut noter à nouveau.
    render(<ContributionRating {...props} />);

    expect(screen.queryByText("Merci !")).not.toBeInTheDocument();
    const validateButton = screen.getByRole("button", { name: "Valider" });
    expect(validateButton).toBeInTheDocument();

    fireEvent.click(validateButton);
    await screen.findByText("Merci !");
    expect(mockTrack).toHaveBeenCalledTimes(2);
  });
});
