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
  contributionTitle: "Congés payés",
};

beforeEach(() => {
  jest.clearAllMocks();
  // Dédup persistante (localStorage) : on repart d'un état vierge à chaque test.
  localStorage.clear();
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

  it("relie le curseur au texte d'aide via aria-describedby", () => {
    render(<ContributionRating {...props} />);
    const slider = screen.getByRole("slider");
    const describedBy = slider.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      "Faites bouger le curseur pour noter la page."
    );
  });

  it("transmet la note au clic sur Valider, affiche « Merci ! » et déplace le focus", async () => {
    render(<ContributionRating {...props} />);

    fireEvent.change(screen.getByRole("slider"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));

    expect(mockTrack).toHaveBeenCalledWith({
      contributionSlug: "conges-payes-1234",
      contributionTitle: "Congés payés",
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

  it("au remontage, conserve l'état « noté » (dédup persistante) et n'émet pas un 2e event", async () => {
    const { unmount } = render(<ContributionRating {...props} />);
    fireEvent.change(screen.getByRole("slider"), { target: { value: "4" } });
    fireEvent.click(screen.getByRole("button", { name: "Valider" }));
    await screen.findByText("Merci !");
    expect(mockTrack).toHaveBeenCalledTimes(1);
    unmount();

    // Rechargement simulé : la contribution est marquée notée en localStorage,
    // on réaffiche directement la confirmation sans bouton « Valider ».
    render(<ContributionRating {...props} />);

    expect(await screen.findByText("Merci !")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Valider" })
    ).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledTimes(1);
  });
});
