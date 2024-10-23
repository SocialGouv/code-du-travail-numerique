import { HeuresRechercheEmploi } from "../../index";
import { ui } from "../ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 292,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "292"
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
          screen.queryAllByText(/50 heures par mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salarié cadre peut s'absenter, en une ou plusieurs fois en accord avec l'employeur./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Avenant Cadres, Article 8/)[0]
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
          screen.queryAllByText(/50 heures par mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. Ils peuvent décider de grouper ces heures. En l'absence d'accord, les heures sont fixées à tour de rôle par l'employeur et par le salarié. Le salarié qui a trouvé un emploi ne peut plus utiliser ces heures./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 15/)[0]).toBeInTheDocument();
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
          screen.queryAllByText(/50 heures par mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Le salarié cadre peut s'absenter, en une ou plusieurs fois en accord avec l'employeur./g
          )[0]
        ).toBeInTheDocument();

        expect(
          screen.queryAllByText(/Avenant Cadres, Article 8/)[0]
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
          screen.queryAllByText(/50 heures par mois/g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(/Le salaire est maintenu./g)[0]
        ).toBeInTheDocument();
        expect(
          screen.queryAllByText(
            /Les heures d'absence sont fixées d'un commun accord entre l'employeur et le salarié. Ils peuvent décider de grouper ces heures. En l'absence d'accord, les heures sont fixées à tour de rôle par l'employeur et par le salarié. Le salarié qui a trouvé un emploi ne peut plus utiliser ces heures./g
          )[0]
        ).toBeInTheDocument();

        expect(screen.queryAllByText(/Article 15/)[0]).toBeInTheDocument();
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

      expect(screen.queryAllByText(/Article 8/)[0]).toBeInTheDocument();
    });
  });
});
