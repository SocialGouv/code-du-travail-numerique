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
    // Wording de l'issue #7370, repris tel quel.
    expect(alert).toHaveTextContent(
      /Votre demande concerne le secteur public.+elle ne relève pas des services de renseignements en droit du travail/
    );
    expect(alert).toHaveTextContent(
      /rapprochez-vous de vos organisations syndicales/
    );

    const externalLink = within(alert).getByRole("link", {
      name: /fonction-publique\.gouv\.fr/,
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

  // Wording de l'issue #7370 pour les trois autres thèmes hors périmètre.
  it.each([
    [
      "autorisation-travail-etranger",
      /Votre demande concerne la main-d'œuvre étrangère/,
      "administration-etrangers-en-france.gouv.fr",
      "https://administration-etrangers-en-france.gouv.fr",
    ],
    [
      "indemnisation-arret",
      /rapprochez-vous de votre caisse d'assurance maladie/,
      "ameli.fr",
      "https://www.ameli.fr/assure/adresses-et-contacts/un-autre-sujet",
    ],
    [
      "cotisations-salaire",
      /Votre demande ne relève pas des services de renseignements en droit du travail/,
      "URSSAF",
      "https://www.urssaf.fr/accueil/contacter-urssaf.html",
    ],
  ])("redirige le thème hors périmètre « %s »", (theme, text, link, href) => {
    render(<ContactJourney />);
    selectTheme(theme);
    fireEvent.click(getSuivant()!);

    const alert = screen.getByTestId("contact-error-result");
    expect(alert).toHaveTextContent(text as RegExp);

    const externalLink = within(alert).getByRole("link", {
      name: link as string,
    });
    expect(externalLink).toHaveAttribute("href", href as string);
    expect(externalLink).toHaveAttribute("target", "_blank");

    expect(
      screen.queryByTestId("contact-phone-result")
    ).not.toBeInTheDocument();
  });

  it("place « Suivant » avant les questions fréquentes, qui s'ouvrent dans un nouvel onglet", () => {
    render(<ContactJourney />);

    const heading = screen.getByText("Questions les plus fréquentes");
    // Node.compareDocumentPosition : le bouton précède le bloc dans le DOM.
    expect(
      getSuivant()!.compareDocumentPosition(heading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    const links = within(heading.parentElement as HTMLElement).getAllByRole(
      "link"
    );
    expect(links).toHaveLength(5);
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    });

    // Les questions fréquentes ne suivent pas l'usager sur l'écran résultat.
    selectTheme("secteur-prive");
    fireEvent.click(getSuivant()!);
    expect(
      screen.queryByText("Questions les plus fréquentes")
    ).not.toBeInTheDocument();
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
