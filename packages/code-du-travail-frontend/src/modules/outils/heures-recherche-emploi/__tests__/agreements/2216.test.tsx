import { HeuresRechercheEmploi } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 2216,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "2216"
        }
        `
);

describe("HeuresRechercheEmploi", () => {
  beforeEach(() => {
    render(<HeuresRechercheEmploi icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(ui.next.get());
  });

  describe("typeRupture = 1| Démission", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "1| Démission" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 48| Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "48| Cadres" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 heures par jour pendant 1 mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Ces heures sont fixées d'un commun accord entre le salarié et l'employeur. A la demande du salarié, elles peuvent être groupées en fin de semaine ou en fin de mois, compte tenu des nécessités du service. En l'absence d'accord entre l'employeur et le salarié, elles sont fixées un jour par le salarié, et le suivant par la direction, en tenant compte dans la mesure du possible des heures d'ouverture des agences de Pôle emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 7 de l'annexe III/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "38| Non-cadres" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 heures par jour pendant 1 mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire n'est pas maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Ces heures sont fixées d'un commun accord entre le salarié et l'employeur. A la demande du salarié, elles peuvent être groupées en fin de semaine ou en fin de mois, compte tenu des nécessités du service. En l'absence d'accord entre l'employeur et le salarié, elles sont fixées un jour par le salarié, et le suivant par la direction, en tenant compte dans la mesure du possible des heures d'ouverture des agences de Pôle emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3.12/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 3| Licenciement", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "3| Licenciement" },
      });
      fireEvent.click(ui.next.get());
    });

    describe("criteria.catégorie professionnelle = 48| Cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "48| Cadres" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(
            /un nombre d'heures égal, chaque mois, à la durée hebdomadaire de travail dans l'établissement/g
          )[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /La répartition de ces absences se fera en accord avec la direction. Elles pourront être bloquées à la fin de chaque mois./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Article 7 de l'annexe III/)[0]
        ).toBeInTheDocument();
      });
    });

    describe("criteria.catégorie professionnelle = 38| Non-cadres", () => {
      beforeEach(() => {
        fireEvent.change(
          screen.getByTestId("criteria.catégorie professionnelle"),
          {
            target: { value: "38| Non-cadres" },
          }
        );
        fireEvent.click(ui.next.get());
      });

      it("should display expected answer", () => {
        expect(
          screen.queryAllByText(/2 heures par jour pendant 1 mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Ces heures sont fixées d'un commun accord entre le salarié et l'employeur. A la demande du salarié, elles peuvent être groupées en fin de semaine ou en fin de mois, compte tenu des nécessités du service. En l'absence d'accord entre l'employeur et le salarié, elles sont fixées un jour par le salarié, et le suivant par la direction, en tenant compte dans la mesure du possible des heures d'ouverture des agences de Pôle emploi./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 3.12/)[0]).toBeInTheDocument();
      });
    });
  });

  describe("typeRupture = 7| Rupture de la période d'essai", () => {
    beforeEach(() => {
      fireEvent.change(screen.getByTestId("typeRupture"), {
        target: { value: "7| Rupture de la période d'essai" },
      });
      fireEvent.click(ui.next.get());
    });

    it("should display expected answer", () => {
      expect(
        screen.queryAllByText(
          /D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi./g
        )[0]
      ).toBeInTheDocument();

      expect(screen.queryAllByText(/Article 3.12/)[0]).toBeInTheDocument();
    });
  });
});
