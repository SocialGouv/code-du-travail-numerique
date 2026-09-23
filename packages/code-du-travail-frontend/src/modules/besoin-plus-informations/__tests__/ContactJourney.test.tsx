import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import { ContactJourney } from "../ContactJourney";

const emitSelectTheme = jest.fn();
const emitTrackNumber = jest.fn();
const emitSelectChannel = jest.fn();
const emitSelectDepartement = jest.fn();
const emitClickRdv = jest.fn();

jest.mock("../tracking", () => ({
  useNeedMoreInfoEvents: () => ({
    emitSelectTheme,
    emitTrackNumber,
    emitSelectChannel,
    emitSelectDepartement,
    emitClickRdv,
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

const getChannelRadio = (channel: "telephone" | "rdv") =>
  screen.getByTestId(`contact-channel-${channel}`) as HTMLInputElement;

const getDepartementSelect = () =>
  screen.getByTestId("contact-departement") as HTMLSelectElement;

const selectDepartement = (value: string) =>
  fireEvent.change(getDepartementSelect(), { target: { value } });

// Raccourci : thème secteur privé validé, on est à l'écran du moyen de contact.
const goToChannelStep = () => {
  selectTheme("secteur-prive");
  fireEvent.click(getSuivant()!);
};

const goToRdvStep = () => {
  goToChannelStep();
  fireEvent.click(getChannelRadio("rdv"));
  fireEvent.click(getSuivant()!);
};

describe("<ContactJourney />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("écran 1 : thème", () => {
    it("demande de choisir un thème plutôt que de griser « Suivant »", () => {
      render(<ContactJourney />);

      // Le bouton reste actionnable : c'est l'erreur qui explique ce qui bloque.
      expect(getSuivant()).toBeEnabled();

      fireEvent.click(getSuivant()!);
      expect(
        screen.getByText("Sélectionnez un thème pour continuer.")
      ).toBeInTheDocument();
      expect(emitSelectTheme).not.toHaveBeenCalled();
      expect(screen.queryByTestId("contact-channel-telephone")).toBeNull();

      // Choisir un thème efface l'erreur et débloque le parcours.
      selectTheme("secteur-prive");
      expect(
        screen.queryByText("Sélectionnez un thème pour continuer.")
      ).not.toBeInTheDocument();

      fireEvent.click(getSuivant()!);
      expect(emitSelectTheme).toHaveBeenCalledWith("secteur-prive");
      expect(getChannelRadio("telephone")).toBeInTheDocument();
    });

    it("annonce l'étape suivante dans le fil d'étapes", () => {
      render(<ContactJourney />);
      expect(screen.getByText("Étape 1 sur 3")).toBeInTheDocument();
      expect(
        screen.getByText("Choisir votre moyen de contact")
      ).toBeInTheDocument();
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

      // On reste sur l'écran de sélection : pas d'écran suivant, « Suivant » toujours là.
      expect(screen.queryByTestId("contact-channel-telephone")).toBeNull();
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

      expect(screen.queryByTestId("contact-channel-telephone")).toBeNull();
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
        expect(link).toHaveAttribute(
          "rel",
          expect.stringContaining("noopener")
        );
      });

      // Les questions fréquentes ne suivent pas l'usager aux écrans suivants.
      goToChannelStep();
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
      expect(getChannelRadio("telephone")).toBeInTheDocument();
    });
  });

  describe("écran 2 : moyen de contact", () => {
    it("propose téléphone et rendez-vous, sans le formulaire ni présélection", () => {
      render(<ContactJourney />);
      goToChannelStep();

      expect(screen.getByText("Étape 2 sur 3")).toBeInTheDocument();
      expect(getChannelRadio("telephone")).not.toBeChecked();
      expect(getChannelRadio("rdv")).not.toBeChecked();
      expect(screen.getAllByRole("radio")).toHaveLength(2);
      expect(screen.queryByText(/Formulaire et courriel/)).toBeNull();

      // Aide au choix, sans la ligne sur le formulaire.
      expect(
        screen.getByText("Comment choisir le moyen de contact ?")
      ).toBeInTheDocument();
      expect(screen.queryByText(/formulaire et courriel permet/i)).toBeNull();
      expect(
        screen.getByText(/munissez-vous de vos documents/)
      ).toBeInTheDocument();

      // Le message des régions n'apparaît qu'à la sélection du rendez-vous.
      expect(screen.queryByTestId("contact-rdv-regions")).toBeNull();
      expect(getPrecedent()).toBeInTheDocument();
      expect(getSuivant()).toBeInTheDocument();
    });

    it("demande de choisir un moyen de contact plutôt que de griser « Suivant »", () => {
      render(<ContactJourney />);
      goToChannelStep();

      expect(getSuivant()).toBeEnabled();
      fireEvent.click(getSuivant()!);
      expect(
        screen.getByText("Sélectionnez un moyen de contact pour continuer.")
      ).toBeInTheDocument();
      expect(emitSelectChannel).not.toHaveBeenCalled();
      expect(screen.queryByTestId("contact-phone-result")).toBeNull();

      fireEvent.click(getChannelRadio("telephone"));
      expect(
        screen.queryByText("Sélectionnez un moyen de contact pour continuer.")
      ).toBeNull();
    });

    it("affiche les régions ouvertes à la sélection du rendez-vous, et les masque sur téléphone", () => {
      render(<ContactJourney />);
      goToChannelStep();

      fireEvent.click(getChannelRadio("rdv"));
      const regions = screen.getByTestId("contact-rdv-regions");
      // Message de formulaire DSFR, dans une zone de statut rendue en
      // permanence pour que son apparition soit annoncée (RGAA 7.5).
      expect(regions).toHaveClass("fr-message", "fr-message--info");
      expect(screen.getByRole("status")).toContainElement(regions);
      expect(regions).toHaveTextContent(
        "La prise de rendez-vous est disponible dans les régions suivantes : Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté, Corse et Normandie."
      );
      expect(regions).toHaveTextContent("contactez nos services par téléphone");
      // Aucun département n'est cité : seules les régions le sont.
      expect(regions).not.toHaveTextContent(/\b(69|2A|76)\b/);
      expect(screen.getByText("Prendre rendez-vous")).toBeInTheDocument();

      fireEvent.click(getChannelRadio("telephone"));
      expect(screen.queryByTestId("contact-rdv-regions")).toBeNull();
      expect(screen.getByRole("status")).toBeEmptyDOMElement();
      expect(screen.getByText("Par téléphone")).toBeInTheDocument();
    });

    it("mène au numéro de téléphone cliquable pour le canal téléphone", () => {
      render(<ContactJourney />);
      goToChannelStep();
      fireEvent.click(getChannelRadio("telephone"));
      fireEvent.click(getSuivant()!);

      expect(emitSelectChannel).toHaveBeenCalledWith("telephone");
      expect(screen.getByTestId("contact-phone-result")).toBeInTheDocument();
      expect(screen.getByText("Étape 3 sur 3")).toBeInTheDocument();

      const phone = screen.getByRole("link", { name: /0 806 000 126/ });
      expect(phone).toHaveAttribute("href", "tel:0806000126");

      fireEvent.click(phone);
      expect(emitTrackNumber).toHaveBeenCalled();

      expect(
        screen.getByText(/ils ne sont pas compétents pour/)
      ).toBeInTheDocument();
      // Écran de résultat : plus de bouton « Suivant ».
      expect(getSuivant()).not.toBeInTheDocument();
      expect(getPrecedent()).toBeInTheDocument();
    });
  });

  describe("écran 3 : rendez-vous", () => {
    it("ne liste que les départements des régions ouvertes, sans lien tant que rien n'est choisi", () => {
      render(<ContactJourney />);
      goToRdvStep();

      expect(emitSelectChannel).toHaveBeenCalledWith("rdv");
      expect(screen.getByTestId("contact-rdv-result")).toBeInTheDocument();
      expect(screen.getByText("Étape 3 sur 3")).toBeInTheDocument();

      const codes = Array.from(getDepartementSelect().options)
        .map((option) => option.value)
        .filter(Boolean);
      // 12 (ARA) + 8 (BFC) + 2 (Corse) + 5 (Normandie), triés par code.
      expect(codes).toHaveLength(27);
      expect(codes).toEqual([...codes].sort());
      expect(codes).toEqual(expect.arrayContaining(["69", "21", "2A", "76"]));
      expect(codes).not.toContain("75");
      expect(
        screen.getByRole("option", { name: "2A - Corse-du-Sud" })
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("link", { name: /Prendre rendez-vous/ })
      ).toBeNull();
      // Le bloc « Attention » est visible avant tout choix de département ;
      // le message de redirection, lui, attend le département.
      expect(
        screen.getByText(/ils ne sont pas compétents pour/)
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Vous allez être dirigé vers le site de prise de rendez-vous/
        )
      ).toBeNull();
      expect(getSuivant()).toBeNull();
      expect(getPrecedent()).toBeInTheDocument();
    });

    it("affiche le lien de prise de rendez-vous de la région une fois le département choisi", () => {
      render(<ContactJourney />);
      goToRdvStep();

      selectDepartement("69");
      expect(emitSelectDepartement).toHaveBeenCalledWith("69");

      expect(
        screen.getByText(
          "Vous allez être dirigé vers le site de prise de rendez-vous de votre région."
        )
      ).toBeInTheDocument();

      const link = screen.getByRole("link", { name: /Prendre rendez-vous/ });
      expect(link).toHaveAttribute("href", expect.stringMatching(/^https:/));
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link).toHaveAttribute(
        "title",
        "Prendre rendez-vous - nouvelle fenêtre"
      );

      fireEvent.click(link);
      expect(emitClickRdv).toHaveBeenCalledWith("69");

      // Le bloc « Attention » de l'écran téléphone est repris ici, avant le
      // message de redirection qui apparaît avec le département.
      const caveats = screen.getByText(/ils ne sont pas compétents pour/);
      const redirect = screen.getByText(
        /Vous allez être dirigé vers le site de prise de rendez-vous/
      );
      expect(
        caveats.compareDocumentPosition(redirect) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();

      // Le lien tient lieu de « Suivant » : dans la barre d'actions, après
      // « Précédent ».
      expect(
        getPrecedent()!.compareDocumentPosition(link) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
      expect(getPrecedent()!.parentElement).toBe(link.parentElement);
    });
  });

  describe("navigation", () => {
    it("revient à l'écran de sélection en conservant le thème choisi", () => {
      render(<ContactJourney />);
      goToChannelStep();

      fireEvent.click(getPrecedent()!);

      expect(screen.queryByTestId("contact-channel-telephone")).toBeNull();
      expect(getThemeSelect().value).toBe("secteur-prive");
      expect(getSuivant()).toBeEnabled();
      expect(getPrecedent()).not.toBeInTheDocument();
    });

    it("revient de l'écran téléphone au moyen de contact en le conservant", () => {
      render(<ContactJourney />);
      goToChannelStep();
      fireEvent.click(getChannelRadio("telephone"));
      fireEvent.click(getSuivant()!);
      expect(screen.getByTestId("contact-phone-result")).toBeInTheDocument();

      fireEvent.click(getPrecedent()!);

      expect(screen.queryByTestId("contact-phone-result")).toBeNull();
      expect(getChannelRadio("telephone")).toBeChecked();
    });

    it("revient de l'écran rendez-vous en conservant le canal et le département", () => {
      render(<ContactJourney />);
      goToRdvStep();
      selectDepartement("2B");

      fireEvent.click(getPrecedent()!);
      expect(getChannelRadio("rdv")).toBeChecked();
      expect(screen.getByTestId("contact-rdv-regions")).toBeInTheDocument();

      fireEvent.click(getSuivant()!);
      expect(getDepartementSelect().value).toBe("2B");
      expect(
        screen.getByRole("link", { name: /Prendre rendez-vous/ })
      ).toBeInTheDocument();
    });
  });
});
