import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import { ContactJourney } from "../ContactJourney";

const emitSelectTheme = jest.fn();
const emitTrackNumber = jest.fn();

jest.mock("../tracking", () => ({
  useNeedMoreInfoEvents: () => ({
    emitSelectTheme,
    emitTrackNumber,
    emitModalIsOpened: jest.fn(),
  }),
}));

const getSuivant = () => screen.queryByRole("button", { name: "Suivant" });

const getPrecedent = () => screen.queryByRole("button", { name: "Précédent" });

// Le thème se choisit via un <select> (data-testid="contact-theme").
const getThemeSelect = () =>
  screen.getByTestId("contact-theme") as HTMLSelectElement;

const selectTheme = (value: string) =>
  fireEvent.change(getThemeSelect(), { target: { value } });

describe("<ContactJourney />", () => {
  beforeEach(() => {
    emitSelectTheme.mockClear();
    emitTrackNumber.mockClear();
  });

  it("demande de choisir un thème plutôt que de griser « Suivant »", () => {
    render(<ContactJourney />);

    // Le bouton reste actionnable : c'est l'erreur qui explique ce qui bloque.
    expect(getSuivant()).toBeEnabled();

    fireEvent.click(getSuivant()!);
    expect(
      screen.getByText("Sélectionnez un thème pour continuer.")
    ).toBeInTheDocument();
    expect(emitSelectTheme).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId("contact-phone-result")
    ).not.toBeInTheDocument();

    // Choisir un thème efface l'erreur et débloque le parcours.
    selectTheme("secteur-prive");
    expect(
      screen.queryByText("Sélectionnez un thème pour continuer.")
    ).not.toBeInTheDocument();

    fireEvent.click(getSuivant()!);
    expect(screen.getByTestId("contact-phone-result")).toBeInTheDocument();
  });

  it("affiche le numéro de téléphone cliquable pour le secteur privé", () => {
    render(<ContactJourney />);
    selectTheme("secteur-prive");
    fireEvent.click(getSuivant()!);

    expect(emitSelectTheme).toHaveBeenCalledWith("secteur-prive");

    const phone = screen.getByRole("link", { name: /0 806 000 126/ });
    expect(phone).toHaveAttribute("href", "tel:0806000126");

    fireEvent.click(phone);
    expect(emitTrackNumber).toHaveBeenCalled();

    // Écran de résultat : plus de bouton « Suivant ».
    expect(getSuivant()).not.toBeInTheDocument();
  });

  it("bloque le parcours sur l'écran de sélection pour un thème hors périmètre", () => {
    render(<ContactJourney />);
    selectTheme("secteur-public");
    fireEvent.click(getSuivant()!);

    expect(emitSelectTheme).toHaveBeenCalledWith("secteur-public");

    const alert = screen.getByTestId("contact-error-result");
    expect(alert).toHaveTextContent("Nous ne traitons pas ces demandes");
    expect(alert).toHaveTextContent(
      /Nous traitons uniquement les questions concernant le droit du travail/
    );
    expect(alert).toHaveTextContent(
      /droits des fonctionnaires et contractuels/
    );

    const externalLink = within(alert).getByRole("link", {
      name: /portail de la fonction publique/,
    });
    expect(externalLink).toHaveAttribute(
      "href",
      "https://www.fonction-publique.gouv.fr"
    );
    expect(externalLink).toHaveAttribute("target", "_blank");

    // On reste sur l'écran de sélection : pas de résultat, « Suivant » toujours là.
    expect(
      screen.queryByTestId("contact-phone-result")
    ).not.toBeInTheDocument();
    expect(getThemeSelect()).toBeInTheDocument();
    expect(getSuivant()).toBeInTheDocument();
  });

  it("efface l'erreur hors périmètre dès qu'un nouveau thème est choisi", () => {
    render(<ContactJourney />);
    selectTheme("secteur-public");
    fireEvent.click(getSuivant()!);
    expect(screen.getByTestId("contact-error-result")).toBeInTheDocument();

    selectTheme("secteur-prive");
    expect(
      screen.queryByTestId("contact-error-result")
    ).not.toBeInTheDocument();

    fireEvent.click(getSuivant()!);
    expect(screen.getByTestId("contact-phone-result")).toBeInTheDocument();
  });

  it("revient à l'écran de sélection en conservant le thème choisi", () => {
    render(<ContactJourney />);
    selectTheme("secteur-prive");
    fireEvent.click(getSuivant()!);

    expect(screen.getByTestId("contact-phone-result")).toBeInTheDocument();

    fireEvent.click(getPrecedent()!);

    expect(
      screen.queryByTestId("contact-phone-result")
    ).not.toBeInTheDocument();
    expect(getThemeSelect().value).toBe("secteur-prive");
    expect(getSuivant()).toBeEnabled();
    expect(getPrecedent()).not.toBeInTheDocument();
  });
});
