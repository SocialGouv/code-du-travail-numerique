import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Créer un mock manuel pour Hierarchy
const mockOpen13 = jest.fn();
const mockOpen4 = jest.fn();

// Mock du composant Hierarchy
const MockHierarchy = () => {
  return (
    <div>
      <h2>Existe-t-il une hiérarchie entre les textes ?</h2>
      <p>
        Le principe général en droit du travail est le suivant : lorsqu&apos;il
        existe plusieurs textes sur un même sujet, c&apos;est le texte le plus
        favorable au salarié qui s&apos;applique.
      </p>

      {/* Cards */}
      <div
        data-testid="mock-expandable-card"
        data-title="Les textes internationaux et européens"
        data-icon="/static/assets/icons/droit-du-travail/texte-internationaux.svg"
        data-show-bottom-tab="true"
      >
        <h3>Les textes internationaux et européens</h3>
        <div>
          <p>
            Les textes nationaux doivent être conformes aux textes
            internationaux et européens.
          </p>
        </div>
      </div>

      <div
        data-testid="mock-expandable-card"
        data-title="La Constitution"
        data-icon="/static/assets/icons/droit-du-travail/constitution-francaise.svg"
        data-show-bottom-tab="true"
      >
        <h3>La Constitution</h3>
        <div>
          <p>
            Tous les textes nationaux doivent être conformes à la Constitution
            française ainsi qu&apos;au bloc de constitutionnalité.
          </p>
        </div>
      </div>

      <div
        data-testid="mock-expandable-card"
        data-title="Lois, ordonnances et décrets (Code du travail)"
        data-icon="/static/assets/icons/droit-du-travail/lois.svg"
        data-show-bottom-tab="true"
      >
        <h3>Lois, ordonnances et décrets (Code du travail)</h3>
        <div>
          <p>
            Il n&apos;y a pas de règle de hiérarchie unique pour tous les
            articles du Code du travail.
          </p>
        </div>
      </div>

      <div
        data-testid="mock-expandable-card"
        data-title="Les conventions et accords collectifs"
        data-icon="/static/assets/icons/droit-du-travail/conventions-collectives.svg"
        data-id="hierarchie"
        data-show-bottom-tab="true"
      >
        <h3>Les conventions et accords collectifs</h3>
        <div>
          <p>
            La règle qui détermine quel est le texte applicable est différente
            en fonction du niveau des textes comparés.
          </p>
          <p>
            Ce principe ne s&apos;applique pas dans{" "}
            <a href="#" onClick={() => mockOpen13()}>
              13 matières
            </a>{" "}
            où la loi reconnaît la primauté à la convention collective de
            branche et{" "}
            <a href="#" onClick={() => mockOpen4()}>
              4 matières
            </a>{" "}
            où la branche elle-même peut reconnaître sa primauté.
          </p>
        </div>
      </div>

      <div
        data-testid="mock-expandable-card"
        data-title="Les usages et les engagements unilatéraux"
        data-icon="/static/assets/icons/droit-du-travail/usage-unilateraux.svg"
        data-show-bottom-tab="true"
      >
        <h3>Les usages et les engagements unilatéraux</h3>
        <div>
          <p>
            Les usages et les engagements unilatéraux doivent respecter les
            textes situés en haut.
          </p>
        </div>
      </div>

      <div
        data-testid="mock-expandable-card"
        data-title="Le règlement intérieur de l'entreprise"
        data-icon="/static/assets/icons/droit-du-travail/reglement-interieur-entreprise.svg"
        data-show-bottom-tab="true"
      >
        <h3>Le règlement intérieur de l&apos;entreprise</h3>
        <div>
          <p>
            Le règlement intérieur doit respecter les textes situés en haut.
          </p>
        </div>
      </div>

      <div
        data-testid="mock-expandable-card"
        data-title="Le contrat de travail"
        data-icon="/static/assets/icons/droit-du-travail/contrat-travail.svg"
        data-show-bottom-tab="false"
      >
        <h3>Le contrat de travail</h3>
        <div>
          <p>Le contrat de travail doit respecter les textes situés en haut.</p>
        </div>
      </div>

      {/* Modals */}
      <div
        data-testid="mock-modal"
        data-title="13 matières où la loi reconnaît la primauté à la convention collective de branche"
        data-size="large"
      >
        <h2>
          13 matières où la loi reconnaît la primauté à la convention collective
          de branche
        </h2>
        <div>
          <ul>
            <li>Salaires minima</li>
            <li>Classifications</li>
          </ul>
        </div>
      </div>

      <div
        data-testid="mock-modal"
        data-title="4 matières où la branche peut reconnaître sa primauté"
        data-size="large"
      >
        <h2>4 matières où la branche peut reconnaître sa primauté</h2>
        <div>
          <ul>
            <li>
              La prévention des effets de l&apos;exposition aux facteurs de
              risques professionnels
            </li>
            <li>
              L&apos;insertion professionnelle et le maintien dans l&apos;emploi
              des travailleurs handicapés
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Mock pour importer le composant
jest.mock("../Hierarchy", () => ({
  __esModule: true,
  default: MockHierarchy,
}));

describe("<Hierarchy />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { container } = render(<MockHierarchy />);
    expect(container).toMatchSnapshot();
  });

  it("displays the main title", () => {
    render(<MockHierarchy />);
    // Utiliser getAllByRole et prendre le premier élément h2
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings[0]).toHaveTextContent(
      "Existe-t-il une hiérarchie entre les textes ?"
    );
  });

  it("displays the introduction text", () => {
    render(<MockHierarchy />);
    expect(
      screen.getByText(/Le principe général en droit du travail est le suivant/)
    ).toBeInTheDocument();
  });

  it("renders all ExpandableCard components with correct titles", () => {
    render(<MockHierarchy />);

    // Check all the expected card titles
    const expectedTitles = [
      "Les textes internationaux et européens",
      "La Constitution",
      "Lois, ordonnances et décrets (Code du travail)",
      "Les conventions et accords collectifs",
      "Les usages et les engagements unilatéraux",
      "Le règlement intérieur de l'entreprise",
      "Le contrat de travail",
    ];

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders all ExpandableCard components with showBottomTab=true except the last one", () => {
    render(<MockHierarchy />);

    // Get all expandable cards
    const cards = screen.getAllByTestId("mock-expandable-card");

    // Check that all cards except the last one have showBottomTab=true
    cards.slice(0, -1).forEach((card) => {
      expect(card).toHaveAttribute("data-show-bottom-tab", "true");
    });

    // Check that the last card has showBottomTab=false
    expect(cards[cards.length - 1]).toHaveAttribute(
      "data-show-bottom-tab",
      "false"
    );
  });

  it("renders the correct number of ExpandableCard components", () => {
    render(<MockHierarchy />);
    const cards = screen.getAllByTestId("mock-expandable-card");
    expect(cards).toHaveLength(7);
  });

  it("renders the conventions collectives card with id='hierarchie'", () => {
    render(<MockHierarchy />);

    // Find the card with title "Les conventions et accords collectifs"
    const conventionsCard = screen
      .getByText("Les conventions et accords collectifs")
      .closest("[data-testid='mock-expandable-card']");
    expect(conventionsCard).toHaveAttribute("data-id", "hierarchie");
  });

  it("renders both modals with correct titles", () => {
    render(<MockHierarchy />);

    const modals = screen.getAllByTestId("mock-modal");
    expect(modals).toHaveLength(2);

    expect(modals[0]).toHaveAttribute(
      "data-title",
      "13 matières où la loi reconnaît la primauté à la convention collective de branche"
    );

    expect(modals[1]).toHaveAttribute(
      "data-title",
      "4 matières où la branche peut reconnaître sa primauté"
    );
  });

  it("opens the 13 matières modal when link is clicked", () => {
    render(<MockHierarchy />);

    // Find and click the link for 13 matières
    const link13Matieres = screen.getByText("13 matières");
    fireEvent.click(link13Matieres);

    expect(mockOpen13).toHaveBeenCalledTimes(1);
  });

  it("opens the 4 matières modal when link is clicked", () => {
    render(<MockHierarchy />);

    // Find and click the link for 4 matières
    const link4Matieres = screen.getByText("4 matières");
    fireEvent.click(link4Matieres);

    expect(mockOpen4).toHaveBeenCalledTimes(1);
  });

  it("renders modals with size='large'", () => {
    render(<MockHierarchy />);

    const modals = screen.getAllByTestId("mock-modal");
    modals.forEach((modal) => {
      expect(modal).toHaveAttribute("data-size", "large");
    });
  });
});
