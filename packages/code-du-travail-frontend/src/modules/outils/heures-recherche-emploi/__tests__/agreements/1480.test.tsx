import { CalculateurHeuresRechercheEmploi } from "../../HeuresRechercheEmploiSimulator";
import { fireEvent, render, screen } from "@testing-library/react";
import { ui } from "../ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 1480,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "1480"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<CalculateurHeuresRechercheEmploi title={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - journalisme - typeRupture"
        ),
        {
          target: { value: "'Démission'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /2 heures par jour ouvrable, dans la limite de 50 heures/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Ces heures sont fixées alternativement par l'employeur et le journaliste. Toutefois, ce dernier peut, avec l'accord de l'employeur, bloquer tout ou partie de ces heures avant la fin du préavis. Le journaliste professionnel qui a trouvé un emploi ne peut plus utiliser les heures d'absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(
        screen.getByTestId(
          "infos.contrat salarié - convention collective - journalisme - typeRupture"
        ),
        {
          target: { value: "'Licenciement'" },
        }
      );
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /2 heures par jour ouvrable, dans la limite de 50 heures/g
        )[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(/Le salaire est maintenu./g)[0]
      ).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          /Ces heures sont fixées alternativement par l'employeur et le journaliste. Toutefois, ce dernier peut, avec l'accord de l'employeur, bloquer tout ou partie de ces heures avant la fin du préavis. Le journaliste professionnel qui a trouvé un emploi ne peut plus utiliser les heures d'absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 46/)[0]).toBeInTheDocument();
    });
  });
});
